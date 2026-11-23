(function () {
  const base = 'https://jsdelivr.net';
  const parts = [
    base + '/build/three.min.js',
    base + '/examples/js/loaders/GLTFLoader.js',
    'glb-data.js',
    'glb-work.js'
  ];
  function next(i) {
    if (i >= parts.length) return;
    const s = document.createElement('script');
    s.src = parts[i];
    s.onload = () => next(i + 1);
    document.body.appendChild(s);
  }
  next(0);
})();
