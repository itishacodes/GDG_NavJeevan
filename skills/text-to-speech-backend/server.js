const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const path = require("path"); // Add path module
const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

app.post("/synthesize-speech", async (req, res) => {
  const text = req.body.text;
  const apiKey = process.env.AIzaSyAHBDmLWIH77frfHSQRMQlojPxX8dPYzz4;

  if (!apiKey) {
    return res.status(500).send("API key not configured.");
  }

  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${AIzaSyAHBDmLWIH77frfHSQRMQlojPxX8dPYzz4}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text: text },
          voice: { languageCode: "en-IN", ssmlGender: "FEMALE" },
          audioConfig: { audioEncoding: "mp3" },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    res.status(500).send("Error synthesizing speech.");
  }
});

// Added GET route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "skill-development.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});