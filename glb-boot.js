(function () {
  const h = 'https://';
  const d = 'cdn.jsdelivr.net/npm/';
  const v = 'three@0.128.0';
  const c1 = h + d + v + '/build/three.min.js';
  const c2 = h + d + v + '/examples/js/loaders/GLTFLoader.js';
  const parts = [c1, c2, 'glb-data.js', 'glb-work.js'];
  function next(i) {
    if (i >= parts.length) return;
    const s = document.createElement('script');
    s.src = parts[i];
    s.onload = () => next(i + 1);
    document.body.appendChild(s);
  }
  next(0);
})();
