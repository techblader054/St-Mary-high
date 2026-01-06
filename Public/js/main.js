// --- CONFIGURATION ---
const THEME_STORAGE_KEY = "stmarys_theme_preference";
const CURRENT_PATH = window.location.pathname.split("/").pop() || "index.html";

// --- THEME MANAGEMENT ---
function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");
  localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  updateThemeIcon(isDarkMode);
}

function applyTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const isDark = savedTheme === "dark";
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const themeSwitch = document.getElementById("themeSwitch");
  if (themeSwitch) {
    themeSwitch.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
}

function initTheme() {
  applyTheme();
  const themeSwitch = document.getElementById("themeSwitch");
  if (themeSwitch) {
    themeSwitch.addEventListener("click", toggleTheme);
  }
}

// --- DYNAMIC HEADER CONTENT (Navigation Bar) ---
function loadHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (!headerPlaceholder) return;

  headerPlaceholder.innerHTML =
    '<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow" id="main-navbar"><a class="navbar-brand d-flex align-items-center" href="index.html"><img src="images/logo (1).png" alt="St. Mary\'s Logo" class="d-inline-block align-top mr-2" style="height: 40px;"><span class="d-none d-sm-inline font-weight-bold">St. Mary\'s School</span></a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarNav"><ul class="navbar-nav mr-auto"><li class="nav-item"><a class="nav-link" href="index.html">Home</a></li><li class="nav-item"><a class="nav-link" href="admissions.html">Admissions</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">About Us</a><div class="dropdown-menu"><a class="dropdown-item" href="history.html">Our History</a><a class="dropdown-item" href="principal.html">Principal\'s Message</a><a class="dropdown-item" href="facilities.html">Facilities</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">Academics</a><div class="dropdown-menu"><a class="dropdown-item" href="subjects.html">Subjects & Streams</a></div></li><li class="nav-item"><a class="nav-link" href="events.html">Events</a></li><li class="nav-item"><a class="nav-link" href="contact.html">Contact Us</a></li></ul><div class="d-flex align-items-center ml-lg-auto"><button class="btn btn-light btn-sm mr-2" id="themeSwitch"><i class="fas fa-moon"></i></button></div></div></nav>';

  const themeSwitch = document.getElementById("themeSwitch");
  if (themeSwitch) {
    themeSwitch.addEventListener("click", toggleTheme);
  }
}

// --- DYNAMIC FOOTER CONTENT ---
function loadFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  footerPlaceholder.innerHTML =
    '<footer class="text-center text-lg-start"><div class="container p-4"><div class="row"><div class="col-lg-6 col-md-12 mb-4 mb-md-0"><h5>St. Mary\'s School</h5><p>Educating future leaders since 1950.</p></div><div class="col-lg-3 col-md-6 mb-4 mb-md-0"><h5>Quick Links</h5><ul class="list-unstyled"><li><a href="admissions.html">Admissions</a></li><li><a href="events.html">Events</a></li><li><a href="contact.html">Contact</a></li></ul></div><div class="col-lg-3 col-md-6 mb-4 mb-md-0"><h5>Connect</h5><a href="https://share.google/rTptMediaWgvVrVLS" class="mr-3"><i class="fab fa-facebook"></i></a><a href="https://share.google/PLCuwaoV6dWKsN9BF" class="mr-3"><i class="fab fa-twitter"></i></a><a href="https://share.google/iV12LuKj3lpvk0SOj"><i class="fab fa-instagram"></i></a></div></div></div><div class="text-center p-3" style="background-color: rgba(0,0,0,0.2);">© 2025 St. Mary\'s School</div></footer>';
}

// --- ACTIVE LINK SETTING ---
function setActiveLink() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === CURRENT_PATH) {
      link.classList.add("active");
    }
  });
}

// --- CONTACT FORM HANDLER ---
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Send email using EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };

    emailjs.send("service_123", "contact_123", templateParams)
      .then(function(response) {
        alert("Inquiry sent successfully!");
        contactForm.reset();
      }, function(error) {
        alert("Failed to send inquiry. Please try again.");
        console.error("EmailJS error:", error);
        if (error && error.text) {
          console.error("Error details:", error.text);
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  initTheme();
  setActiveLink();
  initContactForm();
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 800, once: true });
  }
});






