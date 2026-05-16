//Funcionalidad de reviews
function initialReview() {
  const items = document.querySelectorAll(".testimonial-item");

  let current = 0;

  function updateCarousel() {
    items.forEach((item) => {
      item.classList.remove("active", "prev", "next", "hidden");
    });

    const prev = (current - 1 + items.length) % items.length;

    const next = (current + 1) % items.length;

    items[current].classList.add("active");

    items[prev].classList.add("prev");

    items[next].classList.add("next");

    items.forEach((item, index) => {
      if (index !== current && index !== prev && index !== next) {
        item.classList.add("hidden");
      }
    });
  }

  updateCarousel();

  setInterval(() => {
    current = (current + 1) % items.length;

    updateCarousel();
  }, 3000);
}
