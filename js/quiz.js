const TIMER = { easy: 30, medium: 20, hard: 15 };
const DIFF_MULT = { easy: 1, medium: 1.5, hard: 2 };
const BASE_PTS = 100;
const TIME_BONUS = 50; // extra pts for fast answer
const TOTAL_Q = 20;

let questions = [];
let current = 0;
let score = 0;
let correctCount = 0;
let timerInterval = null;
let timeLeft = 0;
let answered = false;
let difficulty = 'easy';
let playerName = 'GeoQuester';

const els = {};

function initDOM() {
  els.progress    = document.getElementById('progress');
  els.progressBar = document.getElementById('progressBar');
  els.qNum        = document.getElementById('qNum');
  els.category    = document.getElementById('category');
  els.score       = document.getElementById('scoreVal');
  els.timerBar    = document.getElementById('timerBar');
  els.timerTxt    = document.getElementById('timerTxt');
  els.questionTxt = document.getElementById('questionTxt');
  els.flagWrap    = document.getElementById('flagWrap');
  els.flagImg     = document.getElementById('flagImg');
  els.optionsGrid = document.getElementById('optionsGrid');
  els.feedback    = document.getElementById('feedback');
  els.feedbackTxt = document.getElementById('feedbackTxt');
  els.nextBtn     = document.getElementById('nextBtn');
  els.resultPanel = document.getElementById('resultPanel');
  els.quizPanel   = document.getElementById('quizPanel');
}

function init() {
  initDOM();
  playerName = localStorage.getItem('gq_player') || 'GeoQuester';
  difficulty  = localStorage.getItem('gq_difficulty') || 'easy';
  document.getElementById('diffBadge').className = `badge badge--${difficulty}`;
  document.getElementById('diffBadge').textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  document.getElementById('playerName').textContent = playerName;
  questions = generateQuiz(difficulty, TOTAL_Q);
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) { endQuiz(); return; }

  answered = false;
  const q = questions[current];
  const totalTime = TIMER[difficulty];

  // Progress
  els.progress.textContent = `${current + 1} / ${TOTAL_Q}`;
  els.progressBar.style.width = `${((current) / TOTAL_Q) * 100}%`;
  els.qNum.textContent = `Question ${current + 1}`;

  // Category badge
  els.category.className = `badge badge--${q.type}`;
  els.category.textContent = q.category;

  // Question text
  els.questionTxt.innerHTML = q.text;

  // Flag image
  if (q.flagUrl) {
    els.flagWrap.style.display = 'block';
    els.flagImg.src = q.flagUrl;
    els.flagImg.alt = 'Country flag';
  } else {
    els.flagWrap.style.display = 'none';
  }

  els.optionsGrid.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn anim-fadeUp';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(btn, opt, q));
    els.optionsGrid.appendChild(btn);
  });

  els.feedback.style.display = 'none';
  els.nextBtn.style.display = 'none';

  els.questionTxt.classList.remove('anim-fadeUp');
  void els.questionTxt.offsetWidth;
  els.questionTxt.classList.add('anim-fadeUp');

}
function handleAnswer(btn, chosen, q) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const isCorrect = chosen === q.correct;

  if (isCorrect) {
    correctCount++;
    const timePct = timeLeft / TIMER[difficulty];
    const pts = Math.round((BASE_PTS + TIME_BONUS * timePct) * DIFF_MULT[difficulty]);
    score += pts;
    els.score.textContent = score;
    btn.classList.add('option--correct');
    showFeedback(true, `✅ Correct! <strong>+${pts} pts</strong>`);
  } else {
    btn.classList.add('option--wrong');
    // Highlight correct answer
    Array.from(els.optionsGrid.children).forEach(b => {
      if (b.textContent === q.correct) b.classList.add('option--correct');
    });
    showFeedback(false, `❌ Incorrect. The answer was <strong>${q.correct}</strong>`);
  }

  // Disable all options
  Array.from(els.optionsGrid.children).forEach(b => b.disabled = true);

  // Show next button
  setTimeout(() => {
    els.nextBtn.style.display = 'flex';
  }, 400);
}

function showFeedback(correct, msg) {
  els.feedback.style.display = 'flex';
  els.feedback.className = `feedback ${correct ? 'feedback--correct' : 'feedback--wrong'}`;
  els.feedbackTxt.innerHTML = msg;
  // Fun fact about the country
  const c = questions[current].country;
  const fact = `${c.name} is in ${c.continent}. Its capital is ${c.capital}. 🚩 <img src="https://flagcdn.com/w20/${c.code}.png" alt="" style="vertical-align:middle;border-radius:2px;margin-left:4px;">`;
  document.getElementById('factTxt').innerHTML = fact;
}

// Next question
document.addEventListener('DOMContentLoaded', () => {
  init();
  document.getElementById('nextBtn').addEventListener('click', () => {
    current++;
    showQuestion();
  });
});

// End Quiz
function endQuiz() {
  clearInterval(timerInterval);
  els.quizPanel.style.display = 'none';
  els.resultPanel.style.display = 'block';
  els.resultPanel.classList.add('anim-fadeUp');

  const pct = Math.round((correctCount / TOTAL_Q) * 100);
  document.getElementById('finalScore').textContent = score;
  document.getElementById('finalCorrect').textContent = `${correctCount} / ${TOTAL_Q} correct`;
  document.getElementById('finalDiff').className = `badge badge--${difficulty}`;
  document.getElementById('finalDiff').textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  document.getElementById('statCorrect').textContent = `${correctCount}/${TOTAL_Q}`;
  document.getElementById('statPct').textContent = `${pct}%`;

  let medal = '🥉'; let msg = 'Keep exploring!';
  if (pct >= 90) { medal = '🏆'; msg = 'World-Class Geographer!'; }
  else if (pct >= 70) { medal = '🥇'; msg = 'Excellent Knowledge!'; }
  else if (pct >= 50) { medal = '🥈'; msg = 'Good Effort!'; }
  document.getElementById('medalEmoji').textContent = medal;
  document.getElementById('resultMsg').textContent = msg;

  // Save to leaderboard
  saveScore({ name: playerName, score, correct: correctCount, total: TOTAL_Q, difficulty, date: new Date().toISOString() });
}

// Save Leaderboard
function saveScore(entry) {
  const key = 'gq_leaderboard';
  const board = JSON.parse(localStorage.getItem(key) || '[]');
  board.push(entry);
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem(key, JSON.stringify(board.slice(0, 50)));
}
