(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof resizeCanvas === "function") resizeCanvas();
    if (typeof updateUI === "function") updateUI();
  });
})();
