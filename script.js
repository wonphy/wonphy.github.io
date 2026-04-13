const chips = document.querySelectorAll(".chip");
const items = document.querySelectorAll(".timeline-item");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    chips.forEach((button) => button.classList.remove("is-active"));
    chip.classList.add("is-active");

    items.forEach((item) => {
      const tags = item.dataset.tags || "";
      const matches = filter === "all" || tags.includes(filter);
      item.classList.toggle("is-hidden", !matches);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(24px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          {
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards"
          }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".section, .hero-copy, .hero-panel").forEach((node) => {
  node.style.opacity = "0";
  observer.observe(node);
});
