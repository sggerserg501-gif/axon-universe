function shadeColor(hex, factor) {
  if (!hex || !hex.startsWith("#")) return hex;
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.min(255, Math.max(0, Math.round(r * factor)));
  g = Math.min(255, Math.max(0, Math.round(g * factor)));
  b = Math.min(255, Math.max(0, Math.round(b * factor)));
  return "rgb(" + r + "," + g + "," + b + ")";
}

function draw3DSphere(x, y, r, color, depthAlpha, isBone) {
  ctx.save();
  ctx.globalAlpha = (isXray && isBone) ? 0.20 : depthAlpha;
  const isGlow = color === "#ef4444" || color === "#f59e0b" || color === "#fef08a" || color === "#facc15";
  if (isGlow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = Math.min(20, r * 1.2);
  }
  if (color.startsWith("rgba")) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
    return;
  }
  const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.25, color);
  grad.addColorStop(0.8, shadeColor(color, 0.65));
  grad.addColorStop(1, "#060911");

  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  if (isXray && isBone) {
    ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
}

function draw3DTube(p1, p2, r1, r2, color, isBone) {
  ctx.save();
  if (isXray && isBone) ctx.globalAlpha = 0.22;
  ctx.lineCap = "round";
  const avgR = (r1 + r2) * 0.5;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = shadeColor(color, 0.45);
  ctx.lineWidth = avgR * 2.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = avgR * 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(p1.x - avgR * 0.25, p1.y - avgR * 0.25);
  ctx.lineTo(p2.x - avgR * 0.25, p2.y - avgR * 0.25);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = Math.max(1.5, avgR * 0.45);
  ctx.stroke();
  ctx.restore();
}

function toggleXray() {
  isXray = !isXray;
  const btn = document.getElementById("xrayBtn");
  if (btn) {
    btn.style.background = isXray ? "#0284c7" : "";
    btn.style.borderColor = isXray ? "#38bdf8" : "";
  }
}
