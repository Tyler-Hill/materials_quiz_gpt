const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const chatOutput = document.getElementById("chat-output");

sendBtn.addEventListener("click", async () => {
  const prompt = chatInput.value;
  if (!prompt.trim()) return;

  const response = await sendChatRequest(prompt);
  displayResponse(prompt, response);

  chatInput.value = "";
});

async function sendChatRequest(prompt) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("An error occurred");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while processing your request";
  }
}

function displayResponse(prompt, response) {
  const promptElement = document.createElement("div");
  promptElement.classList.add("prompt");
  promptElement.textContent = `You: ${prompt}`;
  chatOutput.appendChild(promptElement);

  const responseElement = document.createElement("div");
  responseElement.classList.add("response");
  responseElement.textContent = `ChatGPT: ${response}`;
  chatOutput.appendChild(responseElement);

  // Scroll the chat output to the bottom
  chatOutput.scrollTop = chatOutput.scrollHeight;
}
