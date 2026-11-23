(function () {
  const parts = [
    'three.min.js',
    'GLTFLoader.js',
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
