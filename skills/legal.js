function goHome() {
  window.location.href = "index.html"; // Change to your home page filename
}

function goBack() {
  window.location.href = "women.html"; // Change to the women development section filename
}

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

// Function to close the modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Function to speak the text
function speakText(textId) {
  let text = document.getElementById(textId).textContent;
  let speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1; // Adjust speech rate if needed
  speechSynthesis.speak(speech);
}

// Close modal when clicking outside
window.onclick = function (event) {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
