document.addEventListener("DOMContentLoaded", function () {
  const projects = {
    1: {
      title: "Organic Farming App",
      description:
        "Develop a mobile app to educate farmers about organic farming techniques.",
      salary: "₹15,000 per month",
      prerequisites:
        "Basic app development, knowledge of agriculture preferred.",
    },
    2: {
      title: "Solar-Powered Irrigation",
      description:
        "Work on designing a cost-effective solar irrigation system.",
      salary: "₹20,000 per project",
      prerequisites:
        "Electrical engineering, solar energy concepts, embedded systems.",
    },
    3: {
      title: "Rural Education Platform",
      description:
        "Build an online platform to provide free education resources to rural students.",
      salary: "₹10,000 per month",
      prerequisites:
        "Web development, basic UI/UX knowledge, content management.",
    },
  };

  const projectContainer = document.getElementById("projectContainer");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalDescription = document.getElementById("modalProjectDescription");
  const modalSalary = document.getElementById("modalProjectSalary");
  const modalPrerequisites = document.getElementById(
    "modalProjectPrerequisites"
  );
  const closeBtn = document.querySelector(".close");

  const openFormBtn = document.getElementById("openFormBtn");
  const applyForm = document.getElementById("applyForm");

  function displayProjects() {
    projectContainer.innerHTML = "";
    Object.keys(projects).forEach((key) => {
      const project = projects[key];
      const projectElement = document.createElement("div");
      projectElement.classList.add("project-card");
      projectElement.setAttribute("data-id", key);
      projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p><strong>Salary:</strong> ${project.salary}</p>
            <button class="join-btn">Join Project</button>
          `;
      projectContainer.appendChild(projectElement);
    });

    attachJoinEventListeners();
  }

  function attachJoinEventListeners() {
    document.querySelectorAll(".join-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const projectId = this.parentElement.getAttribute("data-id");
        const projectData = projects[projectId];

        modalTitle.textContent = projectData.title;
        modalDescription.textContent = projectData.description;
        modalSalary.textContent = projectData.salary;
        modalPrerequisites.textContent = projectData.prerequisites;

        modal.style.display = "block";
        openFormBtn.style.display = "block";
        applyForm.style.display = "none";
      });
    });
  }

  // Show the application form when clicking "Apply Now"
  openFormBtn.addEventListener("click", function () {
    openFormBtn.style.display = "none";
    applyForm.style.display = "block";
  });

  // Handle form submission
  applyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("applicantName").value.trim();
    let age = document.getElementById("applicantAge").value.trim();
    let skills = document.getElementById("applicantSkills").value.trim();
    let phone = document.getElementById("applicantPhone").value.trim();
    let email = document.getElementById("applicantEmail").value.trim();

    if (!name || !age || !skills || !phone || !email) {
      alert("Please fill in all fields!");
      return;
    }

    alert(
      `Application submitted successfully!\nName: ${name}\nSkills: ${skills}`
    );

    modal.style.display = "none";
    applyForm.reset();
    applyForm.style.display = "none";
    openFormBtn.style.display = "block";
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    applyForm.style.display = "none";
    openFormBtn.style.display = "block";
  });

  // Close Modal when Clicking Outside
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      applyForm.style.display = "none";
      openFormBtn.style.display = "block";
    }
  };

  // Handle Create Project
  document.querySelector(".submit-btn").addEventListener("click", function () {
    let title = document.getElementById("projectTitle").value.trim();
    let description = document
      .getElementById("projectDescription")
      .value.trim();
    let salary = document.getElementById("projectSalary").value.trim();
    let prerequisites = document
      .getElementById("projectPrerequisites")
      .value.trim();

    if (!title || !description || !salary || !prerequisites) {
      alert("Please fill in all fields!");
      return;
    }

    const newId = Object.keys(projects).length + 1;
    projects[newId] = { title, description, salary, prerequisites };

    displayProjects();

    alert(`Project "${title}" created successfully!`);
    document.getElementById("projectTitle").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("projectSalary").value = "";
    document.getElementById("projectPrerequisites").value = "";
  });

  displayProjects();
});
