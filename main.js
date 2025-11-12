import * as THREE from 'https://esm.sh/three@0.157.0';
import { OrbitControls } from 'https://esm.sh/three@0.157.0/examples/jsm/controls/OrbitControls.js';

/* Scene setup */
let scene, camera, renderer, controls, axesHelper, gridHelper;
const graphs = new Map();
let currentAxes = { xmin: -3, xmax: 3, ymin: -3, ymax: 3, zmin: -2, zmax: 2 };
let axesGroup = null;
let plotBoxHelper = null;
let viewMode = '3D';
let gradientArrow3D = null;
<<<<<<< HEAD
// Grupo para campo de gradiente en 3D (múltiples flechas)
=======
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
let gradientField3DGroup = null;

/* Presets */
const PRESETS = [
  { label: '7*x*y / exp(x^2 + y^2)', expr: '7*x*y / exp(x^2 + y^2)' },
  { label: '-4*x / (x^2 + y^2 + 1)', expr: '-4*x / (x^2 + y^2 + 1)' },
  { label: 'x^2 + y^2', expr: 'x^2 + y^2' },
  { label: '1 / (y - x^2)', expr: '1 / (y - x^2)' },
  { label: '2 - x^2 - y^2', expr: '2 - x^2 - y^2' },
  { label: 'x^2 - y^2', expr: 'x^2 - y^2' },
  { label: '(x + y) / (x - y)', expr: '(x + y) / (x - y)' },
  { label: '5 - x^2 - 4*x - y^2', expr: '5 - x^2 - 4*x - y^2' },
  { label: '-x^3 + 4*x*y - 2*y^2 + 1', expr: '-x^3 + 4*x*y - 2*y^2 + 1' },
  { label: '-3*x*y / (x^3 + y^3)', expr: '-3*x*y / (x^3 + y^3)' },
  { label: 'exp(-(x^2 + y^2))', expr: 'exp(-(x^2 + y^2))' },
  { label: '4 - x^2 - y^2', expr: '4 - x^2 - y^2' },
  { label: '7*x / exp(x^5 + y^2)', expr: '7*x / exp(x^5 + y^2)' },
  { label: '2 + x/4 + y/2', expr: '2 + x/4 + y/2' },
  { label: '3*x + 5*y - 1', expr: '3*x + 5*y - 1' },
  { label: 'asin(x + y)', expr: 'asin(x + y)' },
  { label: 'acos(y - x^2)', expr: 'acos(y - x^2)' },
  { label: 'exp(x^2 + 2*x - y)', expr: 'exp(x^2 + 2*x - y)' },
  { label: 'sin(x^2 + y^2)', expr: 'sin(x^2 + y^2)' },
  { label: 'cos(x^2 + y^2)', expr: 'cos(x^2 + y^2)' },
  { label: '1 / cos(x*y)', expr: '1 / cos(x*y)' },
  { label: '2*y^3 + 3*x^2 - 6*x*y', expr: '2*y^3 + 3*x^2 - 6*x*y' },
  { label: '10*x^2*y - 5*x^2 - 4*y^2 - x^4', expr: '10*x^2*y - 5*x^2 - 4*y^2 - x^4' },
  { label: '(1/10)*(-17*x + 6*x^2 - (2/3)*x^3 + 3*y + x*y - y^2) + 3.5', expr: '(1/10)*(-17*x + 6*x^2 - (2/3)*x^3 + 3*y + x*y - y^2) + 3.5' },
  { label: 'exp(abs(x*y)) - 1', expr: 'exp(abs(x*y)) - 1' },
  { label: '1 - exp(abs(x*y))', expr: '1 - exp(abs(x*y))' },
  { label: 'exp(x*y) - 1', expr: 'exp(x*y) - 1' },
  { label: '(2*x^2 + y^2) * exp(1 - x^2 - y^2)', expr: '(2*x^2 + y^2) * exp(1 - x^2 - y^2)' },
  { label: 'exp(sqrt(x^2 + y^2))', expr: 'exp(sqrt(x^2 + y^2))' },
  { label: 'floor(sin(x + y) + 1)', expr: 'floor(sin(x + y) + 1)' },
  { label: 'cos(x)^2 * cos(y)^2', expr: 'cos(x)^2 * cos(y)^2' },
  { label: 'sin(x^2 + y^2) / (x^2 + y^2)', expr: 'sin(x^2 + y^2) / (x^2 + y^2)' },
  { label: '((2 - y^2 + x^2) * exp(1 - x^2 - y^2)) / 4', expr: '((2 - y^2 + x^2) * exp(1 - x^2 - y^2)) / 4' },
  { label: '-(1 / (x^2 + y^2))', expr: '-(1 / (x^2 + y^2))' },
  { label: '(1 - x^2 - y^2) / abs(1 - x^2 - y^2)', expr: '(1 - x^2 - y^2) / abs(1 - x^2 - y^2)' },
  { label: '(x - 2*y) / (x^2 + y^2)', expr: '(x - 2*y) / (x^2 + y^2)' },
  { label: '((x^2 - y^2) / (x^2 + y^2))^2', expr: '((x^2 - y^2) / (x^2 + y^2))^2' },
  { label: '(x^2 + y^2 - 5) / (x^2 - y^2)', expr: '(x^2 + y^2 - 5) / (x^2 - y^2)' },
  { label: 'sin(cos(x - y))', expr: 'sin(cos(x - y))' },
  { label: '(x^2 + y^2) / (x*y)', expr: '(x^2 + y^2) / (x*y)' },
  { label: 'x^2*y / (x^4 + y^2)', expr: 'x^2*y / (x^4 + y^2)' },
  { label: '(2*x - y^2) / (2*x^2 + y)', expr: '(2*x - y^2) / (2*x^2 + y)' },
  { label: '-3*x*y / (x^2 + y^2)', expr: '-3*x*y / (x^2 + y^2)' },
  { label: '3/(x^2 + y^2) - 7/((x - 2)^2 + (y + 1)^2)', expr: '3/(x^2 + y^2) - 7/((x - 2)^2 + (y + 1)^2)' },
  { label: 'x*y*(x^2 - y^2) / (x^2 + y^2)', expr: 'x*y*(x^2 - y^2) / (x^2 + y^2)' },
  { label: '2 + (1/2)*(4 - 0.025*(x + 2)^2 + 4*sin((x - 4)/5) + 2*cos((x + y)/4) + 5*sin(3 - (x - y)/10) + 0.2*cos((x + 2*y)/20))', expr: '2 + (1/2)*(4 - 0.025*(x + 2)^2 + 4*sin((x - 4)/5) + 2*cos((x + y)/4) + 5*sin(3 - (x - y)/10) + 0.2*cos((x + 2*y)/20))' },
  { label: '2 + (1/2)*(4 - 0.05*(x + 2)^2 + 10*sin((x - 4)/5) + 5*cos((x + y)/4) + 5*sin(3 - (x - y)/10) + 0.2*cos((x + 2*y)/20))', expr: '2 + (1/2)*(4 - 0.05*(x + 2)^2 + 10*sin((x - 4)/5) + 5*cos((x + y)/4) + 5*sin(3 - (x - y)/10) + 0.2*cos((x + 2*y)/20))' },
  { label: '0.8*(3.5*x/exp(x^2 + y^2) - y/exp(x^2 + y^2) + 1.05*sin(x*y)*cos(2*x))', expr: '0.8*(3.5*x/exp(x^2 + y^2) - y/exp(x^2 + y^2) + 1.05*sin(x*y)*cos(2*x))' },
  { label: '1.2*x*exp(-x^2 - 2*y^2) + 0.7*exp(-x^2 - (y - 2)^2) - 0.6*exp(-(x - 2)^2 - 2*(y - 1)^2) - 0.45*exp(-(x - 1.6)^2 - 3*(y - 2.4)^2)', expr: '1.2*x*exp(-x^2 - 2*y^2) + 0.7*exp(-x^2 - (y - 2)^2) - 0.6*exp(-(x - 2)^2 - 2*(y - 1)^2) - 0.45*exp(-(x - 1.6)^2 - 3*(y - 2.4)^2)' },
  { label: 'sin(x)^3 + sin(y)^3', expr: 'sin(x)^3 + sin(y)^3' },
  { label: '0.4*x*y^3 - y*x^3', expr: '0.4*x*y^3 - y*x^3' },
  { label: 'atan(tan(x) + tan(y))', expr: 'atan(tan(x) + tan(y))' },
  { label: '(10*x^2*y - 5*x^2 - 4*y^2 - x^4 - 2*y^4)/2', expr: '(10*x^2*y - 5*x^2 - 4*y^2 - x^4 - 2*y^4)/2' },
  { label: 'x^3 - y^2 - x', expr: 'x^3 - y^2 - x' },
  { label: 'x^4 + y^4 - 4*x*y + 1', expr: 'x^4 + y^4 - 4*x*y + 1' },
  { label: '3 + x^3 + y^3 - 3*x*y', expr: '3 + x^3 + y^3 - 3*x*y' },
  { label: 'y^4 - x^3 - 2*y^2 + 3*x', expr: 'y^4 - x^3 - 2*y^2 + 3*x' },
  { label: '(x^2 + 4*y^2) * exp(1 - x^2 - y^2)', expr: '(x^2 + 4*y^2) * exp(1 - x^2 - y^2)' },
  { label: 'log(x^2 - y^2)', expr: 'log(x^2 - y^2)' },
  { label: 'log(y - x^2)', expr: 'log(y - x^2)' },
  { label: 'sin(x^2 - y^2)', expr: 'sin(x^2 - y^2)' },
  { label: 'cos(x) * sin(y)', expr: 'cos(x) * sin(y)' },
  { label: 'sin(x + y)', expr: 'sin(x + y)' },
  { label: 'x * sin(y)', expr: 'x * sin(y)' },
  { label: 'log(1 + x^2 - y)', expr: 'log(1 + x^2 - y)' },
  { label: 'cos(x*y)', expr: 'cos(x*y)' },
  { label: 'cos(x) - sin(y)', expr: 'cos(x) - sin(y)' },
  { label: 'sin(2*x) + cos(y)', expr: 'sin(2*x) + cos(y)' },
  { label: 'cos(y)/sin(x)', expr: 'cos(y)/sin(x)' },
  { label: 'abs(x) + sin(x) + 3*cos(y)', expr: 'abs(x) + sin(x) + 3*cos(y)' },
  { label: 'x*exp(y) + 1', expr: 'x*exp(y) + 1' },
  { label: 'sqrt(4 - x^2 - y^2)', expr: 'sqrt(4 - x^2 - y^2)' },
  { label: 'cos(sqrt(x^2 + y^2))', expr: 'cos(sqrt(x^2 + y^2))' },
  { label: '-1 / sqrt(x^2 + y^2)', expr: '-1 / sqrt(x^2 + y^2)' },
  { label: '(1 - x^2 - y^2) / sqrt(abs(1 - x^2 - y^2))', expr: '(1 - x^2 - y^2) / sqrt(abs(1 - x^2 - y^2))' },
  { label: 'a*x^2 + b*x*y + c*y^2 + d*x + t*y', expr: 'a*x^2 + b*x*y + c*y^2 + d*x + t*y' },
  { label: '2*(4 - (5 - sqrt(x^2 + y^2))^2) + x*sin(y/2)', expr: '2*(4 - (5 - sqrt(x^2 + y^2))^2) + x*sin(y/2)' }
];

function initScene() {
  const container = document.getElementById('canvasContainer');
  const w = container.clientWidth;
  const h = container.clientHeight;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1117);

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
  camera.position.set(6, 6, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Habilitar clipping local para poder recortar dinámicamente las mallas
  renderer.localClippingEnabled = true;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);
  const ambLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambLight);

  updateAxesHelpers();

  window.addEventListener('resize', onResize);
  animate();
}

function onResize() {
  const container = document.getElementById('canvasContainer');
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);

  // Ajustar canvas 2D si está visible
  const cc = document.getElementById('contourCanvas');
  const cont = document.getElementById('contourContainer');
  if (cc && cont && cont.style.display !== 'none') {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    cc.width = cont.clientWidth * ratio;
    cc.height = cont.clientHeight * ratio;
    cc.style.width = cont.clientWidth + 'px';
    cc.style.height = cont.clientHeight + 'px';
  }
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

/* 2D Contours */
function drawContours2D({ exprString, axes, resolution, levelsCount, lineWidth, colorMode = 'red', gradient = false, gradientOverlay = null, gradientField = null }) {
  const canvas = document.getElementById('contourCanvas');
  const ctx = canvas.getContext('2d');
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const cont = document.getElementById('contourContainer');
  canvas.width = cont.clientWidth * ratio;
  canvas.height = cont.clientHeight * ratio;
  canvas.style.width = cont.clientWidth + 'px';
  canvas.style.height = cont.clientHeight + 'px';

  // Margen y área de dibujo
  const pad = 40 * ratio;
  const plotW = canvas.width - 2 * pad;
  const plotH = canvas.height - 2 * pad;

  // Fondo
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Borde del dominio
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1.2 * ratio;
  ctx.strokeRect(pad, pad, plotW, plotH);

  // Ejes y ticks
  const { xmin, xmax, ymin, ymax } = axes;
  const x2px = x => pad + ((x - xmin) / (xmax - xmin)) * plotW;
  const y2px = y => pad + ((ymax - y) / (ymax - ymin)) * plotH; // invert Y

  // Cuadrícula ligera y ticks numerados
  function niceStep(span) {
    const targetTicks = 9;
    const raw = span / targetTicks;
    const pow10 = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / pow10;
    let step;
    if (norm < 1.5) step = 1;
    else if (norm < 3.5) step = 2;
    else if (norm < 7.5) step = 5;
    else step = 10;
    return step * pow10;
  }
  const stepX = niceStep(xmax - xmin);
  const stepY = niceStep(ymax - ymin);

  // Grid vertical
  ctx.strokeStyle = '#2b3138';
  ctx.lineWidth = 1 * ratio;
  for (let x = Math.ceil(xmin / stepX) * stepX; x <= xmax; x += stepX) {
    const px = x2px(x);
    ctx.beginPath();
    ctx.moveTo(px, pad);
    ctx.lineTo(px, pad + plotH);
    ctx.stroke();
  }
  // Grid horizontal
  for (let y = Math.ceil(ymin / stepY) * stepY; y <= ymax; y += stepY) {
    const py = y2px(y);
    ctx.beginPath();
    ctx.moveTo(pad, py);
    ctx.lineTo(pad + plotW, py);
    ctx.stroke();
  }

  // Ticks numerados sobre ejes
  ctx.fillStyle = '#8b949e';
  ctx.font = `${12 * ratio}px Arial`;
  const tickLen = 6 * ratio;
  // X axis ticks (si eje X visible)
  if (ymin <= 0 && ymax >= 0) {
    for (let x = Math.ceil(xmin / stepX) * stepX; x <= xmax; x += stepX) {
      const px = x2px(x);
      const py = y2px(0);
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(px, py - tickLen);
      ctx.lineTo(px, py + tickLen);
      ctx.stroke();
      ctx.fillText(`${Number(x.toFixed(2))}`, px + 2 * ratio, py + 14 * ratio);
    }
  }
  // Y axis ticks (si eje Y visible)
  if (xmin <= 0 && xmax >= 0) {
    for (let y = Math.ceil(ymin / stepY) * stepY; y <= ymax; y += stepY) {
      const px = x2px(0);
      const py = y2px(y);
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.moveTo(px - tickLen, py);
      ctx.lineTo(px + tickLen, py);
      ctx.stroke();
      ctx.fillText(`${Number(y.toFixed(2))}`, px + 6 * ratio, py - 4 * ratio);
    }
  }

  // Eje X y Y en origen (si cae dentro)
  if (ymin <= 0 && ymax >= 0) {
    ctx.beginPath();
    ctx.moveTo(pad, y2px(0));
    ctx.lineTo(pad + plotW, y2px(0));
    ctx.stroke();
  }
  if (xmin <= 0 && xmax >= 0) {
    ctx.beginPath();
    ctx.moveTo(x2px(0), pad);
    ctx.lineTo(x2px(0), pad + plotH);
    ctx.stroke();
  }

  // Generar malla z(x,y)
  const raw = (exprString && exprString.trim().length > 0) ? exprString.trim() : '7*x*y / exp(x^2 + y^2)';
  let compiled;
  try {
    compiled = math.parse(raw).compile();
  } catch (e) {
    ctx.fillStyle = '#e11d48';
    ctx.fillText('Error de sintaxis', pad, pad - 12);
    return;
  }
  const nx = resolution, ny = resolution;
  const dx = (xmax - xmin) / (nx - 1);
  const dy = (ymax - ymin) / (ny - 1);
  const grid = new Array(ny);
  const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
  let zMin = Infinity, zMax = -Infinity;
  for (let iy = 0; iy < ny; iy++) {
    const y = ymin + iy * dy;
    grid[iy] = new Array(nx);
    for (let ix = 0; ix < nx; ix++) {
      const x = xmin + ix * dx;
      let z = NaN;
      try {
        z = compiled.evaluate({ x, y, ...paramDefaults });
      } catch (_) {}
      grid[iy][ix] = z;
      if (isFinite(z)) { zMin = Math.min(zMin, z); zMax = Math.max(zMax, z); }
    }
  }
  if (!isFinite(zMin) || !isFinite(zMax) || zMax === zMin) return;

  // Si hay valores positivos y negativos, usar rango simétrico para niveles
  if (zMin < 0 && zMax > 0) {
    const m = Math.max(Math.abs(zMin), Math.abs(zMax));
    zMin = -m;
    zMax = m;
  }

  // Niveles equiespaciados
  const levels = [];
  for (let i = 1; i <= levelsCount; i++) {
    const t = i / (levelsCount + 1);
    levels.push(zMin + t * (zMax - zMin));
  }

  // Marching squares
  const baseColors = { red: '#dc2626', blue: '#2563eb', green: '#16a34a', gray: '#888888' };
  const baseColor = baseColors[colorMode] || baseColors.red;
  ctx.lineWidth = Math.max(0.5, lineWidth || 1) * ratio;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (let i = 0; i < levels.length; i++) {
    const L = levels[i];
    if (gradient) {
      const t = (L - zMin) / (zMax - zMin);
      const hue = 220 - 220 * t; // azul → rojo
      ctx.strokeStyle = `hsl(${hue}, 85%, 60%)`;
    } else {
      ctx.strokeStyle = baseColor;
    }
    for (let iy = 0; iy < ny - 1; iy++) {
      const y0 = ymin + iy * dy;
      const y1 = ymin + (iy + 1) * dy;
      for (let ix = 0; ix < nx - 1; ix++) {
        const x0 = xmin + ix * dx;
        const x1 = xmin + (ix + 1) * dx;
        const z00 = grid[iy][ix];
        const z10 = grid[iy][ix + 1];
        const z01 = grid[iy + 1][ix];
        const z11 = grid[iy + 1][ix + 1];
        // Saltar celdas con valores no finitos
        if (!isFinite(z00) || !isFinite(z10) || !isFinite(z01) || !isFinite(z11)) continue;

        const s00 = z00 > L, s10 = z10 > L, s11 = z11 > L, s01 = z01 > L;
        const crossings = [];
        function interp(p0, p1, v0, v1) {
          const denom = (v1 - v0);
          if (!isFinite(denom) || Math.abs(denom) < 1e-12) return null;
          const t = (L - v0) / denom;
          return [p0[0] + t * (p1[0] - p0[0]), p0[1] + t * (p1[1] - p0[1])];
        }
        if (s00 !== s10) { const p = interp([x0, y0], [x1, y0], z00, z10); if (p) crossings.push(p); }
        if (s10 !== s11) { const p = interp([x1, y0], [x1, y1], z10, z11); if (p) crossings.push(p); }
        if (s11 !== s01) { const p = interp([x1, y1], [x0, y1], z11, z01); if (p) crossings.push(p); }
        if (s01 !== s00) { const p = interp([x0, y1], [x0, y0], z01, z00); if (p) crossings.push(p); }

        if (crossings.length === 2) {
          ctx.beginPath();
          ctx.moveTo(x2px(crossings[0][0]), y2px(crossings[0][1]));
          ctx.lineTo(x2px(crossings[1][0]), y2px(crossings[1][1]));
          ctx.stroke();
        } else if (crossings.length === 4) {
          // Caso ambiguo: dibujar dos segmentos (0-1) y (2-3)
          ctx.beginPath();
          ctx.moveTo(x2px(crossings[0][0]), y2px(crossings[0][1]));
          ctx.lineTo(x2px(crossings[1][0]), y2px(crossings[1][1]));
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x2px(crossings[2][0]), y2px(crossings[2][1]));
          ctx.lineTo(x2px(crossings[3][0]), y2px(crossings[3][1]));
          ctx.stroke();
        }
      }
    }
  }

  // Overlay: gradiente como flecha en el punto (opcional)
  if (gradientOverlay && gradientOverlay.point && gradientOverlay.vector) {
    const { x: gx, y: gy } = gradientOverlay.point;
    const { fx: gfx, fy: gfy } = gradientOverlay.vector;
    const scale = (gradientOverlay && typeof gradientOverlay.scale === 'number') ? gradientOverlay.scale : 0.2;
    if (isFinite(gx) && isFinite(gy) && isFinite(gfx) && isFinite(gfy)) {
      const norm = Math.hypot(gfx, gfy) || 1;
      // Longitud de flecha proporcional al tamaño del dominio
      const arrowLen = Math.max(1e-6, scale) * Math.min(xmax - xmin, ymax - ymin);
      const dx = (gfx / norm) * arrowLen;
      const dy = (gfy / norm) * arrowLen;
      const x0 = gx, y0 = gy;
      const x1 = gx + dx, y1 = gy + dy;

      // Cuerpo de la flecha
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = Math.max(1, (lineWidth || 1)) * ratio;
      ctx.beginPath();
      ctx.moveTo(x2px(x0), y2px(y0));
      ctx.lineTo(x2px(x1), y2px(y1));
      ctx.stroke();

      // Cabeza de flecha
      const angle = Math.atan2(y1 - y0, x1 - x0);
      const headLen = 10 * ratio;
      const a1 = angle + Math.PI - Math.PI / 6;
      const a2 = angle + Math.PI + Math.PI / 6;
      const hx1 = x1 + (headLen / ratio) * Math.cos(a1) * (xmax - xmin) / plotW;
      const hy1 = y1 + (headLen / ratio) * Math.sin(a1) * (ymax - ymin) / plotH;
      const hx2 = x1 + (headLen / ratio) * Math.cos(a2) * (xmax - xmin) / plotW;
      const hy2 = y1 + (headLen / ratio) * Math.sin(a2) * (ymax - ymin) / plotH;
      ctx.beginPath();
      ctx.moveTo(x2px(x1), y2px(y1));
      ctx.lineTo(x2px(hx1), y2px(hy1));
      ctx.moveTo(x2px(x1), y2px(y1));
      ctx.lineTo(x2px(hx2), y2px(hy2));
      ctx.stroke();
    }
  }

  // Campo de gradiente (quiver) opcional
  if (gradientField && gradientField.enabled) {
    const qN = gradientField.density || Math.min(12, Math.max(6, Math.round(resolution / 5)));
    const hBase = 1e-3 * Math.max(xmax - xmin, ymax - ymin);
    const h = Math.max(1e-5, hBase);
    const scale = (typeof gradientField.scale === 'number') ? gradientField.scale : 0.15;
    for (let jy = 0; jy < qN; jy++) {
      const y = ymin + (jy + 0.5) * (ymax - ymin) / qN;
      for (let ix = 0; ix < qN; ix++) {
        const x = xmin + (ix + 0.5) * (xmax - xmin) / qN;
        let f0, f_xph, f_xmh, f_yph, f_ymh;
        try { f0 = compiled.evaluate({ x, y }); f_xph = compiled.evaluate({ x: x + h, y }); f_xmh = compiled.evaluate({ x: x - h, y }); f_yph = compiled.evaluate({ x, y: y + h }); f_ymh = compiled.evaluate({ x, y: y - h }); } catch (_) { continue; }
        if (!isFinite(f_xph) || !isFinite(f_xmh) || !isFinite(f_yph) || !isFinite(f_ymh) || !isFinite(f0)) continue;
        const fx = (f_xph - f_xmh) / (2 * h);
        const fy = (f_yph - f_ymh) / (2 * h);
        const norm = Math.hypot(fx, fy);
        if (!(isFinite(norm) && norm > 0)) continue;
        const arrowLen = Math.max(1e-6, scale) * Math.min(xmax - xmin, ymax - ymin);
        const dx = (fx / norm) * arrowLen;
        const dy = (fy / norm) * arrowLen;
        const x0 = x, y0 = y;
        const x1 = x + dx, y1 = y + dy;
        // Cuerpo
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = Math.max(1, (lineWidth || 1)) * ratio;
        ctx.beginPath();
        ctx.moveTo(x2px(x0), y2px(y0));
        ctx.lineTo(x2px(x1), y2px(y1));
        ctx.stroke();
        // Cabeza
        const angle = Math.atan2(y1 - y0, x1 - x0);
        const headLen = 9 * ratio;
        const a1 = angle + Math.PI - Math.PI / 6;
        const a2 = angle + Math.PI + Math.PI / 6;
        const hx1 = x1 + (headLen / ratio) * Math.cos(a1) * (xmax - xmin) / plotW;
        const hy1 = y1 + (headLen / ratio) * Math.sin(a1) * (ymax - ymin) / plotH;
        const hx2 = x1 + (headLen / ratio) * Math.cos(a2) * (xmax - xmin) / plotW;
        const hy2 = y1 + (headLen / ratio) * Math.sin(a2) * (ymax - ymin) / plotH;
        ctx.beginPath();
        ctx.moveTo(x2px(x1), y2px(y1));
        ctx.lineTo(x2px(hx1), y2px(hy1));
        ctx.moveTo(x2px(x1), y2px(y1));
        ctx.lineTo(x2px(hx2), y2px(hy2));
        ctx.stroke();
      }
    }
  }

  // Etiquetas de ejes
  ctx.fillStyle = '#000000';
  ctx.font = `${14 * ratio}px Arial`;
  ctx.fillText('x', pad + plotW - 12 * ratio, y2px(0) - 6 * ratio);
  ctx.fillText('y', x2px(0) + 6 * ratio, pad + 14 * ratio);
}

/* Axes & Grid */
function updateAxesHelpers() {
  if (axesGroup) { scene.remove(axesGroup); axesGroup = null; }
  if (gridHelper) { scene.remove(gridHelper); gridHelper = null; }
  if (plotBoxHelper) { scene.remove(plotBoxHelper); plotBoxHelper = null; }

  const sizeX = currentAxes.xmax - currentAxes.xmin;
  const sizeY = currentAxes.ymax - currentAxes.ymin;
  const sizeZ = currentAxes.zmax - currentAxes.zmin;
  // Evitar tamaños cero que hacen invisibles los helpers cuando el usuario pone ejes iguales
  const size = Math.max(sizeX, sizeY, 1);

  // Plano XY de referencia
  gridHelper = new THREE.GridHelper(size, 20, 0xffffff, 0xffffff);
  gridHelper.rotation.x = Math.PI / 2; // XY
  gridHelper.position.set(
    (currentAxes.xmin + currentAxes.xmax) / 2,
    (currentAxes.ymin + currentAxes.ymax) / 2,
    0
  );
  // Visibilidad según UI
  const showGrid3DFlagEl = document.getElementById('showGrid3D');
  const showAxes3DFlagEl = document.getElementById('showAxes3D');
  const showGrid3DFlag = showGrid3DFlagEl ? !!showGrid3DFlagEl.checked : true;
  const showAxes3DFlag = showAxes3DFlagEl ? !!showAxes3DFlagEl.checked : true;
  gridHelper.visible = showGrid3DFlag;
  scene.add(gridHelper);

  // Caja de marco del dominio
  const box = new THREE.Box3(
    new THREE.Vector3(currentAxes.xmin, currentAxes.ymin, currentAxes.zmin),
    new THREE.Vector3(currentAxes.xmax, currentAxes.ymax, currentAxes.zmax)
  );
  plotBoxHelper = new THREE.Box3Helper(box, 0xffffff);
  scene.add(plotBoxHelper);

  // Ejes con flechas y ticks
  axesGroup = new THREE.Group();
  const origin = new THREE.Vector3(0, 0, 0);
  // Si el origen queda fuera del dominio, lo ajustamos al borde más cercano
  origin.x = Math.min(Math.max(origin.x, currentAxes.xmin), currentAxes.xmax);
  origin.y = Math.min(Math.max(origin.y, currentAxes.ymin), currentAxes.ymax);
  origin.z = Math.min(Math.max(origin.z, currentAxes.zmin), currentAxes.zmax);

  // Arrow helpers
  const arrowLenX = Math.abs(currentAxes.xmax - origin.x);
  const arrowLenY = Math.abs(currentAxes.ymax - origin.y);
  const arrowLenZ = Math.abs(currentAxes.zmax - origin.z);
  const arrowColor = 0xff0000; // rojo para mejor contraste
  const arrowX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), origin, Math.max(0.5, arrowLenX), arrowColor);
  const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, Math.max(0.5, arrowLenY), arrowColor);
  const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, Math.max(0.5, arrowLenZ), arrowColor);
  axesGroup.add(arrowX, arrowY, arrowZ);

  // Tick marks y etiquetas
  const tickMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  function makeTextSprite(message, color = '#ffffff') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = 72;
    canvas.width = 512; canvas.height = 256;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.8, 0.9, 1);
    return sprite;
  }

  function addTicks(axis) {
    const eps = 1e-9;
    let min, max, dir, orthoA, orthoB;
    if (axis === 'x') { min = currentAxes.xmin; max = currentAxes.xmax; dir = new THREE.Vector3(1, 0, 0); orthoA = new THREE.Vector3(0, 1, 0); orthoB = new THREE.Vector3(0, 0, 1); }
    if (axis === 'y') { min = currentAxes.ymin; max = currentAxes.ymax; dir = new THREE.Vector3(0, 1, 0); orthoA = new THREE.Vector3(1, 0, 0); orthoB = new THREE.Vector3(0, 0, 1); }
    if (axis === 'z') { min = currentAxes.zmin; max = currentAxes.zmax; dir = new THREE.Vector3(0, 0, 1); orthoA = new THREE.Vector3(1, 0, 0); orthoB = new THREE.Vector3(0, 1, 0); }

    const span = max - min;
    // step aproximado para <= 9 ticks
    let step = 1;
    if (span > 12) step = 2; if (span > 24) step = 5;
    const start = Math.ceil(min - eps);
    for (let t = start; t <= max + eps; t += step) {
      // Línea de tick corta
      const tickLen = 0.08 * Math.max(sizeX, sizeY, sizeZ);
      const p0 = origin.clone();
      if (axis === 'x') p0.x = t; if (axis === 'y') p0.y = t; if (axis === 'z') p0.z = t;
      const a0 = p0.clone().add(orthoA.clone().multiplyScalar(tickLen));
      const a1 = p0.clone().add(orthoA.clone().multiplyScalar(-tickLen));
      const geom = new THREE.BufferGeometry().setFromPoints([a0, a1]);
      const line = new THREE.Line(geom, tickMaterial);
      axesGroup.add(line);

      // Etiqueta
      const label = makeTextSprite(`${t}`);
      const offset = orthoB.clone().multiplyScalar(tickLen * 4.0);
      label.position.copy(p0.clone().add(offset));
      axesGroup.add(label);
    }
  }
  addTicks('x'); addTicks('y'); addTicks('z');

  // Etiquetas de ejes x, y, z
  const lx = makeTextSprite('x'); lx.position.copy(origin.clone().add(new THREE.Vector3(arrowLenX + 0.5, 0.05, 0)));
  const ly = makeTextSprite('y'); ly.position.copy(origin.clone().add(new THREE.Vector3(0.05, arrowLenY + 0.5, 0)));
  const lz = makeTextSprite('z'); lz.position.copy(origin.clone().add(new THREE.Vector3(0.05, 0, arrowLenZ + 0.5)));
  axesGroup.add(lx, ly, lz);

  // Mostrar/Ocultar ejes según flag
  axesGroup.visible = showAxes3DFlag;
  scene.add(axesGroup);
}

/* Function parsing and surface generation */
function buildSurface({ exprString, resolution, axes, zclipLow, zclipHigh }) {
  // Default function if empty: z = 7*x*y / exp(x^2 + y^2)
  const defaultFn = '7*x*y / exp(x^2 + y^2)';
  const raw = (exprString && exprString.trim().length > 0) ? exprString.trim() : defaultFn;
  let compiled;
  try {
    compiled = math.parse(raw).compile();
  } catch (e) {
    throw new Error('Error al analizar la función. Verifica la sintaxis.');
  }

  const nx = resolution, ny = resolution;
  const xmin = axes.xmin, xmax = axes.xmax;
  const ymin = axes.ymin, ymax = axes.ymax;

  const dx = (xmax - xmin) / (nx - 1);
  const dy = (ymax - ymin) / (ny - 1);

  const positions = new Float32Array(nx * ny * 3);
  const colors = new Float32Array(nx * ny * 3);

  const zValues = new Float32Array(nx * ny);

  let zMin = Number.POSITIVE_INFINITY;
  let zMax = Number.NEGATIVE_INFINITY;

  // Parámetros por defecto para funciones con a, b, c, d, t, v
  const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };

  for (let iy = 0; iy < ny; iy++) {
    const y = ymin + iy * dy;
    for (let ix = 0; ix < nx; ix++) {
      const x = xmin + ix * dx;
      let z;
      try {
        z = compiled.evaluate({ x, y, ...paramDefaults });
        if (!isFinite(z)) z = NaN;
      } catch (_) {
        z = NaN;
      }

      const idx = iy * nx + ix;
      zValues[idx] = z;
      if (isFinite(z)) {
        if (typeof zclipLow === 'number') z = Math.max(zclipLow, z);
        if (typeof zclipHigh === 'number') z = Math.min(zclipHigh, z);
        zMin = Math.min(zMin, z);
        zMax = Math.max(zMax, z);
      }

      positions[3 * idx + 0] = x;
      positions[3 * idx + 1] = y;
      positions[3 * idx + 2] = isFinite(z) ? z : 0;
    }
  }

  // Fallback if all NaN
  if (!isFinite(zMin) || !isFinite(zMax) || zMin === zMax) {
    zMin = axes.zmin;
    zMax = axes.zmax;
  }

  // Color mapping (blue -> cyan -> green -> yellow -> red)
  function colorForZ(z) {
    if (!isFinite(z)) return [0.1, 0.1, 0.1];
    const t = Math.min(1, Math.max(0, (z - zMin) / (zMax - zMin + 1e-9)));
    // 5-color gradient
    const stops = [
      [0.0, [0.1, 0.2, 0.7]],
      [0.25, [0.0, 0.7, 0.9]],
      [0.5, [0.0, 0.8, 0.2]],
      [0.75, [0.9, 0.8, 0.0]],
      [1.0, [0.9, 0.2, 0.1]],
    ];
    let i = 0;
    while (i < stops.length - 1 && t > stops[i + 1][0]) i++;
    const [t0, c0] = stops[i];
    const [t1, c1] = stops[Math.min(i + 1, stops.length - 1)];
    const u = (t - t0) / Math.max(1e-9, (t1 - t0));
    return [
      c0[0] * (1 - u) + c1[0] * u,
      c0[1] * (1 - u) + c1[1] * u,
      c0[2] * (1 - u) + c1[2] * u,
    ];
  }

  for (let i = 0; i < zValues.length; i++) {
    const [r, g, b] = colorForZ(zValues[i]);
    colors[3 * i + 0] = r;
    colors[3 * i + 1] = g;
    colors[3 * i + 2] = b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  // Guardar Z original (sin recorte manual) para poder restaurarlo en tiempo real
  try {
    geometry.userData = geometry.userData || {};
    geometry.userData.zOriginal = zValues.slice();
  } catch (_) {
    // no-op
  }

  // Index buffer for grid triangles, skipping faces with NaN
  const indices = [];
  for (let iy = 0; iy < ny - 1; iy++) {
    for (let ix = 0; ix < nx - 1; ix++) {
      const i0 = iy * nx + ix;
      const i1 = iy * nx + (ix + 1);
      const i2 = (iy + 1) * nx + ix;
      const i3 = (iy + 1) * nx + (ix + 1);

      const z0 = zValues[i0];
      const z1 = zValues[i1];
      const z2 = zValues[i2];
      const z3 = zValues[i3];

      // Only create faces if all vertices are finite
      const okA = isFinite(z0) && isFinite(z1) && isFinite(z2);
      const okB = isFinite(z2) && isFinite(z1) && isFinite(z3);
      if (okA) { indices.push(i0, i1, i2); }
      if (okB) { indices.push(i2, i1, i3); }
    }
  }
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    shininess: 30,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.zRange = { zMin, zMax };

  // Wireframe negro para simular retícula
  const wfGeom = new THREE.WireframeGeometry(geometry);
  const wfMat = new THREE.LineBasicMaterial({ color: 0x000000 });
  const wireframe = new THREE.LineSegments(wfGeom, wfMat);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(wireframe);
  return group;
}

/* Graph management */
let nextGraphId = 1;
function addGraph(mesh, label) {
  const id = `g${nextGraphId++}`;
<<<<<<< HEAD
  try {
    if (!mesh.userData) mesh.userData = {};
    mesh.userData.exprString = label; // almacenar la expresión para reconstruir
=======
  // Guardar la expresión original para poder reconstruir la geometría (p.ej., al cambiar resolución)
  try {
    mesh.userData = mesh.userData || {};
    mesh.userData.exprString = label;
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
  } catch (_) {}
  graphs.set(id, mesh);
  scene.add(mesh);

  const li = document.createElement('li');
  li.id = `li-${id}`;
  const nameSpan = document.createElement('span');
  // Renderizar el label en LaTeX si es posible
  try {
    const node = math.parse(label);
    const tex = node.toTex({ parenthesis: 'auto', implicit: 'hide' });
    nameSpan.innerHTML = `\\( z = ${tex} \\)`;
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([nameSpan]).catch(() => {});
    }
  } catch (_) {
    nameSpan.textContent = label;
  }
  nameSpan.className = 'tag';
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Eliminar';
  removeBtn.addEventListener('click', () => {
    const m = graphs.get(id);
    if (m) scene.remove(m);
    graphs.delete(id);
    li.remove();
  });
  li.appendChild(nameSpan);
  li.appendChild(removeBtn);
  document.getElementById('graphsList').appendChild(li);
}

function clearAllGraphs() {
  for (const [id, m] of graphs.entries()) {
    scene.remove(m);
  }
  graphs.clear();
  document.getElementById('graphsList').innerHTML = '';
}

// Reconstruye todas las superficies existentes con los ejes actuales y la resolución actual
function rebuildAllGraphsForAxes() {
  const axes = getAxesFromUI();
  const { zclipLow, zclipHigh } = getZClip();
  const resEl = document.getElementById('resolution');
  const resolution = resEl ? parseInt(resEl.value, 10) : 60;
  const gsEl = document.getElementById('graphScale3D');
  const scaleVal = gsEl ? parseFloat(gsEl.value) : 1;
  const entries = Array.from(graphs.entries());
  entries.forEach(([id, oldMesh]) => {
    const expr = oldMesh && oldMesh.userData ? oldMesh.userData.exprString : null;
    if (!expr) return;
    try {
      const newMesh = buildSurface({ exprString: expr, resolution, axes, zclipLow, zclipHigh });
      if (newMesh && newMesh.scale) newMesh.scale.set(scaleVal, scaleVal, scaleVal);
      scene.remove(oldMesh);
      graphs.set(id, newMesh);
      scene.add(newMesh);
    } catch (_) {}
  });
}

/* UI wiring */
function getAxesFromUI() {
  const xmin = parseFloat(document.getElementById('xmin').value);
  const xmax = parseFloat(document.getElementById('xmax').value);
  const ymin = parseFloat(document.getElementById('ymin').value);
  const ymax = parseFloat(document.getElementById('ymax').value);
  const zmin = parseFloat(document.getElementById('zmin').value);
  const zmax = parseFloat(document.getElementById('zmax').value);
  return { xmin, xmax, ymin, ymax, zmin, zmax };
}

// Punto de cálculo (x₀,y₀) con fallback al centro de la caja si la entrada está vacía/inválida
function getCalcPointOrCenter() {
  const axes = getAxesFromUI();
  const xRaw = (document.getElementById('calcX0') || { value: '' }).value;
  const yRaw = (document.getElementById('calcY0') || { value: '' }).value;
  let x0 = parseFloat(xRaw);
  let y0 = parseFloat(yRaw);
  if (!isFinite(x0)) x0 = (axes.xmin + axes.xmax) / 2;
  if (!isFinite(y0)) y0 = (axes.ymin + axes.ymax) / 2;
  return { x0, y0 };
}

function getZClip() {
  const lowStr = document.getElementById('zclipLow').value;
  const highStr = document.getElementById('zclipHigh').value;
  const clipToBoxEl = document.getElementById('clipToBox');
  const axes = getAxesFromUI();
  const low = lowStr === '' ? undefined : parseFloat(lowStr);
  const high = highStr === '' ? undefined : parseFloat(highStr);
  if (clipToBoxEl && clipToBoxEl.checked) {
    return { zclipLow: axes.zmin, zclipHigh: axes.zmax };
  }
  return { zclipLow: low, zclipHigh: high };
}

// Ajusta la cámara para encuadrar el cubo definido por los ejes actuales
function fitViewToBox() {
  if (viewMode !== '3D') return;
  const axes = getAxesFromUI();
  const cx = (axes.xmin + axes.xmax) / 2;
  const cy = (axes.ymin + axes.ymax) / 2;
  const cz = (axes.zmin + axes.zmax) / 2;
  const sx = (axes.xmax - axes.xmin);
  const sy = (axes.ymax - axes.ymin);
  const sz = (axes.zmax - axes.zmin);
  let radius = Math.sqrt(sx * sx + sy * sy + sz * sz) / 2;
  // Fallback para casos degenerados (ejes colapsados) que colocan la cámara en el mismo punto que el target
  if (!isFinite(radius) || radius < 1e-3) radius = 1;
  const margin = 1.15; // pequeño margen para que se vea completo
  const fovRad = THREE.MathUtils.degToRad(camera.fov);
  const dist = (margin * radius) / Math.max(1e-6, Math.tan(fovRad / 2));
  const center = new THREE.Vector3(cx, cy, cz);
  const dir = new THREE.Vector3(1, 1, 1).normalize();
  let pos = center.clone().add(dir.multiplyScalar(dist));
  // Si por alguna razón la posición coincide con el target, desplazamos ligeramente para evitar vista en negro
  if (pos.distanceTo(center) < 1e-6) {
    pos = center.clone().add(new THREE.Vector3(1, 1, 1).normalize().multiplyScalar(2));
  }
  camera.position.copy(pos);
  controls.target.copy(center);
  camera.updateProjectionMatrix();
  controls.update();
}

// Aplica/actualiza recorte dinámico a todas las gráficas existentes según el estado de "Recortar a caja 3D"
function applyClipToGraphs() {
  if (viewMode !== '3D') return;
  const clipToBoxEl = document.getElementById('clipToBox');
  const axes = getAxesFromUI();
  const useClip = clipToBoxEl && clipToBoxEl.checked;
  const planes = useClip ? [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), -axes.xmin),
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), axes.xmax),
    new THREE.Plane(new THREE.Vector3(0, 1, 0), -axes.ymin),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), axes.ymax),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), -axes.zmin),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), axes.zmax),
  ] : [];
  graphs.forEach((group) => {
    if (!group) return;
    group.traverse((obj) => {
      if (obj.material) {
        obj.material.clippingPlanes = planes;
        obj.material.needsUpdate = true;
      }
    });
  });
  // Al activar recorte a caja, restaurar Z original y actualizar wireframe
  if (useClip) {
    restoreOriginalZForGraphs();
  }
}

// Restaura Z original de las geometrías para deshacer cualquier z-clip manual previo
function restoreOriginalZForGraphs() {
  graphs.forEach((group) => {
    if (!group) return;
    group.traverse((obj) => {
      if (obj.isMesh && obj.geometry && obj.geometry.getAttribute) {
        const pos = obj.geometry.getAttribute('position');
        if (!pos) return;
        const userData = obj.geometry.userData || {};
        const zOrig = userData.zOriginal;
        if (!zOrig || zOrig.length !== pos.count) return;
        for (let i = 0; i < pos.count; i++) {
          const z = zOrig[i];
          pos.setZ(i, Number.isFinite(z) ? z : 0);
        }
        pos.needsUpdate = true;
        obj.geometry.computeVertexNormals();
        // Actualizar wireframe si existe como LineSegments en el mismo grupo
        if (obj.parent) {
          obj.parent.children.forEach((child) => {
            if (child.isLineSegments) {
              try {
                child.geometry.dispose();
                child.geometry = new THREE.WireframeGeometry(obj.geometry);
              } catch (_) {}
            }
          });
        }
      }
    });
  });
}

// Reconstruye todas las superficies 3D con una nueva resolución, sin que el usuario tenga que recrearlas
function updateResolutionForAllGraphs(newRes) {
  if (viewMode !== '3D') return;
  const axes = getAxesFromUI();
  const { zclipLow, zclipHigh } = getZClip();
  const gsEl = document.getElementById('graphScale3D');
  const s = gsEl ? parseFloat(gsEl.value) : 1;
  const entries = Array.from(graphs.entries());
  entries.forEach(([id, oldGroup]) => {
    const exprInputEl = document.getElementById('fnInput');
    const fallbackExpr = exprInputEl ? exprInputEl.value : '7*x*y / exp(x^2 + y^2)';
    const expr = (oldGroup && oldGroup.userData && oldGroup.userData.exprString) ? oldGroup.userData.exprString : fallbackExpr;
    try {
      const newGroup = buildSurface({ exprString: expr, resolution: newRes, axes, zclipLow, zclipHigh });
      if (newGroup && newGroup.scale) newGroup.scale.set(s, s, s);
      // Preservar transformaciones básicas
      if (oldGroup && newGroup) {
        newGroup.position.copy(oldGroup.position);
        newGroup.rotation.copy(oldGroup.rotation);
      }
      // Mantener metadatos
      try { newGroup.userData = newGroup.userData || {}; newGroup.userData.exprString = expr; } catch (_) {}
      scene.remove(oldGroup);
      scene.add(newGroup);
      graphs.set(id, newGroup);
    } catch (e) {
      console.warn('No se pudo actualizar resolución para gráfica', id, e);
    }
  });
  // Reaplicar recorte si está activo
  applyClipToGraphs();
}

function wireUI() {
  const fnInput = document.getElementById('fnInput');
  const fnSelect = document.getElementById('fnSelect');
  const texDisplay = document.getElementById('texDisplay');
  const calcX0 = document.getElementById('calcX0');
  const calcY0 = document.getElementById('calcY0');
  const calcUseCenter = document.getElementById('calcUseCenter');
  const showGradient2D = document.getElementById('showGradient');
  const showGradientField2D = document.getElementById('showGradientField2D');
  const gradientFieldDensity = document.getElementById('gradientFieldDensity');
  const gradientFieldDensityLabel = document.getElementById('gradientFieldDensityLabel');
  const showGradient3D = document.getElementById('showGradient3D');
  const showGradientField3D = document.getElementById('showGradientField3D');
  const gradientScale = document.getElementById('gradientScale');
  const gradientScaleLabel = document.getElementById('gradientScaleLabel');
  const useSymbolicDerivatives = document.getElementById('useSymbolicDerivatives');
  const derivHScale = document.getElementById('derivHScale');
  const derivHScaleLabel = document.getElementById('derivHScaleLabel');
  const useFixedColor = document.getElementById('useFixedColor');
  const useCustomWidth = document.getElementById('useCustomWidth');
  const calcEnabled = document.getElementById('calcEnabled');
  const calcDomainRange = document.getElementById('calcDomainRange');
  const calcDerivatives = document.getElementById('calcDerivatives');
  const showGrid3D = document.getElementById('showGrid3D');
  const showAxes3D = document.getElementById('showAxes3D');
  const autoUpdateGraphs = document.getElementById('autoUpdateGraphs');
  const resetOptionsBtn = document.getElementById('resetOptionsBtn');
  let lastCalc = null;

  function renderTeXPreview(expr) {
    if (!texDisplay) return;
    try {
      const node = math.parse(expr && expr.trim() ? expr.trim() : '7*x*y / exp(x^2 + y^2)');
      const tex = node.toTex({ parenthesis: 'auto', implicit: 'hide' });
      texDisplay.innerHTML = `\\[ z = ${tex} \\]`;
      if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([texDisplay]).catch(() => {});
      }
    } catch (e) {
      texDisplay.textContent = 'Expresión inválida';
    }
  }

  // Poblar select con presets
  fnSelect.innerHTML = '';
  PRESETS.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = p.expr;
    opt.textContent = p.label;
    if (i === 0) opt.selected = true;
    fnSelect.appendChild(opt);
  });
  // Inicializar el input con la selección
  fnInput.value = fnSelect.value || '7*x*y / exp(x^2 + y^2)';
  renderTeXPreview(fnInput.value);

  // Al cambiar la selección, cargar en el input (editable)
  fnSelect.addEventListener('change', () => {
    fnInput.value = fnSelect.value;
    renderTeXPreview(fnInput.value);
  });

  fnInput.addEventListener('input', () => {
    renderTeXPreview(fnInput.value);
  });

  const res = document.getElementById('resolution');
  const resLabel = document.getElementById('resolutionLabel');
  res.addEventListener('input', () => {
    resLabel.textContent = res.value;
    // Si estamos en 3D, actualizar la resolución de las superficies ya existentes sin necesidad de recrearlas manualmente
    if (viewMode === '3D') {
      const newRes = parseInt(res.value, 10);
      updateResolutionForAllGraphs(newRes);
    }
  });

  const viewSel = document.getElementById('viewMode');
  const contourLevels = document.getElementById('contourLevels');
  const contourLevelsLabel = document.getElementById('contourLevelsLabel');
  const contourWidth = document.getElementById('contourWidth');
  const contourWidthLabel = document.getElementById('contourWidthLabel');
  const contourColor = document.getElementById('contourColor');
  const contourGradient = document.getElementById('contourGradient');
  const zoom3D = document.getElementById('zoom3D');
  const zoom3DLabel = document.getElementById('zoom3DLabel');
  const fitView3DBtn = document.getElementById('fitView3DBtn');
  const graphScale3D = document.getElementById('graphScale3D');
  const graphScale3DLabel = document.getElementById('graphScale3DLabel');
  contourLevels.addEventListener('input', () => { contourLevelsLabel.textContent = contourLevels.value; if (viewMode === '2D') redraw2D(); });
  contourWidth.addEventListener('input', () => { contourWidthLabel.textContent = parseFloat(contourWidth.value).toFixed(1); if (viewMode === '2D') redraw2D(); });
  contourColor.addEventListener('change', () => { if (viewMode === '2D') redraw2D(); });
  contourGradient.addEventListener('change', () => { if (viewMode === '2D') redraw2D(); });

  // Zoom cámara 3D (FOV)
  if (zoom3D) {
    zoom3D.value = String(Math.round(camera.fov));
    if (zoom3DLabel) zoom3DLabel.textContent = `${Math.round(camera.fov)}°`;
    zoom3D.addEventListener('input', () => {
      const fov = parseFloat(zoom3D.value);
      camera.fov = Math.max(10, Math.min(100, fov));
      camera.updateProjectionMatrix();
      if (zoom3DLabel) zoom3DLabel.textContent = `${Math.round(camera.fov)}°`;
    });
  }

  // Ajustar vista al cubo 3D
  if (fitView3DBtn) {
    fitView3DBtn.addEventListener('click', () => {
      fitViewToBox();
    });
  }

  // Escala de gráfica 3D (aplica a todas las superficies actuales y nuevas)
  if (graphScale3D) {
    graphScale3D.value = graphScale3D.value || '1';
    if (graphScale3DLabel) graphScale3DLabel.textContent = `${parseFloat(graphScale3D.value).toFixed(2)}×`;
    graphScale3D.addEventListener('input', () => {
      const s = parseFloat(graphScale3D.value);
      if (graphScale3DLabel) graphScale3DLabel.textContent = `${s.toFixed(2)}×`;
      graphs.forEach((obj) => {
        if (obj && obj.scale) obj.scale.set(s, s, s);
      });
    });
  }

  // Ejecuta cálculos (dominio/rango y derivadas parciales) y actualiza panel
  function parseLocaleNumber(str, fallback) {
    try {
      const s = (str == null ? '' : String(str)).trim().replace(',', '.');
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : fallback;
    } catch (_) { return fallback; }
  }
  // Inferencia simple de restricciones de dominio desde la expresión
  function buildDomainPredicateFromExpr(raw) {
    let description = '';
    let constraints = [];
    try {
      const ast = math.parse(raw);
      function visit(node) {
        if (!node) return;
        // sqrt(arg) => arg >= 0
        if (node.isFunctionNode && (node.name === 'sqrt')) {
          const arg = node.args && node.args[0];
          if (arg) constraints.push({ kind: 'ge', node: arg, value: 0 });
        }
        // log/ln(arg) => arg > 0
        if (node.isFunctionNode && (node.name === 'log' || node.name === 'ln')) {
          const arg = node.args && node.args[0];
          if (arg) constraints.push({ kind: 'gt', node: arg, value: 0 });
        }
        // asin/acos(arg) => arg in [-1,1]
        if (node.isFunctionNode && (node.name === 'asin' || node.name === 'acos')) {
          const arg = node.args && node.args[0];
          if (arg) constraints.push({ kind: 'between', node: arg, min: -1, max: 1 });
        }
        // División: a / b => b != 0
        if (node.isOperatorNode && node.op === '/') {
          const denom = node.args && node.args[1];
          if (denom) constraints.push({ kind: 'neq', node: denom, value: 0 });
        }
        // Recurse
        if (node.args && Array.isArray(node.args)) node.args.forEach(visit);
        if (node.content) visit(node.content);
        if (node.value) visit(node.value);
        if (node.object) visit(node.object);
      }
      visit(ast);
    } catch (_) {}
    // Compilar cada restricción
    const eps = 1e-12;
    const compiled = constraints.map(c => ({
      kind: c.kind,
      fn: (() => { try { return c.node.compile(); } catch (_) { return null; } })(),
      meta: c
    })).filter(c => c.fn);
    // Descripción básica
    description = compiled.map(c => {
      const text = c.meta.node.toString();
      if (c.kind === 'ge') return `${text} \u2265 0`;
      if (c.kind === 'gt') return `${text} > 0`;
      if (c.kind === 'between') return `${text} \u2208 [-1, 1]`;
      if (c.kind === 'neq') return `${text} \u2260 0`;
      return '';
    }).filter(Boolean).join(', ');
    const predicate = (x, y, params = {}) => {
      try {
        for (const c of compiled) {
          const val = c.fn.evaluate({ x, y, ...params });
          if (!isFinite(val)) return false;
          if (c.kind === 'ge' && !(val >= -eps)) return false;
          if (c.kind === 'gt' && !(val > eps)) return false;
          if (c.kind === 'between' && !(val >= -1 - eps && val <= 1 + eps)) return false;
          if (c.kind === 'neq' && !(Math.abs(val) > eps)) return false;
        }
        return true;
      } catch (_) { return false; }
    };
    return { predicate, description };
  }
  function runCalculations() {
    if (calcEnabled && !calcEnabled.checked) {
      if (calcDomainRange) calcDomainRange.innerHTML = '';
      if (calcDerivatives) calcDerivatives.innerHTML = '';
      lastCalc = null;
      return;
    }
    const axes = getAxesFromUI();
    const resolution = parseInt(res.value, 10);
    const raw = getFnExprNormalized();
    let compiled;
    try {
      compiled = math.parse(raw).compile();
    } catch (e) {
      if (calcDomainRange) calcDomainRange.innerHTML = '<strong>Dominio:</strong> Expresión inválida';
      if (calcDerivatives) calcDerivatives.innerHTML = '<strong>Derivadas:</strong> Expresión inválida';
      lastCalc = null;
      return;
    }
    const domainInfo = buildDomainPredicateFromExpr(raw);
    const { xmin, xmax, ymin, ymax } = axes;
    const clip = (typeof getZClip === 'function') ? getZClip() : {};
    const nx = Math.max(20, Math.min(80, resolution));
    const ny = nx;
    const dx = (xmax - xmin) / (nx - 1);
    const dy = (ymax - ymin) / (ny - 1);
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    let valid = 0, total = nx * ny;
    let zMin = Infinity, zMax = -Infinity;
    // Rango válido observado
    let minValidX = Infinity, maxValidX = -Infinity;
    let minValidY = Infinity, maxValidY = -Infinity;
    // Selección automática del punto: argmax |f(x,y)| durante el muestreo
    let bestScore = -Infinity;
    let bestX = (xmin + xmax) / 2;
    let bestY = (ymin + ymax) / 2;
    for (let iy = 0; iy < ny; iy++) {
      const y = ymin + iy * dy;
      for (let ix = 0; ix < nx; ix++) {
        const x = xmin + ix * dx;
        try {
          // Validar con dominio matemático antes de evaluar
          if (!domainInfo.predicate(x, y, paramDefaults)) continue;
          const z = compiled.evaluate({ x, y, ...paramDefaults });
          const withinClipLow = (typeof clip.zclipLow !== 'number') || (z >= clip.zclipLow);
          const withinClipHigh = (typeof clip.zclipHigh !== 'number') || (z <= clip.zclipHigh);
          if (isFinite(z) && withinClipLow && withinClipHigh) {
            valid++;
            zMin = Math.min(zMin, z);
            zMax = Math.max(zMax, z);
            // Acotar región válida
            if (x < minValidX) minValidX = x;
            if (x > maxValidX) maxValidX = x;
            if (y < minValidY) minValidY = y;
            if (y > maxValidY) maxValidY = y;
            const score = Math.abs(z);
            if (score > bestScore) { bestScore = score; bestX = x; bestY = y; }
          }
        } catch (_) { /* punto fuera del dominio */ }
      }
    }
    const validPct = Math.round((valid / total) * 100);
    if (calcDomainRange) {
      const zMinStr = isFinite(zMin) ? Number(zMin.toFixed(4)) : '—';
      const zMaxStr = isFinite(zMax) ? Number(zMax.toFixed(4)) : '—';
<<<<<<< HEAD
      const consDesc = domainInfo.description ? `<div><strong>Restricciones (matemáticas):</strong> ${domainInfo.description}</div>` : '';
      calcDomainRange.innerHTML = `
        <div><strong>Dominio (muestrado):</strong> ${valid} / ${total} puntos válidos (${validPct}%)</div>
        ${consDesc}
=======
      const procDx = isFinite(dx) ? Number(dx.toFixed(4)) : '—';
      const procDy = isFinite(dy) ? Number(dy.toFixed(4)) : '—';
      const domText = `Rectángulo [${Number(xmin)}, ${Number(xmax)}] × [${Number(ymin)}, ${Number(ymax)}]`;
      const resText = `${nx} × ${ny} (total ${total})`;
      calcDomainRange.innerHTML = `
        <div style="margin-bottom:6px"><strong>Procedimiento (muestreo):</strong></div>
        <div>• Dominio: ${domText}</div>
        <div>• Resolución: ${resText}</div>
        <div>• Pasos: Δx = ${procDx}, Δy = ${procDy}</div>
        <div>• Evaluación: f(x,y) en cada punto; se cuentan válidos si es finito</div>
        <hr style="opacity:0.4;margin:8px 0" />
        <div><strong>Dominio (muestreado):</strong> ${valid} / ${total} puntos válidos (${validPct}%)</div>
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
        <div><strong>Rango z aprox:</strong> [${zMinStr}, ${zMaxStr}]</div>
      `;
    }

<<<<<<< HEAD
    // Auto-ajuste del dominio si la región válida es significativamente menor
    // Sólo si hay puntos válidos y el cálculo está habilitado
    if (valid > 0 && calcEnabled && calcEnabled.checked) {
      const widthX = maxValidX - minValidX;
      const widthY = maxValidY - minValidY;
      const fullX = xmax - xmin;
      const fullY = ymax - ymin;
      const shrinkX = isFinite(widthX) && widthX > 0 ? (widthX / fullX) : 1;
      const shrinkY = isFinite(widthY) && widthY > 0 ? (widthY / fullY) : 1;
      const shouldShrink = (shrinkX < 0.6) || (shrinkY < 0.6); // umbral: reducir si <60% del tamaño actual
      if (shouldShrink) {
        const padFrac = 0.1; // 10% de margen alrededor
        const minSpan = 0.5; // tamaño mínimo de dominio por eje
        const cx = (minValidX + maxValidX) / 2;
        const cy = (minValidY + maxValidY) / 2;
        const spanX = Math.max(minSpan, widthX * (1 + padFrac));
        const spanY = Math.max(minSpan, widthY * (1 + padFrac));
        const nxmin = Math.max(xmin, cx - spanX / 2);
        const nxmax = Math.min(xmax, cx + spanX / 2);
        const nymin = Math.max(ymin, cy - spanY / 2);
        const nymax = Math.min(ymax, cy + spanY / 2);
        // Actualizar inputs y estado global
        const xminEl = document.getElementById('xmin');
        const xmaxEl = document.getElementById('xmax');
        const yminEl = document.getElementById('ymin');
        const ymaxEl = document.getElementById('ymax');
        if (xminEl) xminEl.value = String(Number(nxmin.toFixed(4)));
        if (xmaxEl) xmaxEl.value = String(Number(nxmax.toFixed(4)));
        if (yminEl) yminEl.value = String(Number(nymin.toFixed(4)));
        if (ymaxEl) ymaxEl.value = String(Number(nymax.toFixed(4)));
        currentAxes = getAxesFromUI();
        // Refrescar ayudas y vista
        if (viewMode === '3D') { updateAxesHelpers(); fitViewToBox(); applyClipToGraphs(); }
        if (viewMode === '2D') { redraw2D(); }
      }
    }

    // Derivadas parciales en (x0,y0) por diferencias finitas
    const autoEl = document.getElementById('autoPoint');
    const useAuto = autoEl ? !!autoEl.checked : true;
    const x0 = useAuto ? bestX : parseLocaleNumber(calcX0 ? calcX0.value : '0', 0);
    const y0 = useAuto ? bestY : parseLocaleNumber(calcY0 ? calcY0.value : '0', 0);
=======
    // Derivadas parciales en (x₀,y₀) por diferencias finitas (con fallback al centro)
    const { x0, y0 } = getCalcPointOrCenter();
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
    const hBase = 1e-3 * Math.max(xmax - xmin, ymax - ymin);
    const hScaleEl = document.getElementById('derivHScale');
    const hScale = hScaleEl ? parseFloat(hScaleEl.value) : 1;
    const h = Math.max(1e-8, hBase * (isFinite(hScale) ? hScale : 1));
    let f0 = NaN, fx = NaN, fy = NaN;
    function evalSafe(x, y) {
      try {
        if (!domainInfo.predicate(x, y, paramDefaults)) return NaN;
        const z = compiled.evaluate({ x, y, ...paramDefaults });
        return isFinite(z) ? z : NaN;
      } catch (_) { return NaN; }
    }
    f0 = evalSafe(x0, y0);
    // Opción simbólica si está habilitada
    const useSymEl = document.getElementById('useSymbolicDerivatives');
    const useSym = useSymEl ? !!useSymEl.checked : false;
    let usedSymbolic = false;
    if (useSym) {
      try {
        const dxNode = math.derivative(raw, 'x');
        const dyNode = math.derivative(raw, 'y');
        const dxc = dxNode.compile();
        const dyc = dyNode.compile();
        const fxTry = dxc.evaluate({ x: x0, y: y0, ...paramDefaults });
        const fyTry = dyc.evaluate({ x: x0, y: y0, ...paramDefaults });
        if (isFinite(fxTry) && isFinite(fyTry)) { fx = fxTry; fy = fyTry; usedSymbolic = true; }
      } catch (_) { /* fallback numérico */ }
    }
    if (!usedSymbolic) {
      const f_xph = evalSafe(x0 + h, y0);
      const f_xmh = evalSafe(x0 - h, y0);
      const f_yph = evalSafe(x0, y0 + h);
      const f_ymh = evalSafe(x0, y0 - h);
      if (isFinite(f_xph) && isFinite(f_xmh)) fx = (f_xph - f_xmh) / (2 * h);
      else if (isFinite(f_xph) && isFinite(f0)) fx = (f_xph - f0) / h;
      else if (isFinite(f0) && isFinite(f_xmh)) fx = (f0 - f_xmh) / h;
      if (isFinite(f_yph) && isFinite(f_ymh)) fy = (f_yph - f_ymh) / (2 * h);
      else if (isFinite(f_yph) && isFinite(f0)) fy = (f_yph - f0) / h;
      else if (isFinite(f0) && isFinite(f_ymh)) fy = (f0 - f_ymh) / h;
    }
    const gradNorm = Math.hypot(fx, fy);
    if (calcDerivatives) {
      const f0Str = isFinite(f0) ? Number(f0.toFixed(6)) : '—';
      const fxStr = isFinite(fx) ? Number(fx.toFixed(6)) : '—';
      const fyStr = isFinite(fy) ? Number(fy.toFixed(6)) : '—';
      const nStr = isFinite(gradNorm) ? Number(gradNorm.toFixed(6)) : '—';
      const ptStr = `(${Number(x0.toFixed(4))}, ${Number(y0.toFixed(4))})`;
      const modeStr = useAuto ? 'automático' : 'manual';
      calcDerivatives.innerHTML = `
        <div><strong>Punto usado:</strong> ${ptStr} <em>(${modeStr})</em></div>
        <div><strong>f(x₀,y₀):</strong> ${f0Str}</div>
        <div><strong>∂f/∂x (x₀,y₀):</strong> ${fxStr}</div>
        <div><strong>∂f/∂y (x₀,y₀):</strong> ${fyStr}</div>
        <div><strong>|∇f|:</strong> ${nStr}</div>
      `;
    }
    lastCalc = { point: { x: x0, y: y0 }, grad: { fx, fy }, f0 };
  }

  // --------------------- Integrales y Volumen ---------------------
  function compileFnOrFallback(exprStr, fallback) {
    const raw = (exprStr && exprStr.trim().length > 0) ? exprStr.trim() : fallback;
    try { return math.parse(raw).compile(); } catch (_) { return null; }
  }

  function compositeWeights(ix, iy, nx, ny) {
    const wx = (ix === 0 || ix === nx - 1) ? 0.5 : 1.0;
    const wy = (iy === 0 || iy === ny - 1) ? 0.5 : 1.0;
    return wx * wy;
  }

  function computeDoubleIntegral(options) {
    const { fCompiled, axes, nx, ny } = options;
    const xmin = axes.xmin, xmax = axes.xmax;
    const ymin = axes.ymin, ymax = axes.ymax;
    const dx = (xmax - xmin) / (nx - 1);
    const dy = (ymax - ymin) / (ny - 1);
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    let sum = 0, valid = 0;
    for (let iy = 0; iy < ny; iy++) {
      const y = ymin + iy * dy;
      for (let ix = 0; ix < nx; ix++) {
        const x = xmin + ix * dx;
        let z;
        try { z = fCompiled.evaluate({ x, y, ...paramDefaults }); } catch (_) { z = NaN; }
        if (!isFinite(z)) continue;
        sum += z * compositeWeights(ix, iy, nx, ny);
        valid++;
      }
    }
    const area = (xmax - xmin) * (ymax - ymin);
    const norm = (nx - 1) * (ny - 1); // trapezoidal normalization factor
    const integral = (sum / norm) * area;
    return { integral, validPoints: valid, totalPoints: nx * ny };
  }

  function computeCentroid(options) {
    const { rhoCompiled, axes, nx, ny } = options;
    const xmin = axes.xmin, xmax = axes.xmax;
    const ymin = axes.ymin, ymax = axes.ymax;
    const dx = (xmax - xmin) / (nx - 1);
    const dy = (ymax - ymin) / (ny - 1);
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    let M = 0, Mx = 0, My = 0;
    for (let iy = 0; iy < ny; iy++) {
      const y = ymin + iy * dy;
      for (let ix = 0; ix < nx; ix++) {
        const x = xmin + ix * dx;
        let rho;
        try { rho = rhoCompiled.evaluate({ x, y, ...paramDefaults }); } catch (_) { rho = NaN; }
        if (!isFinite(rho)) continue;
        const w = compositeWeights(ix, iy, nx, ny);
        M += rho * w;
        Mx += x * rho * w;
        My += y * rho * w;
      }
    }
    const area = (xmax - xmin) * (ymax - ymin);
    const norm = (nx - 1) * (ny - 1);
    M = (M / norm) * area;
    Mx = (Mx / norm) * area;
    My = (My / norm) * area;
    const xbar = M > 0 ? Mx / M : NaN;
    const ybar = M > 0 ? My / M : NaN;
    return { mass: M, xbar, ybar };
  }

  function computeVolumeUnderSurface(options) {
    const { fCompiled, rhoCompiled = null, useRho = false, z0 = 0, axes, nx, ny } = options;
    const xmin = axes.xmin, xmax = axes.xmax;
    const ymin = axes.ymin, ymax = axes.ymax;
    const dx = (xmax - xmin) / (nx - 1);
    const dy = (ymax - ymin) / (ny - 1);
    const clip = (typeof getZClip === 'function') ? getZClip() : {};
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    let sum = 0;
    for (let iy = 0; iy < ny; iy++) {
      const y = ymin + iy * dy;
      for (let ix = 0; ix < nx; ix++) {
        const x = xmin + ix * dx;
        let z;
        try { z = fCompiled.evaluate({ x, y, ...paramDefaults }); } catch (_) { z = NaN; }
        if (!isFinite(z)) continue;
        const withinClipLow = (typeof clip.zclipLow !== 'number') || (z >= clip.zclipLow);
        const withinClipHigh = (typeof clip.zclipHigh !== 'number') || (z <= clip.zclipHigh);
        if (!(withinClipLow && withinClipHigh)) continue;
        const w = compositeWeights(ix, iy, nx, ny);
        const rhoVal = (useRho && rhoCompiled) ? (() => { try { return rhoCompiled.evaluate({ x, y, ...paramDefaults }); } catch (_) { return NaN; } })() : 1;
        if (useRho && !isFinite(rhoVal)) continue;
        sum += Math.max(0, z - z0) * w * (useRho ? rhoVal : 1);
      }
    }
    const area = (xmax - xmin) * (ymax - ymin);
    const norm = (nx - 1) * (ny - 1);
    const volume = (sum / norm) * area;
    return { volume };
  }

  // --------------------- Lagrange (restricción g=0) ---------------------
  function solveLagrange(rawF, rawG, x0, y0) {
    const f = compileFnOrFallback(rawF, '7*x*y / exp(x^2 + y^2)');
    const g = compileFnOrFallback(rawG, 'x + y - 1');
    if (!f || !g) return { ok: false, message: 'Expresión inválida en f o g.' };
    function evalF(x, y) { try { return f.evaluate({ x, y }); } catch (_) { return NaN; } }
    function evalG(x, y) { try { return g.evaluate({ x, y }); } catch (_) { return NaN; } }
    function gradF(x, y, h) {
      const fx = (evalF(x + h, y) - evalF(x - h, y)) / (2 * h);
      const fy = (evalF(x, y + h) - evalF(x, y - h)) / (2 * h);
      return { fx, fy };
    }
    function gradG(x, y, h) {
      const gx = (evalG(x + h, y) - evalG(x - h, y)) / (2 * h);
      const gy = (evalG(x, y + h) - evalG(x, y - h)) / (2 * h);
      return { gx, gy };
    }
    function residuals(x, y, lambda, h) {
      const { fx, fy } = gradF(x, y, h);
      const { gx, gy } = gradG(x, y, h);
      const r1 = fx - lambda * gx;
      const r2 = fy - lambda * gy;
      const r3 = evalG(x, y);
      return { r1, r2, r3, fx, fy, gx, gy, norm: Math.hypot(r1, r2, r3) };
    }
    function newtonDelta(x, y, lambda, h, info) {
      const eps = h;
      const { fx, fy, gx, gy } = info;
      const { fx: fx_xp, fy: fy_xp } = gradF(x + eps, y, h);
      const { fx: fx_yp, fy: fy_yp } = gradF(x, y + eps, h);
      const { gx: gx_xp, gy: gy_xp } = gradG(x + eps, y, h);
      const { gx: gx_yp, gy: gy_yp } = gradG(x, y + eps, h);
      const dfx_dx = (fx_xp - fx) / eps;
      const dfx_dy = (fx_yp - fx) / eps;
      const dfy_dx = (fy_xp - fy) / eps;
      const dfy_dy = (fy_yp - fy) / eps;
      const dgx_dx = (gx_xp - gx) / eps;
      const dgx_dy = (gx_yp - gx) / eps;
      const dgy_dx = (gy_xp - gy) / eps;
      const dgy_dy = (gy_yp - gy) / eps;
      const J = [
        [dfx_dx - lambda * dgx_dx, dfx_dy - lambda * dgx_dy, -gx],
        [dfy_dx - lambda * dgy_dx, dfy_dy - lambda * dgy_dy, -gy],
        [gx, gy, 0],
      ];
      const b = [-info.r1, -info.r2, -info.r3];
      const delta = solveLinear3x3(J, b);
      return { dx: delta[0], dy: delta[1], dl: delta[2] };
    }
    function solveLinear3x3(A, b) {
      // Gaussian elimination simple
      const M = [A[0].slice(), A[1].slice(), A[2].slice()];
      const v = b.slice();
      for (let i = 0; i < 3; i++) {
        // pivot
        let p = i;
        for (let r = i + 1; r < 3; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
        if (p !== i) { const tmp = M[i]; M[i] = M[p]; M[p] = tmp; const tb = v[i]; v[i] = v[p]; v[p] = tb; }
        const piv = M[i][i];
        if (Math.abs(piv) < 1e-12) return [0, 0, 0];
        for (let j = i; j < 3; j++) M[i][j] /= piv; v[i] /= piv;
        for (let r = 0; r < 3; r++) if (r !== i) {
          const fac = M[r][i];
          for (let j = i; j < 3; j++) M[r][j] -= fac * M[i][j];
          v[r] -= fac * v[i];
        }
      }
      return v;
    }
    let x = x0, y = y0, lambda = 0;
    const h = 1e-3 * Math.max(1, Math.abs(x0) + Math.abs(y0));
    // Proyección al conjunto factible g(x,y)=0 minimizando 0.5*g^2
    for (let k = 0; k < 60; k++) {
      const gcur = evalG(x, y);
      if (!isFinite(gcur)) break;
      if (Math.abs(gcur) < 1e-6) break;
      const { gx, gy } = gradG(x, y, h);
      let alpha = 1.0;
      let accepted = false;
      for (let ls = 0; ls < 8; ls++) {
        const xn = x - alpha * gcur * gx;
        const yn = y - alpha * gcur * gy;
        const gnext = evalG(xn, yn);
        if (isFinite(gnext) && Math.abs(gnext) < Math.abs(gcur)) { x = xn; y = yn; accepted = true; break; }
        alpha *= 0.5;
      }
      if (!accepted) break;
    }
    // Newton KKT con amortiguación
    for (let iter = 0; iter < 25; iter++) {
      const info = residuals(x, y, lambda, h);
      const oldNorm = info.norm;
      if (!isFinite(oldNorm)) break;
      if (oldNorm < 1e-8) break;
      const step = newtonDelta(x, y, lambda, h, info);
      let alpha = 1.0;
      let accepted = false;
      for (let ls = 0; ls < 8; ls++) {
        const xn = x + alpha * step.dx;
        const yn = y + alpha * step.dy;
        const ln = lambda + alpha * step.dl;
        const next = residuals(xn, yn, ln, h);
        if (isFinite(next.norm) && next.norm < oldNorm * 0.9) { x = xn; y = yn; lambda = ln; accepted = true; break; }
        alpha *= 0.5;
      }
      if (!accepted) break;
      if (Math.hypot(step.dx, step.dy) < 1e-8) break;
    }
    const fval = evalF(x, y);
    const gval = evalG(x, y);
    const ok = isFinite(fval) && isFinite(gval) && Math.abs(gval) < 1e-5;
    return { ok, x, y, lambda, fval, gval };
  }
  function setView(mode) {
    viewMode = mode;
    const cont = document.getElementById('contourContainer');
    const canv3d = document.getElementById('canvasContainer');
    const save2D = document.getElementById('save2DBtn');
    if (mode === '2D') { cont.style.display = 'block'; canv3d.style.display = 'none'; contourWidthLabel.textContent = parseFloat(contourWidth.value).toFixed(1); runCalculations(); redraw2D(); }
    else { cont.style.display = 'none'; canv3d.style.display = 'block'; }
    if (save2D) save2D.style.display = mode === '2D' ? 'inline-block' : 'none';
    if (mode === '3D') { updateGradientArrow3D(); }
  }
  function redraw2D() {
    const axes = getAxesFromUI();
    const resolution = parseInt(res.value, 10);
    let overlay = null;
    if (calcEnabled && calcEnabled.checked && showGradient2D && showGradient2D.checked && lastCalc && lastCalc.grad && isFinite(lastCalc.grad.fx) && isFinite(lastCalc.grad.fy)) {
      const scaleVal = parseFloat(gradientScale ? gradientScale.value : '0.2');
      overlay = { point: lastCalc.point, vector: lastCalc.grad, scale: scaleVal };
    }
    let fieldCfg = null;
    if (showGradientField2D && showGradientField2D.checked) {
      const densityVal = parseInt(gradientFieldDensity ? gradientFieldDensity.value : '10', 10);
      const scaleVal = parseFloat(gradientScale ? gradientScale.value : '0.2');
      fieldCfg = { density: densityVal, scale: scaleVal };
    }
    const lwEff = (useCustomWidth && useCustomWidth.checked) ? parseFloat(contourWidth.value) : 1;
    const colorEff = (useFixedColor && useFixedColor.checked) ? contourColor.value : 'gray';
<<<<<<< HEAD
    drawContours2D({ exprString: fnInput.value, axes, resolution, levelsCount: parseInt(contourLevels.value, 10), lineWidth: lwEff, colorMode: colorEff, gradient: contourGradient.checked, gradientOverlay: overlay, gradientField: fieldCfg });
=======
    drawContours2D({ exprString: getFnExprNormalized(), axes, resolution, levelsCount: parseInt(contourLevels.value, 10), lineWidth: lwEff, colorMode: colorEff, gradient: contourGradient.checked, gradientOverlay: overlay });
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
  }
  viewSel.addEventListener('change', () => setView(viewSel.value));

  document.getElementById('addGraphBtn').addEventListener('click', () => {
    const axes = getAxesFromUI();
    currentAxes = axes;
    const resolution = parseInt(res.value, 10);
    if (viewMode === '2D') {
      redraw2D();
    } else {
      const { zclipLow, zclipHigh } = getZClip();
      try {
        const mesh = buildSurface({ exprString: getFnExprNormalized(), resolution, axes, zclipLow, zclipHigh });
        const gsEl = document.getElementById('graphScale3D');
        const s = gsEl ? parseFloat(gsEl.value) : 1;
        if (mesh && mesh.scale) mesh.scale.set(s, s, s);
        addGraph(mesh, fnInput.value.trim() || 'Función por defecto');
      } catch (e) {
        alert(e.message);
      }
    }
  });

  // Guardar imagen 2D
  const saveBtn = document.getElementById('save2DBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (viewMode !== '2D') return;
      const canvas = document.getElementById('contourCanvas');
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contour.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  document.getElementById('applyAxesBtn').addEventListener('click', () => {
    currentAxes = getAxesFromUI();
    updateAxesHelpers();
    if (viewMode === '2D') { runCalculations(); redraw2D(); }
    if (viewMode === '3D') {
      runCalculations();
      updateGradientArrow3D();
      fitViewToBox();
      applyClipToGraphs();
      if (autoUpdateGraphs && autoUpdateGraphs.checked) {
        try {
          rebuildAllGraphsForAxes();
        } catch (_) {}
      }
    }
  });

  document.getElementById('clearAllBtn').addEventListener('click', () => {
    clearAllGraphs();
  });

  // Eventos del panel Cálculos
<<<<<<< HEAD
  if (calcX0) {
    calcX0.addEventListener('input', () => { const autoEl = document.getElementById('autoPoint'); if (autoEl && autoEl.checked) return; runCalculations(); if (viewMode === '2D') redraw2D(); });
    calcX0.addEventListener('change', () => { const autoEl = document.getElementById('autoPoint'); if (autoEl && autoEl.checked) return; runCalculations(); if (viewMode === '2D') redraw2D(); });
  }
  if (calcY0) {
    calcY0.addEventListener('input', () => { const autoEl = document.getElementById('autoPoint'); if (autoEl && autoEl.checked) return; runCalculations(); if (viewMode === '2D') redraw2D(); });
    calcY0.addEventListener('change', () => { const autoEl = document.getElementById('autoPoint'); if (autoEl && autoEl.checked) return; runCalculations(); if (viewMode === '2D') redraw2D(); });
  }
=======
  if (calcX0) calcX0.addEventListener('input', () => { runCalculations(); if (viewMode === '2D') redraw2D(); });
  if (calcY0) calcY0.addEventListener('input', () => { runCalculations(); if (viewMode === '2D') redraw2D(); });
  // Botón para usar el centro de la caja
  if (calcUseCenter) calcUseCenter.addEventListener('click', () => {
    const axes = getAxesFromUI();
    const cx = (axes.xmin + axes.xmax) / 2;
    const cy = (axes.ymin + axes.ymax) / 2;
    if (calcX0) calcX0.value = String(Number(cx.toFixed(6)));
    if (calcY0) calcY0.value = String(Number(cy.toFixed(6)));
    runCalculations();
    if (viewMode === '2D') redraw2D(); else updateGradientArrow3D();
  });
  // Validación ligera: si queda vacío/inválido al perder foco, usar centro
  const ensureValidCalcPoint = (el) => {
    if (!el) return;
    el.addEventListener('blur', () => {
      const { x0, y0 } = getCalcPointOrCenter();
      if (el === calcX0 && !isFinite(parseFloat(calcX0.value))) calcX0.value = String(Number(x0.toFixed(6)));
      if (el === calcY0 && !isFinite(parseFloat(calcY0.value))) calcY0.value = String(Number(y0.toFixed(6)));
      runCalculations();
      if (viewMode === '2D') redraw2D(); else updateGradientArrow3D();
    });
  };
  ensureValidCalcPoint(calcX0);
  ensureValidCalcPoint(calcY0);
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
  if (showGradient2D) showGradient2D.addEventListener('change', () => { if (viewMode === '2D') redraw2D(); });
  if (showGradientField2D) showGradientField2D.addEventListener('change', () => { if (viewMode === '2D') redraw2D(); });
  if (gradientFieldDensity && gradientFieldDensityLabel) {
    gradientFieldDensityLabel.textContent = `${parseInt(gradientFieldDensity.value, 10)}`;
    gradientFieldDensity.addEventListener('input', () => { gradientFieldDensityLabel.textContent = `${parseInt(gradientFieldDensity.value, 10)}`; if (viewMode === '2D') redraw2D(); });
  }
  if (showGradient3D) showGradient3D.addEventListener('change', () => { updateGradientArrow3D(); });
  if (gradientScale) gradientScale.addEventListener('input', () => { if (gradientScaleLabel) gradientScaleLabel.textContent = parseFloat(gradientScale.value).toFixed(2); if (viewMode === '2D') redraw2D(); else { updateGradientArrow3D(); updateGradientField3D(); } });
  if (showGradientField3D) showGradientField3D.addEventListener('change', () => { updateGradientField3D(); });
  if (gradientFieldDensity && gradientFieldDensityLabel) {
    // ya se actualiza 2D; añadimos actualización en 3D
    gradientFieldDensity.addEventListener('input', () => { if (viewMode === '3D') updateGradientField3D(); });
  }

  // Ajuste automático de vista al cambiar límites de ejes
  const axisIds = ['xmin','xmax','ymin','ymax','zmin','zmax'];
  axisIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        if (viewMode === '3D') { updateAxesHelpers(); fitViewToBox(); applyClipToGraphs(); updateGradientArrow3D(); updateGradientField3D(); }
        if (viewMode === '2D') { runCalculations(); redraw2D(); }
      });
    }
  });
  if (useFixedColor) useFixedColor.addEventListener('change', () => { if (viewMode === '2D') redraw2D(); });
  if (useCustomWidth) useCustomWidth.addEventListener('change', () => { if (viewMode === '2D') redraw2D(); });
  if (calcEnabled) calcEnabled.addEventListener('change', () => { runCalculations(); if (viewMode === '2D') redraw2D(); else { updateGradientArrow3D(); updateGradientField3D(); } });
  if (useSymbolicDerivatives) useSymbolicDerivatives.addEventListener('change', () => { runCalculations(); if (viewMode === '2D') redraw2D(); else updateGradientArrow3D(); });
  if (derivHScale && derivHScaleLabel) {
    derivHScaleLabel.textContent = `${parseFloat(derivHScale.value).toFixed(2)}×`;
    derivHScale.addEventListener('input', () => { derivHScaleLabel.textContent = `${parseFloat(derivHScale.value).toFixed(2)}×`; runCalculations(); if (viewMode === '2D') redraw2D(); else updateGradientArrow3D(); });
  }
  if (showGrid3D) showGrid3D.addEventListener('change', () => { updateAxesHelpers(); });
  if (showAxes3D) showAxes3D.addEventListener('change', () => { updateAxesHelpers(); });
  const clipToBoxEl = document.getElementById('clipToBox');
  if (clipToBoxEl) clipToBoxEl.addEventListener('change', () => { applyClipToGraphs(); });
  // Integrales UI
  const integralRes = document.getElementById('integralRes');
  const integralResLabel = document.getElementById('integralResLabel');
  const rhoInput = document.getElementById('rhoInput');
  const volumeZ0Input = document.getElementById('volumeZ0Input');
  const volumeUseRho = document.getElementById('volumeUseRho');
  const calcIntegrals = document.getElementById('calcIntegrals');
  const computeDoubleIntegralBtn = document.getElementById('computeDoubleIntegralBtn');
  const computeCentroidBtn = document.getElementById('computeCentroidBtn');
  const computeVolumeBtn = document.getElementById('computeVolumeBtn');
  // Límites UI
  const limitType = document.getElementById('limitType');
  const limitSide = document.getElementById('limitSide');
  const limitXTarget = document.getElementById('limitXTarget');
  const limitYTarget = document.getElementById('limitYTarget');
  const computeLimitsBtn = document.getElementById('computeLimitsBtn');
  const calcLimits = document.getElementById('calcLimits');
  if (integralRes && integralResLabel) integralRes.addEventListener('input', () => { integralResLabel.textContent = integralRes.value; });
  function renderIntegralsHtml(html) { if (calcIntegrals) calcIntegrals.innerHTML = html; }
  function getIntegralResolution() { return parseInt(integralRes ? integralRes.value : '60', 10); }
  if (computeDoubleIntegralBtn) computeDoubleIntegralBtn.addEventListener('click', () => {
    const f = compileFnOrFallback(getFnExprNormalized(), '7*x*y / exp(x^2 + y^2)');
    if (!f) return renderIntegralsHtml('<strong>∬ f dA:</strong> Expresión inválida');
    const axes = getAxesFromUI();
    const n = getIntegralResolution();
    const resI = computeDoubleIntegral({ fCompiled: f, axes, nx: n, ny: n });
    renderIntegralsHtml(`<div><strong>∬ f dA (rectángulo actual):</strong> ${Number(resI.integral.toFixed(6))}</div><div>Puntos válidos: ${resI.validPoints} / ${resI.totalPoints}</div>`);
  });
  if (computeCentroidBtn) computeCentroidBtn.addEventListener('click', () => {
    const rhoStr = rhoInput ? rhoInput.value : '';
    const rhoNorm = normalizeExprRightSide(rhoStr);
    const rho = compileFnOrFallback(rhoNorm, '1');
    if (!rho) return renderIntegralsHtml('<strong>Centro de masa:</strong> ρ inválida');
    const axes = getAxesFromUI();
    const n = getIntegralResolution();
    const resC = computeCentroid({ rhoCompiled: rho, axes, nx: n, ny: n });
    renderIntegralsHtml(`<div><strong>Masa (∬ ρ dA):</strong> ${Number(resC.mass.toFixed(6))}</div><div><strong>x̄:</strong> ${isFinite(resC.xbar) ? Number(resC.xbar.toFixed(6)) : '—'}</div><div><strong>ȳ:</strong> ${isFinite(resC.ybar) ? Number(resC.ybar.toFixed(6)) : '—'}</div>`);
  });
  if (computeVolumeBtn) computeVolumeBtn.addEventListener('click', () => {
    const f = compileFnOrFallback(getFnExprNormalized(), '7*x*y / exp(x^2 + y^2)');
    if (!f) return renderIntegralsHtml('<strong>Volumen:</strong> Expresión inválida');
    const axes = getAxesFromUI();
    const n = getIntegralResolution();
    // Leer plano z0 y si se usa ρ como peso
    let z0 = 0;
    if (volumeZ0Input && isFinite(parseFloat(volumeZ0Input.value))) {
      z0 = parseFloat(volumeZ0Input.value);
    }
    const useRho = !!(volumeUseRho && volumeUseRho.checked);
    let rho = null;
    if (useRho) {
      const rhoStr = rhoInput ? rhoInput.value : '';
      const rhoNorm = normalizeExprRightSide(rhoStr);
      rho = compileFnOrFallback(rhoNorm, '1');
      if (!rho) return renderIntegralsHtml('<strong>Volumen:</strong> ρ inválida');
    }
    const resV = computeVolumeUnderSurface({ fCompiled: f, rhoCompiled: rho, useRho, z0, axes, nx: n, ny: n });
    const suffix = useRho ? ' (ponderado por ρ)' : '';
    renderIntegralsHtml(`<div><strong>Volumen bajo z=f(x,y) respecto a z=${z0}:</strong> ${Number(resV.volume.toFixed(6))}${suffix}</div>`);
  });

  // --------- Límites ----------
  function renderLimitsHtml(html) { if (calcLimits) calcLimits.innerHTML = html; }
  function computeLimitOneVar({ fCompiled, variable = 'x', target, otherFixed, axes, side = 'both' }) {
    const span = (variable === 'x') ? (axes.xmax - axes.xmin) : (axes.ymax - axes.ymin);
    const h0 = Math.max(1e-6, span * 1e-3);
    const distances = [1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625].map((m) => m * h0);
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    const evalAt = (x, y) => { try { const z = fCompiled.evaluate({ x, y, ...paramDefaults }); return isFinite(z) ? z : NaN; } catch (_) { return NaN; } };
    const y0 = (variable === 'x') ? otherFixed : target;
    const x0 = (variable === 'x') ? target : otherFixed;
    const leftVals = [], rightVals = [];
    for (const d of distances) {
      if (side === 'both' || side === 'left') {
        const x = (variable === 'x') ? (target - d) : x0;
        const y = (variable === 'y') ? (target - d) : y0;
        const v = evalAt(x, y);
        if (isFinite(v)) leftVals.push(v);
      }
      if (side === 'both' || side === 'right') {
        const x = (variable === 'x') ? (target + d) : x0;
        const y = (variable === 'y') ? (target + d) : y0;
        const v = evalAt(x, y);
        if (isFinite(v)) rightVals.push(v);
      }
    }
    const tailStats = (arr) => {
      const k = Math.min(4, arr.length);
      if (k === 0) return { ok: false, value: NaN, dev: Infinity, count: 0 };
      const tail = arr.slice(-k);
      const avg = tail.reduce((s, v) => s + v, 0) / k;
      const dev = Math.max(...tail.map((v) => Math.abs(v - avg)));
      const tol = 1e-3 + 1e-6 * Math.abs(avg);
      return { ok: dev <= tol, value: avg, dev, count: k };
    };
    const L = tailStats(leftVals);
    const R = tailStats(rightVals);
    let exists = false, value = NaN;
    if (side === 'left') { exists = L.ok; value = L.value; }
    else if (side === 'right') { exists = R.ok; value = R.value; }
    else { // both
      if (L.ok && R.ok && isFinite(L.value) && isFinite(R.value) && Math.abs(L.value - R.value) <= (1e-3 + 1e-6 * Math.max(Math.abs(L.value), Math.abs(R.value)))) {
        exists = true; value = (L.value + R.value) / 2;
      }
    }
    return { exists, value, left: L, right: R };
  }

  function computeLimit2D({ fCompiled, x0, y0, axes }) {
    const span = Math.max(axes.xmax - axes.xmin, axes.ymax - axes.ymin);
    const h0 = Math.max(1e-6, span * 1e-3);
    const distances = [1, 0.5, 0.25, 0.125, 0.0625, 0.03125].map((m) => m * h0);
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    const evalAt = (x, y) => { try { const z = fCompiled.evaluate({ x, y, ...paramDefaults }); return isFinite(z) ? z : NaN; } catch (_) { return NaN; } };
    const paths = [
      { name: 'x→x₀, y=ȳ', xy: (t) => [x0 + t, y0] },
      { name: 'y→ȳ, x=x₀', xy: (t) => [x0, y0 + t] },
      { name: 'diagonal +', xy: (t) => [x0 + t, y0 + t] },
      { name: 'diagonal −', xy: (t) => [x0 + t, y0 - t] },
      { name: 'pendiente 2', xy: (t) => [x0 + t, y0 + 2 * t] },
      { name: 'pendiente −2', xy: (t) => [x0 + t, y0 - 2 * t] },
      { name: 'parábola +', xy: (t) => [x0 + t, y0 + t * t] },
      { name: 'parábola −', xy: (t) => [x0 + t, y0 - t * t] },
    ];
    const results = [];
    for (const p of paths) {
      const vals = [];
      for (const d of distances) {
        for (const s of [-1, 1]) {
          const [x, y] = p.xy(s * d);
          const v = evalAt(x, y);
          if (isFinite(v)) vals.push(v);
        }
      }
      const k = Math.min(4, vals.length);
      if (k === 0) { results.push({ name: p.name, ok: false, value: NaN }); continue; }
      const tail = vals.slice(-k);
      const avg = tail.reduce((s, v) => s + v, 0) / k;
      const dev = Math.max(...tail.map((v) => Math.abs(v - avg)));
      const tol = 1e-3 + 1e-6 * Math.abs(avg);
      results.push({ name: p.name, ok: dev <= tol, value: avg });
    }
    const okVals = results.filter((r) => r.ok && isFinite(r.value)).map((r) => r.value);
    let exists = false, value = NaN;
    if (okVals.length >= 2) {
      const vmin = Math.min(...okVals), vmax = Math.max(...okVals);
      if (Math.abs(vmax - vmin) <= (1e-3 + 1e-6 * Math.max(Math.abs(vmax), Math.abs(vmin)))) {
        exists = true; value = okVals.reduce((s, v) => s + v, 0) / okVals.length;
      }
    }
    return { exists, value, paths: results };
  }

  if (computeLimitsBtn) computeLimitsBtn.addEventListener('click', () => {
    const f = compileFnOrFallback(getFnExprNormalized(), '7*x*y / exp(x^2 + y^2)');
    if (!f) return renderLimitsHtml('<strong>Límites:</strong> Expresión inválida');
    const axes = getAxesFromUI();
    const x0y0 = getCalcPointOrCenter();
    const type = limitType ? limitType.value : 'x';
    const side = limitSide ? limitSide.value : 'both';
    let a = isFinite(parseFloat(limitXTarget?.value)) ? parseFloat(limitXTarget.value) : x0y0.x0;
    let b = isFinite(parseFloat(limitYTarget?.value)) ? parseFloat(limitYTarget.value) : x0y0.y0;
    let html = '';
    if (type === 'x') {
      const res = computeLimitOneVar({ fCompiled: f, variable: 'x', target: a, otherFixed: x0y0.y0, axes, side });
      const head = `lim x→a (y=ȳ) con a=${Number(a)}, ȳ=${Number(x0y0.y0)} (${side})`;
      const valStr = res.exists && isFinite(res.value) ? Number(res.value.toFixed(6)) : '—';
      html = `<div><strong>${head}:</strong> ${res.exists ? valStr : 'no existe (izq/dcha no coinciden o inestable)'}</div>`;
      html += `<div>izquierda: ${res.left.count} muestras; derecha: ${res.right.count} muestras</div>`;
    } else if (type === 'y') {
      const res = computeLimitOneVar({ fCompiled: f, variable: 'y', target: b, otherFixed: x0y0.x0, axes, side });
      const head = `lim y→b (x=x̄) con b=${Number(b)}, x̄=${Number(x0y0.x0)} (${side})`;
      const valStr = res.exists && isFinite(res.value) ? Number(res.value.toFixed(6)) : '—';
      html = `<div><strong>${head}:</strong> ${res.exists ? valStr : 'no existe (izq/dcha no coinciden o inestable)'}</div>`;
      html += `<div>izquierda: ${res.left.count} muestras; derecha: ${res.right.count} muestras</div>`;
    } else { // xy
      const res = computeLimit2D({ fCompiled: f, x0: x0y0.x0, y0: x0y0.y0, axes });
      const head = `lim (x,y)→(x₀,y₀) con (x₀,y₀)=(${Number(x0y0.x0)}, ${Number(x0y0.y0)})`;
      const valStr = res.exists && isFinite(res.value) ? Number(res.value.toFixed(6)) : '—';
      html = `<div><strong>${head}:</strong> ${res.exists ? valStr : 'no existe (dependencia de trayectoria)'}</div>`;
      html += '<div style="margin-top:6px">Rutas muestreadas:</div>';
      html += '<ul style="margin:6px 0 0 18px">' + res.paths.map((p) => `<li>${p.name}: ${p.ok && isFinite(p.value) ? Number(p.value.toFixed(6)) : '—'}</li>`).join('') + '</ul>';
    }
    renderLimitsHtml(html);
  });

  // Optimización (Lagrange) UI
  const constraintInput = document.getElementById('constraintInput');
  const optimX0 = document.getElementById('optimX0');
  const optimY0 = document.getElementById('optimY0');
  const solveLagrangeBtn = document.getElementById('solveLagrangeBtn');
  const calcOptimization = document.getElementById('calcOptimization');
  function renderOptimHtml(html) { if (calcOptimization) calcOptimization.innerHTML = html; }
  // Normalizadores de entrada: aceptan igualdades y expresiones con "f(x,y)="
  function normalizeConstraintInput(s) {
    if (!s) return s;
    const str = s.trim();
    if (str.includes('=')) {
      const parts = str.split('=');
      const left = parts[0] ? parts[0].trim() : '';
      const right = parts.slice(1).join('=').trim();
      return `(${left}) - (${right})`;
    }
    return str;
  }
  function normalizeExprRightSide(s) {
    if (!s) return s;
    const str = s.trim();
    const idx = str.indexOf('=');
    if (idx !== -1) return str.slice(idx + 1).trim();
    return str;
  }
  // Obtiene la expresión de f(x,y) normalizada, aceptando entradas del tipo "f(x,y) = ..."
  function getFnExprNormalized() {
    const raw = (fnInput && fnInput.value) ? fnInput.value.trim() : '';
    const right = normalizeExprRightSide(raw);
    return (right && right.length > 0) ? right : '7*x*y / exp(x^2 + y^2)';
  }
  if (solveLagrangeBtn) solveLagrangeBtn.addEventListener('click', () => {
    const rawF = fnInput.value;
    const rawG = constraintInput ? constraintInput.value : '';
    let x0 = parseFloat(optimX0 ? optimX0.value : '0');
    let y0 = parseFloat(optimY0 ? optimY0.value : '0');
    const axes = getAxesFromUI();
    if (!isFinite(x0)) x0 = (axes.xmin + axes.xmax) / 2;
    if (!isFinite(y0)) y0 = (axes.ymin + axes.ymax) / 2;
    const rawFNorm = normalizeExprRightSide(rawF);
    const rawGNorm = normalizeConstraintInput(rawG);
    const res = solveLagrange(rawFNorm, rawGNorm, x0, y0);
    if (!res.ok) return renderOptimHtml(`<strong>Lagrange:</strong> ${res.message || 'Expresión inválida o no convergió'}`);
    const proc = `
      <div style="margin-bottom:6px"><strong>Procedimiento (Lagrange):</strong></div>
      <div>• f(x,y) = ${rawFNorm && rawFNorm.trim().length ? rawFNorm.trim() : '7*x*y / exp(x^2 + y^2)'}</div>
      <div>• g(x,y) = ${rawGNorm && rawGNorm.trim().length ? rawGNorm.trim() : 'x + y - 1'}</div>
      <div>• Condiciones: ∇f(x,y) = λ ∇g(x,y), g(x,y) = 0</div>
      <div>• Método: Newton sobre sistema 3×3 con Jacobiano por diferencias finitas centrales</div>
      <div>• Inicial: (x₀,y₀) = (${Number(x0)}, ${Number(y0)}); iteraciones máx = 25; tolerancia ≈ 1e-8</div>
      <hr style="opacity:0.4;margin:8px 0" />
    `;
    const sol = `<div><strong>Solución:</strong> (x*, y*) = (${Number(res.x.toFixed(6))}, ${Number(res.y.toFixed(6))})</div><div><strong>λ*:</strong> ${Number(res.lambda.toFixed(6))}</div><div><strong>f(x*,y*):</strong> ${Number(res.fval.toFixed(6))}</div><div><strong>g(x*,y*):</strong> ${Number(res.gval.toFixed(6))}</div>`;
    renderOptimHtml(proc + sol);
    // Llevar el punto activo (x₀,y₀) a la solución y refrescar cálculos/visualización
    if (optimX0) optimX0.value = String(Number(res.x.toFixed(6)));
    if (optimY0) optimY0.value = String(Number(res.y.toFixed(6)));
    const calcX0El = document.getElementById('calcX0');
    const calcY0El = document.getElementById('calcY0');
    if (calcX0El) calcX0El.value = String(Number(res.x.toFixed(6)));
    if (calcY0El) calcY0El.value = String(Number(res.y.toFixed(6)));
    runCalculations();
    if (viewMode === '2D') redraw2D(); else updateGradientArrow3D();
  });
  fnInput.addEventListener('input', () => { runCalculations(); if (viewMode === '2D') redraw2D(); else updateGradientArrow3D(); });
  res.addEventListener('change', () => { runCalculations(); if (viewMode === '2D') redraw2D(); else updateGradientArrow3D(); });
  // Primera ejecución para rellenar el panel
  runCalculations();

  // Botón para restablecer opciones
  if (resetOptionsBtn) {
    resetOptionsBtn.addEventListener('click', () => {
      // Vista
      const viewSelEl = document.getElementById('viewMode');
      if (viewSelEl) { viewSelEl.value = '3D'; setView('3D'); }
      // 2D controles
      const contourLevels = document.getElementById('contourLevels');
      const contourLevelsLabel = document.getElementById('contourLevelsLabel');
      const contourWidth = document.getElementById('contourWidth');
      const contourWidthLabel = document.getElementById('contourWidthLabel');
      const contourColor = document.getElementById('contourColor');
      const contourGradient = document.getElementById('contourGradient');
      if (contourLevels && contourLevelsLabel) { contourLevels.value = '12'; contourLevelsLabel.textContent = '12'; }
      if (contourWidth && contourWidthLabel) { contourWidth.value = '1'; contourWidthLabel.textContent = '1.0'; }
      if (contourColor) contourColor.value = 'red';
      if (contourGradient) contourGradient.checked = false;
      if (useFixedColor) useFixedColor.checked = true;
      if (useCustomWidth) useCustomWidth.checked = true;
      // Cálculos y gradiente
      if (calcEnabled) calcEnabled.checked = true;
      if (showGradient2D) showGradient2D.checked = false;
      if (showGradientField2D) showGradientField2D.checked = false;
      if (gradientFieldDensity && gradientFieldDensityLabel) { gradientFieldDensity.value = '10'; gradientFieldDensityLabel.textContent = '10'; }
      if (showGradient3D) showGradient3D.checked = false;
      if (gradientScale && gradientScaleLabel) { gradientScale.value = '0.2'; gradientScaleLabel.textContent = '0.20'; }
      // Resolución
      if (res && resLabel) { res.value = '60'; resLabel.textContent = '60'; }
      // Ejes
      const xminEl = document.getElementById('xmin');
      const xmaxEl = document.getElementById('xmax');
      const yminEl = document.getElementById('ymin');
      const ymaxEl = document.getElementById('ymax');
      const zminEl = document.getElementById('zmin');
      const zmaxEl = document.getElementById('zmax');
      const zclipLowEl = document.getElementById('zclipLow');
      const zclipHighEl = document.getElementById('zclipHigh');
      if (xminEl) xminEl.value = '-3';
      if (xmaxEl) xmaxEl.value = '3';
      if (yminEl) yminEl.value = '-3';
      if (ymaxEl) ymaxEl.value = '3';
      if (zminEl) zminEl.value = '-2';
      if (zmaxEl) zmaxEl.value = '2';
      if (zclipLowEl) zclipLowEl.value = '';
      if (zclipHighEl) zclipHighEl.value = '';
      if (showGrid3D) showGrid3D.checked = true;
      if (showAxes3D) showAxes3D.checked = true;

      currentAxes = getAxesFromUI();
      updateAxesHelpers();
      runCalculations();
      updateGradientArrow3D();
      updateGradientField3D();
      if (viewMode === '2D') redraw2D();
    });
  }

  // Flecha de gradiente en 3D
  function updateGradientArrow3D() {
    if (gradientArrow3D) { try { scene.remove(gradientArrow3D); } catch (_) {} gradientArrow3D = null; }
    if (gradientField3DGroup) { try { scene.remove(gradientField3DGroup); } catch (_) {} gradientField3DGroup = null; }
    if (!(showGradient3D && showGradient3D.checked)) return;
<<<<<<< HEAD
    if (!lastCalc || !lastCalc.grad || !isFinite(lastCalc.grad.fx) || !isFinite(lastCalc.grad.fy) || !isFinite(lastCalc.f0)) return;
    const x0 = lastCalc.point && isFinite(lastCalc.point.x) ? lastCalc.point.x : parseLocaleNumber(calcX0 ? calcX0.value : '0', 0);
    const y0 = lastCalc.point && isFinite(lastCalc.point.y) ? lastCalc.point.y : parseLocaleNumber(calcY0 ? calcY0.value : '0', 0);
=======
    if (!lastCalc || !lastCalc.grad || !isFinite(lastCalc.grad.fx) || !isFinite(lastCalc.grad.fy)) return;
    const { x0, y0 } = getCalcPointOrCenter();
>>>>>>> b84ca4adfcadfa1f0dfa8a8782d467cff94045a1
    const dir = new THREE.Vector3(lastCalc.grad.fx, lastCalc.grad.fy, 0);
    if (dir.length() === 0) return;
    dir.normalize();
    const scaleVal = parseFloat(gradientScale ? gradientScale.value : '0.2');
    const length = Math.max(1e-6, scaleVal) * Math.max(currentAxes.xmax - currentAxes.xmin, currentAxes.ymax - currentAxes.ymin);
    const zCenter = (currentAxes.zmin + currentAxes.zmax) / 2;
    const zOrigin = isFinite(lastCalc.f0) ? lastCalc.f0 : zCenter;
    const origin = new THREE.Vector3(x0, y0, zOrigin);
    gradientArrow3D = new THREE.ArrowHelper(dir, origin, length, 0xf59e0b);
    scene.add(gradientArrow3D);

    // Campo de gradiente 3D: múltiples flechas sobre la superficie
    const f = compileFnOrFallback(getFnExprNormalized(), '7*x*y / exp(x^2 + y^2)');
    if (!f) return; // si no compila, mostramos sólo la flecha principal
    const axes = currentAxes;
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    const density = Math.min(18, Math.max(8, Math.round((Math.max(axes.xmax - axes.xmin, axes.ymax - axes.ymin)) * 2)));
    const group = new THREE.Group();
    const hBase = 1e-3 * Math.max(axes.xmax - axes.xmin, axes.ymax - axes.ymin);
    const h = Math.max(1e-5, hBase);
    const arrowColor = 0xf59e0b;
    for (let jy = 0; jy < density; jy++) {
      const y = axes.ymin + (jy + 0.5) * (axes.ymax - axes.ymin) / density;
      for (let ix = 0; ix < density; ix++) {
        const x = axes.xmin + (ix + 0.5) * (axes.xmax - axes.xmin) / density;
        let f0, f_xph, f_xmh, f_yph, f_ymh;
        try {
          f0 = f.evaluate({ x, y, ...paramDefaults });
          f_xph = f.evaluate({ x: x + h, y, ...paramDefaults });
          f_xmh = f.evaluate({ x: x - h, y, ...paramDefaults });
          f_yph = f.evaluate({ x, y: y + h, ...paramDefaults });
          f_ymh = f.evaluate({ x, y: y - h, ...paramDefaults });
        } catch (_) { continue; }
        if (!isFinite(f_xph) || !isFinite(f_xmh) || !isFinite(f_yph) || !isFinite(f_ymh) || !isFinite(f0)) continue;
        const fx = (f_xph - f_xmh) / (2 * h);
        const fy = (f_yph - f_ymh) / (2 * h);
        const norm = Math.hypot(fx, fy);
        if (!(isFinite(norm) && norm > 0)) continue;
        const dirV = new THREE.Vector3(fx / norm, fy / norm, 0);
        const originV = new THREE.Vector3(x, y, f0);
        const lenV = Math.max(1e-6, scaleVal) * Math.max(axes.xmax - axes.xmin, axes.ymax - axes.ymin) * 0.6;
        const arrow = new THREE.ArrowHelper(dirV, originV, lenV, arrowColor);
        group.add(arrow);
      }
    }
    gradientField3DGroup = group;
    scene.add(group);
  }

  // Campo de gradiente en 3D (múltiples flechas sobre la superficie z=f(x,y))
  function updateGradientField3D() {
    if (gradientField3DGroup) { try { scene.remove(gradientField3DGroup); } catch (_) {} gradientField3DGroup = null; }
    const el = document.getElementById('showGradientField3D');
    if (!el || !el.checked) return;
    const raw = (fnInput.value && fnInput.value.trim().length > 0) ? fnInput.value.trim() : '7*x*y / exp(x^2 + y^2)';
    let compiled;
    try { compiled = math.parse(raw).compile(); } catch (_) { return; }
    const axes = getAxesFromUI();
    const { xmin, xmax, ymin, ymax } = axes;
    const paramDefaults = { a: 1, b: 1, c: 1, d: 0, t: 0, v: 1 };
    const densityVal = parseInt(gradientFieldDensity ? gradientFieldDensity.value : '10', 10);
    const nx = Math.max(4, densityVal);
    const ny = Math.max(4, densityVal);
    const dx = (xmax - xmin) / (nx - 1);
    const dy = (ymax - ymin) / (ny - 1);
    const hBase = 1e-3 * Math.max(xmax - xmin, ymax - ymin);
    const hScaleEl = document.getElementById('derivHScale');
    const hScale = hScaleEl ? parseFloat(hScaleEl.value) : 1;
    const h = Math.max(1e-8, hBase * (isFinite(hScale) ? hScale : 1));
    const domainInfo = buildDomainPredicateFromExpr(raw);
    gradientField3DGroup = new THREE.Group();
    const scaleVal = parseFloat(gradientScale ? gradientScale.value : '0.2');
    const lengthBase = Math.max(1e-6, scaleVal) * Math.max(xmax - xmin, ymax - ymin);
    for (let iy = 0; iy < ny; iy++) {
      const y = ymin + iy * dy;
      for (let ix = 0; ix < nx; ix++) {
        const x = xmin + ix * dx;
        try {
          if (!domainInfo.predicate(x, y, paramDefaults)) continue;
          const f0 = compiled.evaluate({ x, y, ...paramDefaults });
          if (!isFinite(f0)) continue;
          // Diferencias finitas centradas
          const f_xph = domainInfo.predicate(x + h, y, paramDefaults) ? compiled.evaluate({ x: x + h, y, ...paramDefaults }) : NaN;
          const f_xmh = domainInfo.predicate(x - h, y, paramDefaults) ? compiled.evaluate({ x: x - h, y, ...paramDefaults }) : NaN;
          const f_yph = domainInfo.predicate(x, y + h, paramDefaults) ? compiled.evaluate({ x, y: y + h, ...paramDefaults }) : NaN;
          const f_ymh = domainInfo.predicate(x, y - h, paramDefaults) ? compiled.evaluate({ x, y: y - h, ...paramDefaults }) : NaN;
          let fx = NaN, fy = NaN;
          if (isFinite(f_xph) && isFinite(f_xmh)) fx = (f_xph - f_xmh) / (2 * h);
          if (isFinite(f_yph) && isFinite(f_ymh)) fy = (f_yph - f_ymh) / (2 * h);
          if (!isFinite(fx) || !isFinite(fy)) continue;
          const dir = new THREE.Vector3(fx, fy, 0);
          const norm = dir.length();
          if (!(norm > 0)) continue;
          dir.normalize();
          // Evitar flechas que salgan de la caja
          const origin = new THREE.Vector3(x, y, f0);
          const length = lengthBase;
          const arrow = new THREE.ArrowHelper(dir, origin, length, 0x22c55e);
          gradientField3DGroup.add(arrow);
        } catch (_) { /* continuar */ }
      }
    }
    scene.add(gradientField3DGroup);
  }
}

/* Bootstrap */
initScene();
wireUI();
  // Modo punto automático: deshabilitar x₀/y₀ cuando está activo
  const autoPointEl = document.getElementById('autoPoint');
  if (autoPointEl) {
    const toggleInputs = () => {
      const on = !!autoPointEl.checked;
      const xEl = document.getElementById('calcX0');
      const yEl = document.getElementById('calcY0');
      if (xEl) xEl.disabled = on;
      if (yEl) yEl.disabled = on;
    };
    toggleInputs();
    autoPointEl.addEventListener('change', () => { toggleInputs(); runCalculations(); if (viewMode === '2D') redraw2D(); else updateGradientArrow3D(); });
  }