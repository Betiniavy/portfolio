/* =========================================
   GSAP SETUP
========================================= */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================
   HERO PIN (DESKTOP ONLY)
========================================= */

if (!prefersReducedMotion && window.innerWidth > 768) {

  const hero = document.querySelector(".hero");

  if (hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false
    });
  }

}


/* =========================================
   HERO ENTRANCE
========================================= */

if (!prefersReducedMotion) {

  const heroItems = document.querySelectorAll(
    ".hero .eyebrow, .hero h1, .hero .hero-note, .hero .btn-primary"
  );

  if (heroItems.length) {
    gsap.fromTo(
      heroItems,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2
      }
    );
  }

}


/* =========================================
   HERO FLOATING LAYERS (DESKTOP ONLY)
========================================= */

if (!prefersReducedMotion && window.innerWidth > 768) {

  const layers = gsap.utils.toArray(".hero-layer");

  layers.forEach((layer, i) => {
    gsap.to(layer, {
      y: (i % 2 === 0 ? -1 : 1) * (30 + i * 6),
      duration: 3 + i * 0.3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
  });

}


/* =========================================
   SECTION REVEALS
========================================= */

if (!prefersReducedMotion) {

  gsap.utils.toArray(".section").forEach(section => {

    const heading = section.querySelector("h2");

    const container = section.querySelector(
      ".case-grid, .projects-grid, .skills-grid, .cta-actions"
    );

    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%"
        },
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    }

    if (container) {
      gsap.from(container, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out"
      });
    }

  });

}


/* =========================================
   PROJECT CARD STAGGER
========================================= */

if (!prefersReducedMotion) {

  const projectGrid = document.querySelector(".projects-grid");

  if (projectGrid) {
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: projectGrid,
        start: "top 85%"
      },
      y: 24,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out"
    });
  }

}


/* =========================================
   SKILLS FILTER
========================================= */

const filters = document.querySelectorAll(".skills-filter button");
const cards = document.querySelectorAll(".skill-card");

filters.forEach(button => {

  button.addEventListener("click", () => {

    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {

      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.style.display = "flex";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
      }

    });

  });

});


/* =========================================
   MOBILE NAV TOGGLE
========================================= */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* Close menu when a link is clicked */

  document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });

  });

}


/* =========================================
   CLOSE MOBILE MENU IF RESIZED TO DESKTOP
========================================= */

window.addEventListener("resize", () => {

  if (window.innerWidth > 768 && navLinks) {
    navLinks.classList.remove("active");
  }

});


/* =========================================
   ACCESSIBILITY SAFETY
========================================= */

if (prefersReducedMotion) {
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}