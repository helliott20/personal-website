document.addEventListener("DOMContentLoaded", () => {
  // Touch Screens
  function isTouchDevice() {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
  }

  // Smooth Scroll
  const $main = document.getElementById("main");

  if (!isTouchDevice()) {
    $main.classList.add("is-active");

    if (!window.Smooth) {
      return;
    }

    const scroll = new window.Smooth({
      ease: 0.07,
      native: true,
      preload: true,
    });

    scroll.init();
  }
});
