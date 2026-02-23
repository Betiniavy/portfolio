/* =========================================
   GSAP SETUP
========================================= */

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const isDesktop = window.innerWidth > 768;


/* =========================================
   HERO PIN (DESKTOP ONLY)
========================================= */

if (!prefersReducedMotion && isDesktop) {
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false
  });
}


/* =========================================
   HERO ENTRANCE
========================================= */

if (!prefersReducedMotion) {
  gsap.fromTo(
    ".hero .eyebrow, .hero h1, .hero .hero-note, .hero .btn-primary",
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


/* =========================================
   HERO FLOATING LAYERS (DESKTOP ONLY)
========================================= */

if (!prefersReducedMotion && isDesktop) {
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
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 85%"
    },
    y: 24,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power3.out"
  });
}


/* =========================================
   SKILLS FILTER
========================================= */

const filterButtons = document.querySelectorAll(".skills-filter button");
const skillCards = document.querySelectorAll(".skill-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    skillCards.forEach(card => {
      const match = card.dataset.category === category;

      if (match) {
        card.classList.remove("hidden");

        gsap.fromTo(
          card,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );

      } else {
        card.classList.add("hidden");
      }
    });

  });
});


/* =========================================
   ACCESSIBILITY SAFETY
========================================= */

if (prefersReducedMotion) {
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}