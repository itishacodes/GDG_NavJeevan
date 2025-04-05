document.addEventListener("DOMContentLoaded", function () {
  setupUser();
  loadQuestions();
});

let currentUser = "";

function setupUser() {
  currentUser = localStorage.getItem("username");
  if (!currentUser) {
    currentUser = prompt("Enter your name:");
    localStorage.setItem("username", currentUser);
  }
}

// Function to start speech recognition
function startSpeechRecognition(inputId) {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    document.getElementById(inputId).value = event.results[0][0].transcript;
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
  };
}

// Post a new question
function postQuestion() {
  let questionText = document.getElementById("questionInput").value.trim();
  if (questionText === "") return;

  const question = {
    id: Date.now(),
    user: currentUser,
    content: questionText,
    replies: [],
  };

  let savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
  savedQuestions.unshift(question);
  localStorage.setItem("questions", JSON.stringify(savedQuestions));
  document.getElementById("questionInput").value = "";

  loadQuestions(); // Refresh list
}

// Render all questions
function loadQuestions() {
  let questionsList = document.getElementById("questionsList");
  questionsList.innerHTML = "";

  let savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];

  savedQuestions.forEach((q) => {
    let newQuestion = document.createElement("div");
    newQuestion.classList.add("question");

    let replyHTML = "";
    q.replies.forEach((reply) => {
      replyHTML += `<p class="reply"><strong>Reply:</strong> ${reply}</p>`;
    });

    newQuestion.innerHTML = `
      <strong>${q.user}:</strong>
      <p id="q-content-${q.id}">${q.content}</p>
      ${
        q.user === currentUser
          ? `
        <button onclick="editQuestion(${q.id})">✏️ Edit</button>
        <button onclick="removeQuestion(${q.id})">🗑 Remove</button>
      `
          : ""
      }
      <button onclick="showReplyBox(this, ${q.id})">Reply</button>
      <div class="replies">${replyHTML}</div>
    `;

    questionsList.appendChild(newQuestion);
  });
}

// Remove a question with confirmation
function removeQuestion(id) {
  if (confirm("Are you sure you want to delete this question?")) {
    let savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    savedQuestions = savedQuestions.filter((q) => q.id !== id);
    localStorage.setItem("questions", JSON.stringify(savedQuestions));
    loadQuestions();
  }
}

// Edit question content
function editQuestion(id) {
  let savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = savedQuestions.find((q) => q.id === id);
  let newContent = prompt("Edit your question:", question.content);
  if (newContent && newContent.trim() !== "") {
    question.content = newContent.trim();
    localStorage.setItem("questions", JSON.stringify(savedQuestions));
    loadQuestions();
  }
}

// Show reply input box
function showReplyBox(button, questionId) {
  let repliesDiv = button.nextElementSibling;
  if (repliesDiv.querySelector(".reply-box")) return;

  let replyBox = document.createElement("div");
  replyBox.classList.add("reply-box");

  replyBox.innerHTML = `
    <input type="text" id="replyInput-${questionId}" placeholder="Type your reply...">
    <button onclick="startSpeechRecognition('replyInput-${questionId}')">🎤 Speak</button>
    <button onclick="postReply(${questionId})">Reply</button>
  `;

  repliesDiv.appendChild(replyBox);
}

// Post a reply
function postReply(questionId) {
  let inputId = `replyInput-${questionId}`;
  let replyText = document.getElementById(inputId).value.trim();
  if (replyText === "") return;

  let savedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
  let question = savedQuestions.find((q) => q.id === questionId);
  if (!question.replies) question.replies = [];
  question.replies.push(replyText);

  localStorage.setItem("questions", JSON.stringify(savedQuestions));
  loadQuestions();
}

/* ===========================
  🎯 Mentor Connect Functions
   =========================== */
function requestGuidance(mentorName) {
  document.getElementById(
    "mentorName"
  ).innerText = `Request Guidance from ${mentorName}`;
  document.getElementById("mentorModal").style.display = "block";
}

function closeModal() {
  document.getElementById("mentorModal").style.display = "none";
}

function sendRequest() {
  let message = document.getElementById("mentorMessage").value;
  if (message.trim() === "") return;

  alert("Your request has been sent successfully!");
  document.getElementById("mentorMessage").value = "";
  closeModal();
}

/* ===========================
  🌟 Success Stories Carousel
   =========================== */
let currentStory = 0;

function showStory(index) {
  const stories = document.querySelectorAll(".story");
  stories.forEach((story, i) => {
    story.classList.remove("active");
    if (i === index) {
      story.classList.add("active");
    }
  });
}

function prevStory() {
  const stories = document.querySelectorAll(".story");
  currentStory = (currentStory - 1 + stories.length) % stories.length;
  showStory(currentStory);
}

function nextStory() {
  const stories = document.querySelectorAll(".story");
  currentStory = (currentStory + 1) % stories.length;
  showStory(currentStory);
}
