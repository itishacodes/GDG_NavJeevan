// Function to open YouTube video
function openVideo(videoId) {
  let videoModal = document.getElementById("videoModal");
  let videoFrame = document.getElementById("videoFrame");

  videoFrame.src = "https://www.youtube.com/embed/" + videoId;
  videoModal.style.display = "block";
}

// Function to close the modal
function closeVideo() {
  let videoModal = document.getElementById("videoModal");
  let videoFrame = document.getElementById("videoFrame");

  videoFrame.src = ""; // Stop video when closing
  videoModal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  let videoModal = document.getElementById("videoModal");
  if (event.target == videoModal) {
    closeVideo();
  }
};
