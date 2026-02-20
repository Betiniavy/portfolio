/* =========================================
   GSAP SETUP
========================================= */
gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* =========================================
   HERO PIN (CLEAN SYSTEM)
========================================= */
if (!prefersReducedMotion) {
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    pin: true,
    pinSpacing: false   // critical: prevents extra gap
  });
}
if (!prefersReducedMotion) {
  gsap.fromTo(
    ".hero .eyebrow, .hero h1, .hero .hero-note, .hero .btn-primary",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12,
      delay: 0.2
    }
  );
}


/* =========================================
   HERO FLOATING LAYERS
========================================= */
if (!prefersReducedMotion && document.querySelector(".hero-layer")) {
  const layers = gsap.utils.toArray(".hero-layer");

  layers.forEach((layer, i) => {
    gsap.to(layer, {
      y: (i % 2 === 0 ? -1 : 1) * (40 + i * 8),
      duration: 3 + i * 0.4,
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
    const content = section.querySelectorAll(
      "p, .projects-grid, .skills-grid, .cta-actions"
    );

    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%"
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }

    if (content.length) {
      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out"
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
    y: 28,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out"
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

      gsap.to(card, {
        autoAlpha: match ? 1 : 0,
        scale: match ? 1 : 0.96,
        duration: 0.25,
        ease: "power2.out"
      });

      card.style.pointerEvents = match ? "auto" : "none";
    });
  });
});

/* =========================================
   ACCESSIBILITY SAFETY
========================================= */
if (prefersReducedMotion) {
  ScrollTrigger.getAll().forEach(trigger => trigger.disable());
}
