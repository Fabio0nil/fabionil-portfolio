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

// ===== ADVANCED SCROLL ANIMATIONS SYSTEM =====
class ScrollAnimations {
  constructor() {
    this.animatedElements = new Set();
    this.observer = null;
    this.init();
  }

  init() {
    // Create intersection observer for better performance
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    // Observe all elements with animation classes
    this.observeElements();
    
    // Add scroll listener for navbar effects
    this.addScrollListeners();
    
    // Initial check for elements already in view
    this.checkInitialElements();
  }

  observeElements() {
    const selectors = [
      '.animate-on-scroll',
      '.animate-fade-in',
      '.animate-slide-left',
      '.animate-slide-right',
      '.animate-scale-up',
      '.animate-rotate-in',
      '.animate-bounce-in',
      '.project-card',
      '.contact-form',
      '.contact-info',
      'section h2',
      'section p'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        this.observer.observe(el);
        this.animatedElements.add(el);
      });
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add visible class with appropriate delay
        this.animateElement(element);
        
        // Stop observing this element
        this.observer.unobserve(element);
      }
    });
  }

  animateElement(element) {
    // Add visible class
    element.classList.add('visible');
    
    // Special handling for project cards with stagger
    if (element.classList.contains('project-card')) {
      const cards = document.querySelectorAll('.project-card');
      const index = Array.from(cards).indexOf(element);
      element.style.transitionDelay = `${index * 0.1}s`;
    }
    
    // Special handling for contact form elements
    if (element.classList.contains('contact-info')) {
      const contactForm = document.querySelector('.contact-form');
      if (contactForm && !contactForm.classList.contains('visible')) {
        setTimeout(() => {
          contactForm.classList.add('visible');
        }, 200);
      }
    }
  }

  addScrollListeners() {
    let ticking = false;
    
    const updateNavbar = () => {
      const navbar = document.querySelector('.navbar');
      const scrolled = window.scrollY > 50;
      
      if (scrolled) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  checkInitialElements() {
    // Check if elements are already in view on page load
    this.animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        this.animateElement(element);
        this.observer.unobserve(element);
      }
    });
  }

  // Method to add new elements dynamically
  addElement(element) {
    if (element && !this.animatedElements.has(element)) {
      this.observer.observe(element);
      this.animatedElements.add(element);
    }
  }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// ===== HERO SECTION SPECIAL ANIMATIONS =====
const initHeroAnimations = () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    // Trigger hero animations immediately on load
    setTimeout(() => {
      hero.classList.add('visible');
    }, 100);
  }
};

// Initialize hero animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroAnimations);

// ===== Project Data (Dynamic) =====
const projectsData = [
  {
    title: "Library Project",
    description:
      "A dynamic library with books browsing and add-to-cart features.",
    link: "projects/library-site/library.html",
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

    // Add to scroll animations system
    scrollAnimations.addElement(card);
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

// ===== THEME TOGGLE SYSTEM =====
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.themeIcon = this.themeToggle?.querySelector(".theme-icon");
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();

    this.init();
  }

  init() {
    // Apply initial theme
    this.applyTheme(this.currentTheme);

    // Add event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
    }

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.currentTheme = e.matches ? "dark" : "light";
          this.applyTheme(this.currentTheme);
        }
      });
  }

  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  getStoredTheme() {
    return localStorage.getItem("theme");
  }

  storeTheme(theme) {
    localStorage.setItem("theme", theme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(this.currentTheme);
    this.storeTheme(this.currentTheme);
  }

  applyTheme(theme) {
    // Set data attribute on document
    document.documentElement.setAttribute("data-theme", theme);

    // Update toggle button
    if (this.themeToggle) {
      this.themeToggle.setAttribute("data-theme", theme);
    }

    // Update icon
    if (this.themeIcon) {
      this.themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    // Update aria-label
    if (this.themeToggle) {
      this.themeToggle.setAttribute(
        "aria-label",
        `Switch to ${theme === "dark" ? "light" : "dark"} theme`
      );
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !subject || !message) {
      showContactError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      showContactError("Please enter a valid email address");
      return;
    }

    // Show success message
    showContactSuccess(
      "Thank you for your message! I'll get back to you soon."
    );
    contactForm.reset();
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showContactError(message) {
  showContactMessage(message, "error");
}

function showContactSuccess(message) {
  showContactMessage(message, "success");
}

function showContactMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".contact-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageDiv = document.createElement("div");
  messageDiv.className = "contact-message";
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    background: ${type === "error" ? "#ff4444" : "#00bfa6"};
    color: white;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
    text-align: center;
    font-weight: 500;
  `;

  // Insert after form
  contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}
