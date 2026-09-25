document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // MOBILE MENU
  // ==============================

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      const isOpen = navLinks.classList.contains("active");

      menuBtn.textContent = isOpen ? "✕" : "☰";
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-label", "Open menu");
      });
    });
  }


  // ==============================
  // SMOOTH SCROLL
  // ==============================

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  // ==============================
  // ACTIVE NAVIGATION LINK
  // ==============================

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 180;
      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        currentSection = section.id;
      }

    });

    navItems.forEach((item) => {

      item.classList.remove("active");

      if (
        item.getAttribute("href") === `#${currentSection}`
      ) {
        item.classList.add("active");
      }

    });

  }

  window.addEventListener("scroll", updateActiveNav);

  updateActiveNav();


  // ==============================
  // NAVBAR SCROLL EFFECT
  // ==============================

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (!navbar) {
      return;
    }

    if (window.scrollY > 40) {

      navbar.style.background =
        "rgba(7, 10, 13, 0.95)";

      navbar.style.boxShadow =
        "0 10px 35px rgba(0, 0, 0, 0.25)";

    } else {

      navbar.style.background =
        "rgba(7, 10, 13, 0.78)";

      navbar.style.boxShadow = "none";

    }

  }

  window.addEventListener("scroll", updateNavbar);

  updateNavbar();


  // ==============================
  // PROFILE CARD 3D TILT
  // ==============================

  const profileCard =
    document.querySelector(".profile-card");

  if (
    profileCard &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    profileCard.addEventListener("mousemove", (event) => {

      const rect =
        profileCard.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateX =
        ((centerY - y) / centerY) * 7;

      const rotateY =
        ((x - centerX) / centerX) * 7;

      profileCard.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-6px)
      `;

    });


    profileCard.addEventListener("mouseleave", () => {

      profileCard.style.transform = `
        perspective(1000px)
        rotateY(-5deg)
        rotateX(3deg)
      `;

    });

  }


  // ==============================
  // FLOATING CARD PARALLAX
  // ==============================

  const heroVisual =
    document.querySelector(".hero-visual");

  const floatingCards =
    document.querySelectorAll(".float-card");

  if (
    heroVisual &&
    floatingCards.length > 0 &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    heroVisual.addEventListener("mousemove", (event) => {

      const rect =
        heroVisual.getBoundingClientRect();

      const mouseX =
        (event.clientX - rect.left) /
        rect.width -
        0.5;

      const mouseY =
        (event.clientY - rect.top) /
        rect.height -
        0.5;

      floatingCards.forEach((card, index) => {

        const strength =
          10 + index * 5;

        const x =
          mouseX * strength;

        const y =
          mouseY * strength;

        card.style.transform =
          `translate(${x}px, ${y}px)`;

      });

    });


    heroVisual.addEventListener("mouseleave", () => {

      floatingCards.forEach((card) => {
        card.style.transform = "";
      });

    });

  }


  // ==============================
  // SCROLL REVEAL ANIMATION
  // ==============================

  const revealElements =
    document.querySelectorAll(
      ".section-heading, " +
      ".about-text, " +
      ".stats-grid, " +
      ".skill-card, " +
      ".project-card, " +
      ".experience-card, " +
      ".contact-box"
    );


  revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(30px)";

    element.style.transition =
      "opacity 0.7s ease, transform 0.7s ease";

  });


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // ==============================
  // STAGGER ANIMATIONS
  // ==============================

  const staggerGroups = [
    ".skill-card",
    ".project-card",
    ".stat-card"
  ];


  staggerGroups.forEach((selector) => {

    document
      .querySelectorAll(selector)
      .forEach((element, index) => {

        element.style.transitionDelay =
          `${index * 80}ms`;

      });

  });


  // ==============================
  // PROFILE IMAGE FALLBACK
  // ==============================

  const profileImage =
    document.querySelector(".profile-image");

  if (profileImage) {

    profileImage.addEventListener("error", () => {

      profileImage.style.display = "none";

      const imageWrap =
        document.querySelector(".profile-image-wrap");

      if (imageWrap) {

        imageWrap.style.background =
          "linear-gradient(135deg, #1db954, #10171c)";

        imageWrap.style.borderRadius = "50%";

        imageWrap.innerHTML = `
          <span style="
            position:absolute;
            inset:0;
            display:grid;
            place-items:center;
            font-size:3rem;
            font-weight:800;
            color:#07100a;
          ">
            AK
          </span>
        `;

      }

    });

  }


  // ==============================
  // CURRENT YEAR
  // ==============================

  const footerText =
    document.querySelector("footer p:last-child");

  if (footerText) {

    footerText.textContent =
      `© ${new Date().getFullYear()} Ashish Kumar`;

  }


  // ==============================
  // ESCAPE KEY
  // ==============================

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (navLinks) {
        navLinks.classList.remove("active");
      }

      if (menuBtn) {

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
          "aria-label",
          "Open menu"
        );

      }

    }

  });


  // ==============================
  // CONSOLE MESSAGE
  // ==============================

  console.log(
    "%cASHISH.DEV 🚀",
    "color:#1db954;font-size:22px;font-weight:bold;"
  );

  console.log(
    "%cWelcome to Ashish Kumar's portfolio.",
    "color:#aab4bb;font-size:13px;"
  );

});

// ==============================
// PORTFOLIO QR CODE
// ==============================

const qrBtn = document.getElementById("qrBtn");
const qrModal = document.getElementById("qrModal");
const qrClose = document.getElementById("qrClose");
const qrImage = document.getElementById("qrImage");
const qrUrl = document.getElementById("qrUrl");

if (qrBtn && qrModal && qrImage) {

  qrBtn.addEventListener("click", () => {

    const portfolioURL = window.location.href;

    const qrAPI =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      encodeURIComponent(portfolioURL);

    qrImage.src = qrAPI;

    if (qrUrl) {
      qrUrl.textContent = portfolioURL;
    }

    qrModal.classList.add("active");

  });


  if (qrClose) {

    qrClose.addEventListener("click", () => {
      qrModal.classList.remove("active");
    });

  }


  qrModal.addEventListener("click", (event) => {

    if (event.target === qrModal) {
      qrModal.classList.remove("active");
    }

  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      qrModal.classList.remove("active");
    }

  });

}
