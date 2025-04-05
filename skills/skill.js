async function speakText() {
  let text =
    document.getElementById("title").innerText +
    " " +
    document.getElementById("subtitle").innerText;

  try {
    const response = await fetch("http://localhost:3000/synthesize-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const audioContent = data.audioContent;

    if (audioContent) {
      const audio = new Audio("data:audio/mp3;base64," + audioContent);
      audio.play();
    } else {
      console.error("Error: No audio content received from backend.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
