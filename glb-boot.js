(function () {
  const p = location.protocol === 'https:' ? 'https://' : 'http://';
  const c1 = p + '://cloudflare.com';
  const c2 = p + 'cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
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
