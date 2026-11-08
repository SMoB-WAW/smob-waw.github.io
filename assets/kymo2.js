// Hero kymograph: loads assets/kymo.png and reveals it line by line,
// the way a kymograph is acquired on the instrument.
// To use a different kymograph, replace assets/kymo.png (any size; a wide strip works best).
(function () {
  var canvas = document.getElementById("kymo");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
 
  // Keep the image's own proportions and smooth scaling.
  canvas.style.height = "auto";
  canvas.style.imageRendering = "auto";
 
  var img = new Image();
  img.onload = function () {
    var W = img.naturalWidth, H = img.naturalHeight;
    canvas.width = W;
    canvas.height = H;
 
    var reduce = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { ctx.drawImage(img, 0, 0); return; }
 
    ctx.fillStyle = "#04060a";
    ctx.fillRect(0, 0, W, H);
 
    var duration = 3500, t0 = null, shown = 0;   // full reveal in ~3.5 s
    function step(t) {
      if (t0 === null) t0 = t;
      var target = Math.min(W, Math.ceil(W * (t - t0) / duration));
      if (target > shown) {
        ctx.drawImage(img, shown, 0, target - shown, H, shown, 0, target - shown, H);
        shown = target;
      }
      if (shown < W) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  img.src = "assets/kymo.png";
})();
 
var y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
 
