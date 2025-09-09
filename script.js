// ===== Smooth Scroll for CTA Buttons =====
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = button.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== Fade-In Sections on Scroll =====
const fadeElements = document.querySelectorAll(
  ".hero, .about, .projects, .contact"
);

const fadeInOnScroll = () => {
  const windowBottom = window.innerHeight + window.scrollY;
  fadeElements.forEach((el) => {
    const elTop = el.offsetTop + el.offsetHeight / 4;
    if (windowBottom > elTop) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);

// ===== Project Data (Dynamic) =====
const projectsData = [
  {
    title: "Library Project",
    description:
      "A dynamic library with books browsing and add-to-cart features.",
    link: "projects/library/index.html",
    image: "projects/library/images/book1.jpg",
  },
  {
    title: "Portfolio Project",
    description:
      "My personal portfolio showcasing front-end and fullstack skills.",
    link: "#",
    image: "images/project-placeholder.jpg",
  },
  {
    title: "Coming Soon Project",
    description: "This project will be added soon with full details.",
    link: "#",
    image: "images/project-placeholder.jpg",
  },
];

// ===== Render Project Cards =====
const projectGrid = document.querySelector(".project-grid");

const renderProjects = () => {
  projectsData.forEach((project, index) => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `
      <a href="${project.link}">
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </a>
    `;
    projectGrid.appendChild(card);

    // Staggered fade-in
    setTimeout(() => card.classList.add("visible"), index * 150);
  });
};

renderProjects();

// ===== Optional: Highlight Active Nav Link on Scroll =====
const navLinks = document.querySelectorAll(".nav-links a");

const highlightNav = () => {
  const scrollPos = window.scrollY + 100; // offset for header
  fadeElements.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `.nav-links a[href="#${section.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  });
};

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);
