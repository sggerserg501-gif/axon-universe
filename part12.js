(function () {
  window.addEventListener("resize", function () {
    if (typeof resizeCanvas === "function") {
      resizeCanvas();
    }
  });

  if (typeof updateUI === "function") {
    updateUI();
  }
})();
