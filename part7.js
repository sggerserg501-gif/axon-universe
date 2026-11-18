// part7.js — Сердце и сосуды: сборка из сфер (формат движка: pts + tubes)
(function () {
  'use strict';

  var pts = [];    // шары: { x, y, z, r }
  var tubes = [];  // трубки: { from:[x,y,z], to:[x,y,z], r, color }
  var labels = []; // подписи: { text, x, y, z }
  var polys = [];  // движок полигонов не рисует — держим пусто

  // ---- Тело сердца: центральная цепочка сужается к верхушке ----
  var i, t, x, y, z, r;
  for (i = 0; i <= 15; i++) {
    t = i / 15;                       // 0 — основание, 1 — верхушка
    x = 0;
    y = 60 - 110 * t;                 // вниз от основания
    z = 0;
    r = 40 - 26 * t;                  // 40 -> 14
    pts.push({ x: x, y: y, z: z, r: r });
  }

  // ---- Боковые дольки: расширяем массу, чтобы не было «гусеницы» ----
  for (i = 0; i <= 5; i++) {
    t = i / 5;
    x = 22 + 6 * t;
    y = 40 - 70 * t;
    z = -6;
    r = 20 - 10 * t;
    pts.push({ x: x, y: y, z: z, r: r });

    pts.push({ x: -x, y: y, z: -z, r: r }); // зеркальная сторона
  }

  // ---- Предсердия: аккуратные бугорки сверху (не великаны) ----
  pts.push({ x: -26, y: 62, z: 4, r: 12 });
  pts.push({ x: 26, y: 62, z: -4, r: 13 });

  // ---- Аорта: поднимается и загибается дугой ----
  tubes.push({ from: [6, 66, 0], to: [6, 104, 0], r: 11, color: 0xd23a3a });
  tubes.push({ from: [6, 104, 0], to: [16, 122, 6], r: 11, color: 0xd23a3a });
  tubes.push({ from: [16, 122, 6], to: [2, 132, 2], r: 11, color: 0xd23a3a });

  // ---- Лёгочный ствол: синяя трубка слева ----
  tubes.push({ from: [-8, 70, -4], to: [-20, 112, -10], r: 9, color: 0x3a7fd2 });

  // ---- Коронарные артерии: тонкие светло-красные на поверхности ----
  tubes.push({ from: [10, 56, 30], to: [24, 30, 34], r: 3, color: 0xe88a8a });
  tubes.push({ from: [10, 56, 30], to: [4, 20, 34], r: 3, color: 0xe88a8a });
  tubes.push({ from: [-10, 56, 30], to: [-26, 34, 30], r: 3, color: 0xe88a8a });

  // ---- Подписи ----
  labels.push({ text: 'Дуга аорты', x: 16, y: 124, z: 6 });
  labels.push({ text: 'Коронарная артерия', x: 18, y: 40, z: 36 });

  window.Part7 = {
    pts: pts,
    tubes: tubes,
    labels: labels,
    polys: polys,
    stages: {
      1: { plaque: null, ischemia: null,
           text: 'Здоровый миокард и коронарный кровоток' },
      2: { plaque: { x: 18, y: 44, z: 32, r: 6, color: 0xe8c33a },
           ischemia: null,
           text: 'Спазм / стенокардия' },
      3: { plaque: { x: 18, y: 44, z: 32, r: 8, color: 0xe8c33a },
           ischemia: { x: 4, y: 10, z: 26, r: 16, color: 0x3a1a1a },
           text: 'Закупорка артерии / ишемия' }
    },
    pulse: 1.06 // амплитуда «дыхания» сердца
  };
})();
