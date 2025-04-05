document.addEventListener("DOMContentLoaded", function () {
  const trainingHubs = {
    1: {
      name: "Tech Skills Center",
      location: "Delhi, India",
      courses: "Web Development, AI & ML",
    },
    2: {
      name: "Green Farming Academy",
      location: "Pune, India",
      courses: "Organic Farming, Sustainable Agriculture",
    },
    3: {
      name: "Rural Education Hub",
      location: "Bangalore, India",
      courses: "Basic Digital Skills, English Speaking",
    },
  };

  const hubContainer = document.getElementById("hubContainer");
  const modal = document.getElementById("applyModal");
  const modalTitle = document.getElementById("modalHubTitle");
  const modalLocation = document.getElementById("modalHubLocation");
  const modalCourses = document.getElementById("modalHubCourses");
  const applyBtn = document.querySelector(".submit-btn");
  const closeBtn = document.querySelector(".close");

  function displayHubs() {
    hubContainer.innerHTML = "";
    Object.keys(trainingHubs).forEach((key) => {
      const hub = trainingHubs[key];
      const hubElement = document.createElement("div");
      hubElement.classList.add("hub-card");
      hubElement.setAttribute("data-id", key);
      hubElement.innerHTML = `
                <h3>${hub.name}</h3>
                <p><strong>Location:</strong> ${hub.location}</p>
                <p><strong>Courses:</strong> ${hub.courses}</p>
                <button class="join-btn">Apply</button>
            `;
      hubContainer.appendChild(hubElement);
    });

    attachApplyEventListeners();
  }

  function attachApplyEventListeners() {
    document.querySelectorAll(".join-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const hubId = this.parentElement.getAttribute("data-id");
        const hubData = trainingHubs[hubId];

        modalTitle.textContent = hubData.name;
        modalLocation.textContent = hubData.location;
        modalCourses.textContent = hubData.courses;

        modal.style.display = "block";
      });
    });
  }

  applyBtn.addEventListener("click", function (event) {
    event.preventDefault();
    alert("Application submitted successfully!");
    modal.style.display = "none";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  document
    .getElementById("registerHubForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let name = document.getElementById("hubName").value.trim();
      let location = document.getElementById("hubLocation").value.trim();
      let courses = document.getElementById("hubCourses").value.trim();

      if (name === "" || location === "" || courses === "") {
        alert("Please fill in all fields!");
        return;
      }

      const newId = Object.keys(trainingHubs).length + 1;
      trainingHubs[newId] = { name, location, courses };
      displayHubs();

      alert(`Training Hub "${name}" registered successfully!`);
      document.getElementById("hubName").value = "";
      document.getElementById("hubLocation").value = "";
      document.getElementById("hubCourses").value = "";
    });

  displayHubs();
});
