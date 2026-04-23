const DIFF_MULT = { easy: 1, medium: 1.5, hard: 2 };
const BASE_PTS  = 100;
const TOTAL_Q   = 20;

let questions    = [];
let current      = 0;
let score        = 0;
let correctCount = 0;
let answered     = false;
let difficulty   = 'easy';
let category     = 'capitals';
let playerName   = 'GeoQuester';

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function boot() {
  playerName = localStorage.getItem('gq_player') || 'GeoQuester';
  category   = getParam('cat') || 'capitals';
  if (!CATEGORIES[category]) category = 'capitals';

  // Always show difficulty selection — never skip it from localStorage
  showStartScreen();
}

/* Start screen (difficulty picker) */
function showStartScreen() {
  document.getElementById('startPanel').style.display  = 'flex';
  document.getElementById('quizPanel').style.display   = 'none';
  document.getElementById('resultPanel').style.display = 'none';

  const cat = CATEGORIES[category];
  document.getElementById('startIcon').textContent   = cat.icon;
  document.getElementById('startTitle').textContent  = cat.label;
  document.getElementById('startDesc').textContent   = cat.desc;
  document.getElementById('startPlayer').textContent = playerName;

  const lastDiff = localStorage.getItem('gq_last_difficulty') || 'easy';
  const radio = document.querySelector(`input[name="difficulty"][value="${lastDiff}"]`);
  if (radio) radio.checked = true;

  updateNav();
}

/* Start quiz */
function startQuiz() {
  const checked = document.querySelector('input[name="difficulty"]:checked');
  difficulty = checked ? checked.value : 'easy';
  localStorage.setItem('gq_last_difficulty', difficulty);
  localStorage.setItem('gq_category', category);

  document.getElementById('startPanel').style.display  = 'none';
  document.getElementById('resultPanel').style.display = 'none';
  document.getElementById('quizPanel').style.display   = 'block';

  questions    = generateQuiz(category, difficulty, TOTAL_Q);
  current      = 0;
  score        = 0;
  correctCount = 0;

  const cat = CATEGORIES[category];
  document.getElementById('quizCatLabel').textContent   = cat.label;
  document.getElementById('quizCatIcon').textContent    = cat.icon;
  document.getElementById('quizPlayerName').textContent = playerName;

  const diffEl = document.getElementById('diffBadge');
  diffEl.className   = `badge badge--${difficulty}`;
  diffEl.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  updateNav();
  showQuestion();
}

/* Nav active state */
function updateNav() {
  document.querySelectorAll('.nav__link[data-cat]').forEach(a => {
    a.classList.toggle('active', a.dataset.cat === category);
  });
}

function showQuestion() {
  if (current >= questions.length) { endQuiz(); return; }

  answered = false;
  const q  = questions[current];

  // Progress
  document.getElementById('progressFill').style.width = `${(current / TOTAL_Q) * 100}%`;
  document.getElementById('progressTxt').textContent  = `${current + 1} / ${TOTAL_Q}`;
  document.getElementById('qNumTxt').textContent      = `Q${current + 1}`;
  document.getElementById('scoreTxt').textContent     = score.toLocaleString();

  // Question text — animate in
  const qText = document.getElementById('questionText');
  qText.innerHTML = q.text;
  qText.classList.remove('anim-fadeUp');
  void qText.offsetWidth;
  qText.classList.add('anim-fadeUp');

  renderMedia(q);
  renderOptions(q);

  document.getElementById('feedback').style.display = 'none';
  document.getElementById('nextBtn').style.display  = 'none';
}

function renderMedia(q) {
  document.getElementById('flagWrap').style.display  = 'none';
  document.getElementById('shapeWrap').style.display = 'none';

  if (q.flagUrl) {
    document.getElementById('flagWrap').style.display = 'block';
    document.getElementById('flagImg').src = q.flagUrl;
  }

  if (q.shapeCode) {
    document.getElementById('shapeWrap').style.display = 'flex';
    renderCountryShape(q.shapeCode, q.shapeIso2);
  }
}

/* Options */
function renderOptions(q) {
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn anim-fadeUp';
    btn.style.animationDelay = `${i * 0.07}s`;
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(btn, opt, q));
    grid.appendChild(btn);
  });
}

/* Answer handling */
function handleAnswer(btn, chosen, q) {
  if (answered) return;
  answered = true;

  const isCorrect = chosen === q.correct;

  if (isCorrect) {
    correctCount++;
    const pts = Math.round(BASE_PTS * DIFF_MULT[difficulty]);
    score += pts;
    document.getElementById('scoreTxt').textContent = score.toLocaleString();
    btn.classList.add('option--correct');
    showFeedback(true, `✅ Correct! <strong>+${pts} pts</strong>`);
  } else {
    btn.classList.add('option--wrong');
    document.querySelectorAll('.option-btn').forEach(b => {
      if (b.textContent === q.correct) b.classList.add('option--correct');
    });
    showFeedback(false, `❌ Incorrect. The answer was <strong>${q.correct}</strong>`);
  }

  document.querySelectorAll('.option-btn').forEach(b => { b.disabled = true; });
  setTimeout(() => { document.getElementById('nextBtn').style.display = 'flex'; }, 350);
}

function showFeedback(correct, msg) {
  const el = document.getElementById('feedback');
  el.style.display = 'flex';
  el.className = `feedback feedback--${correct ? 'correct' : 'wrong'}`;
  document.getElementById('feedbackMain').innerHTML = msg;

  const c = questions[current].country;
  document.getElementById('feedbackFact').innerHTML =
    `<img src="https://flagcdn.com/w20/${c.code}.png" style="height:13px;border-radius:2px;vertical-align:middle;">
     &nbsp;${c.name} &nbsp;·&nbsp; ${c.continent} &nbsp;·&nbsp; Capital: ${c.capital}&nbsp;·&nbsp; Language: ${c.language}`;
}

function endQuiz() {
  document.getElementById('quizPanel').style.display   = 'none';
  document.getElementById('resultPanel').style.display = 'block';
  document.getElementById('resultPanel').classList.add('anim-fadeUp');

  const pct = Math.round((correctCount / TOTAL_Q) * 100);
  const cat = CATEGORIES[category];

  document.getElementById('resultCatIcon').textContent  = cat.icon;
  document.getElementById('resultCatLabel').textContent = cat.label;
  document.getElementById('finalScore').textContent     = score.toLocaleString();
  document.getElementById('finalCorrect').textContent   = `${correctCount} / ${TOTAL_Q}`;
  document.getElementById('finalPct').textContent       = `${pct}%`;

  const diffEl = document.getElementById('resultDiffBadge');
  diffEl.className   = `badge badge--${difficulty}`;
  diffEl.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  let medal = '🥉', msg = 'Keep exploring!';
  if (pct >= 90)      { medal = '🏆'; msg = 'World-Class Geographer!'; }
  else if (pct >= 70) { medal = '🥇'; msg = 'Excellent Knowledge!'; }
  else if (pct >= 50) { medal = '🥈'; msg = 'Good Effort!'; }
  document.getElementById('medalEmoji').textContent = medal;
  document.getElementById('resultMsg').textContent  = msg;

  saveScore({
    name: playerName, score, correct: correctCount,
    total: TOTAL_Q, category, difficulty,
    date: new Date().toISOString()
  });
}

function saveScore(entry) {
  const board = JSON.parse(localStorage.getItem('gq_leaderboard') || '[]');
  board.push(entry);
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem('gq_leaderboard', JSON.stringify(board.slice(0, 100)));
}

let worldData = null;

async function renderCountryShape(numCode, iso2) {
  const canvas = document.getElementById('shapeCanvas');
  canvas.style.display = 'block';
  document.getElementById('shapeFallbackImg').style.display = 'none';
  document.getElementById('shapeError').style.display      = 'none';
  document.getElementById('shapeSpinner').style.display    = 'flex';

  const ctx = canvas.getContext('2d');
  const W   = canvas.width  = canvas.offsetWidth  || 300;
  const H   = canvas.height = canvas.offsetHeight || 210;
  ctx.clearRect(0, 0, W, H);

  try {
    if (!worldData) {
      const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      worldData = await res.json();
    }

    const features = topojson.feature(worldData, worldData.objects.countries).features;
    const numInt   = parseInt(numCode, 10);
    const feature  = features.find(f => parseInt(f.id, 10) === numInt);

    if (!feature) { showShapeFallback(iso2); return; }

    const coords = extractCoords(feature.geometry);
    if (!coords.length) { showShapeFallback(iso2); return; }

    const pad    = 28;
    const minX   = Math.min(...coords.map(c => c[0]));
    const maxX   = Math.max(...coords.map(c => c[0]));
    const minY   = Math.min(...coords.map(c => c[1]));
    const maxY   = Math.max(...coords.map(c => c[1]));
    const scaleX = (W - pad * 2) / ((maxX - minX) || 1);
    const scaleY = (H - pad * 2) / ((maxY - minY) || 1);
    const scale  = Math.min(scaleX, scaleY);
    const offX   = (W - (maxX - minX) * scale) / 2 - minX * scale;
    const offY   = (H - (maxY - minY) * scale) / 2 - minY * scale;

    function project(lon, lat) {
      return [lon * scale + offX, H - (lat * scale + offY)];
    }

    ctx.beginPath();
    drawFeature(ctx, feature.geometry, project);
    ctx.fillStyle   = 'rgba(0,201,177,0.2)';
    ctx.strokeStyle = 'rgba(0,201,177,0.9)';
    ctx.lineWidth   = 1.8;
    ctx.fill();
    ctx.stroke();

  } catch (e) {
    showShapeFallback(iso2);
  } finally {
    document.getElementById('shapeSpinner').style.display = 'none';
  }
}

function extractCoords(geom) {
  const out = [];
  if (geom.type === 'Polygon')
    geom.coordinates.forEach(ring => ring.forEach(p => out.push(p)));
  if (geom.type === 'MultiPolygon')
    geom.coordinates.forEach(poly => poly.forEach(ring => ring.forEach(p => out.push(p))));
  return out;
}

function drawFeature(ctx, geom, project) {
  function drawRing(ring) {
    if (!ring.length) return;
    const [sx, sy] = project(ring[0][0], ring[0][1]);
    ctx.moveTo(sx, sy);
    for (let i = 1; i < ring.length; i++) {
      const [x, y] = project(ring[i][0], ring[i][1]);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  if (geom.type === 'Polygon')
    geom.coordinates.forEach(drawRing);
  if (geom.type === 'MultiPolygon')
    geom.coordinates.forEach(poly => poly.forEach(drawRing));
}

function showShapeFallback(iso2) {
  document.getElementById('shapeCanvas').style.display = 'none';
  document.getElementById('shapeSpinner').style.display = 'none';
  const img = document.getElementById('shapeFallbackImg');
  img.style.display = 'block';
  img.src = `https://cdn.jsdelivr.net/npm/mapsicon@0.0.1/all/${iso2}/512.png`;
  img.onerror = () => {
    img.style.display = 'none';
    document.getElementById('shapeError').style.display = 'flex';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  boot();

  document.getElementById('startBtn').addEventListener('click', startQuiz);

  document.getElementById('nextBtn').addEventListener('click', () => {
    current++;
    showQuestion();
  });

  // Play Again → go back to difficulty selection (same category)
  document.getElementById('playAgainBtn').addEventListener('click', showStartScreen);
});
