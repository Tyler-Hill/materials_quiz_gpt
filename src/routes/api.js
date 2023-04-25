const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_URL = "https://api.openai.com/v1/engines/davinci/completions";
const API_KEY = process.env.CHATGPT_API_KEY;

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      API_URL,
      {
        prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const chatResponse = response.data.choices[0].text.trim();
    res.status(200).json({ response: chatResponse });
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Error details:", error.response ? error.response.data : error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

module.exports = router;
