const canvas = document.getElementById("canvas3d");
const ctx = canvas.getContext("2d");

let rotX = 0.25;
let rotY = -0.45;
let zoom = 2.2;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

let currentLang = "ru";
let currentMod = 0;
let currentState = 0;
let isPaused = false;
let isXray = false;

window.AtlasParts = {};

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  if (canvas.width !== rect.width || canvas.height !== rect.height) {
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
}

function project3D(x, y, z) {
  const cy = Math.cos(rotY);
  const sy = Math.sin(rotY);
  const cx = Math.cos(rotX);
  const sx = Math.sin(rotX);

  const x1 = x * cy - z * sy;
  const z1 = x * sy + z * cy;
  const y2 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;

const fov = 720;
const sc = (fov / (fov + z2 + 80)) * zoom * 1.45;

  return {
    x: canvas.width * 0.5 + x1 * sc,
    y: canvas.height * 0.5 + y2 * sc,
    z: z2,
    sc: sc
  };
}

canvas.addEventListener("mousedown", function (e) {
  isDragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

window.addEventListener("mouseup", function () {
  isDragging = false;
});

window.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  rotY += (e.clientX - lastMouseX) * 0.008;
  rotX += (e.clientY - lastMouseY) * 0.008;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

canvas.addEventListener("wheel", function (e) {
  e.preventDefault();
  zoomStep(e.deltaY < 0 ? 0.1 : -0.1);
}, { passive: false });

function zoomStep(delta) {
  zoom = Math.max(0.45, Math.min(2.4, zoom + delta));
}

function setCameraView(mode) {
  isPaused = true;
  if (typeof updatePauseBtn === "function") updatePauseBtn();
  if (mode === "front") { rotX = 0.05; rotY = 0.0; }
  if (mode === "side")  { rotX = 0.05; rotY = -1.57; }
  if (mode === "top")   { rotX = 1.48; rotY = 0.0; }
}
