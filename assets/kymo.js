// Procedural kymograph for the hero. x = time, y = position along the DNA tether.
// Green: a replisome translocating along DNA; magenta: a stationary protein roadblock.
// Replace with a real kymograph image (assets/kymo.png) whenever you like.
(function () {
  var canvas = document.getElementById("kymo");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  // Low-res pixel grid, scaled up crisply: reads like confocal pixels.
  var W = 300, H = 64;
  canvas.width = W; canvas.height = H;

  var seed = 7;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function gauss() { return Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand()); }

  var green = new Float32Array(W * H), mag = new Float32Array(W * H);
  function spot(buf, x, y, amp, sigma) {
    for (var dy = -3; dy <= 3; dy++) {
      var yy = Math.round(y) + dy;
      if (yy < 0 || yy >= H) continue;
      var d = yy - y;
      buf[yy * W + x] += amp * Math.exp(-(d * d) / (2 * sigma * sigma));
    }
  }

  // Roadblock: binds at t=20, sits at y=40, dissociates at t=205.
  var blockY = 40, blockOn = 20, blockOff = 205;
  // Replisome: loads at t=30 near y=6, moves at ~0.21 px/frame, stalls at the block.
  var ry = 6, start = 30, v = 0.30;
  for (var x = 0; x < W; x++) {
    if (x >= blockOn && x < blockOff) spot(mag, x, blockY + 0.35 * gauss(), 0.95, 1.1);
    if (x >= start && x < W - 6) {
      var limit = (x < blockOff) ? blockY - 2.4 : H - 4;
      ry = Math.min(ry + v + 0.08 * gauss(), limit);
      spot(green, x, ry + 0.3 * gauss(), 1.0, 1.1);
    }
  }
  // A few short transient binding events.
  [[60, 52, 14], [118, 18, 9], [150, 57, 20], [232, 24, 11], [262, 47, 16]].forEach(function (e) {
    for (var t = e[0]; t < e[0] + e[2] && t < W; t++) spot(green, t, e[1] + 0.4 * gauss(), 0.55, 1.0);
  });

  var img = ctx.createImageData(W, H);
  for (var i = 0; i < W * H; i++) {
    var g = Math.max(0, green[i] + 0.06 * Math.abs(gauss()));
    var m = Math.max(0, mag[i] + 0.05 * Math.abs(gauss()));
    img.data[i * 4]     = Math.min(255, 4 + 235 * m + 40 * g);
    img.data[i * 4 + 1] = Math.min(255, 6 + 240 * g);
    img.data[i * 4 + 2] = Math.min(255, 10 + 190 * m + 70 * g);
    img.data[i * 4 + 3] = 255;
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { ctx.putImageData(img, 0, 0); return; }

  // One orchestrated moment: the kymograph is acquired line by line, as on the instrument.
  ctx.fillStyle = "#04060a"; ctx.fillRect(0, 0, W, H);
  var col = 0, perFrame = 2;
  function step() {
    var n = Math.min(perFrame, W - col);
    ctx.putImageData(img, 0, 0, col, 0, n, H);
    col += n;
    if (col < W) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

var y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
