(function () {
  let currentLang = 'ru';
  let currentMod = 0;
  let currentStage = 0;

  function rebuildLabels() {
  const layer = document.getElementById('labels-layer');
  if (!layer || !window.ANAT_LABELS) return;
  layer.innerHTML = '';

  const items = window.ANAT_LABELS[currentMod] || [];
  window._labelItems = items; // ← добавить эту строку
  items.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'anat-pin';
    el.textContent = item[currentLang] || item.en;
    layer.appendChild(el);
  });
}  function updateLabelPositions() {
    if (!window._labelItems || !window.AtlasEngine.getView) return;
    const view = AtlasEngine.getView();
    const els = document.querySelectorAll('.anat-pin');
    window._labelItems.forEach((item, i) => {
      const p = AtlasRender.project(item.pos[0], item.pos[1], item.pos[2], view.cx, view.cy, view.scale);
      if (!els[i]) return;
      els[i].style.left = p.sx + 'px';
      els[i].style.top = p.sy + 'px';
      els[i].style.opacity = Number.isNaN(p.sx) ? '0' : '1';
    });
  }


 function renderUI() {
    const langData = DB[currentLang] || DB.ru;
    const modData = langData.modules[currentMod];
    const stateData = modData.states[currentStage];

    document.getElementById('ui-sub').textContent = langData.ui.sub;
    document.getElementById('ui-mod-label').textContent = langData.ui.modLabel;
    document.getElementById('ui-tactics-label').textContent = langData.ui.tacticsLabel;
    document.getElementById('ui-author-label').textContent = langData.ui.authorLabel;
    document.getElementById('ui-hint').textContent = langData.ui.hint;
    document.getElementById('ui-disc').textContent = langData.ui.disc;
    document.getElementById('btn-doctor').textContent = '🩺 ' + langData.ui.editBtn;

    const list = document.getElementById('section-list');
    list.innerHTML = '';
    langData.ui.tabs.forEach((title, idx) => {
      const btn = document.createElement('button');
      btn.className = 'section-item' + (idx === currentMod ? ' active' : '');
      btn.textContent = `${idx + 1}. ${title}`;
      btn.onclick = () => {
        currentMod = idx;
        currentStage = 0;
        renderUI();
        rebuildLabels();
        AtlasEngine.buildScene(currentMod, currentStage);
      };
      list.appendChild(btn);
    });

    modData.buttons.forEach((btnText, idx) => {
      const btn = document.getElementById(`stage-btn-${idx}`);
      btn.textContent = btnText;
      btn.classList.toggle('active', idx === currentStage);
    });

    const pill = document.getElementById('info-pill');
    pill.textContent = stateData.pill;
    pill.style.color = stateData.color;
    pill.style.background = stateData.color + '22';

    document.getElementById('info-title').textContent = stateData.title;
    document.getElementById('info-desc').textContent = stateData.desc;
    document.getElementById('info-tactics').textContent = stateData.tactics;
    document.getElementById('info-author').textContent = stateData.author;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.onclick = () => {
        document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = btn.dataset.lang;
        renderUI();
        rebuildLabels();
      };
    });

    document.querySelectorAll('.stage-btn').forEach((btn) => {
      btn.onclick = () => {
        currentStage = Number(btn.dataset.stage);
        renderUI();
        AtlasEngine.buildScene(currentMod, currentStage);
      };
    });

    document.getElementById('cam-front').onclick = () => AtlasEngine.setView('front');
    document.getElementById('cam-side').onclick = () => AtlasEngine.setView('side');
    document.getElementById('cam-top').onclick = () => AtlasEngine.setView('top');

    document.getElementById('toggle-xray').onclick = function () {
      this.classList.toggle('active', AtlasEngine.toggleXray());
    };

    document.getElementById('toggle-pause').onclick = function () {
      this.classList.toggle('active', AtlasEngine.togglePause());
    };

    document.getElementById('toggle-fs').onclick = () => {
      const vp = document.getElementById('viewport-container');
      if (!document.fullscreenElement) vp.requestFullscreen().catch(() => {});
      else document.exitFullscreen();
    };

    document.getElementById('btn-doctor').onclick = () => {
      const url = ['https:/', 'github.com', 'sggerserg501-gif', 'axon-universe', 'issues', 'new'].join('/');
      window.open(url, '_blank');
    };

    renderUI();
    rebuildLabels();
        window._onEngineFrame = updateLabelPositions;
    AtlasEngine.init('canvas-3d', () => {
      AtlasEngine.buildScene(currentMod, currentStage);
    });
  });
})();
