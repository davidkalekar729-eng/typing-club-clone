// --- LESSON DATA (TypingClub Style Curated Curriculum) ---
const lessons = [
  { id: 1, title: "Lesson 1: F and J", text: "f j f j j f j f f j f j" },
  { id: 2, title: "Lesson 2: D and K", text: "d k d k k d k d d k d k" },
  { id: 3, title: "Lesson 3: Home Row Intro", text: "fdf jkj fjj dkk fdk jkl" },
  { id: 4, title: "Lesson 4: S and L", text: "s l s l l s l s s l s l" },
  { id: 5, title: "Lesson 5: Full Home Row", text: "asdf jkl; asdf jkl; sad lad" },
  { id: 6, title: "Lesson 6: Simple Words", text: "fad sad flask dad fall lad" },
  { id: 7, title: "Lesson 7: E and I", text: "e i e i ie ee ii fed slide" },
  { id: 8, title: "Lesson 8: R and U", text: "r u r u ur rr uu ride surf" }
];

// --- APP STATE ---
let currentLessonIndex = 0;
let userProgress = JSON.parse(localStorage.getItem('typing_progress')) || { unlockedLevel: 1, stars: {} };
let currentText = "";
let charIndex = 0;
let startTime = null;
let errors = 0;
let isTypingActive = false;

// --- DOM ELEMENTS ---
const viewMap = document.getElementById('lesson-map-view');
const viewArena = document.getElementById('typing-arena-view');
const lessonsGrid = document.getElementById('lessons-grid');
const textDisplay = document.getElementById('text-display');
const liveWpm = document.getElementById('live-wpm');
const liveAccuracy = document.getElementById('live-accuracy');
const progressBarFill = document.getElementById('progress-bar-fill');
const targetKeyDisplay = document.getElementById('target-key-display');
const targetFingerName = document.getElementById('target-finger-name');
const totalStarsSpan = document.getElementById('total-stars');
const currentLevelNum = document.getElementById('current-level-num');
const btnHome = document.getElementById('btn-home');
const resultModal = document.getElementById('result-modal');
const finalWpm = document.getElementById('final-wpm');
const finalAccuracy = document.getElementById('final-accuracy');
const starsDisplay = document.getElementById('stars-display');
const btnNextLesson = document.getElementById('btn-next-lesson');
const btnRetry = document.getElementById('btn-retry');

// --- INITIALIZE APP ---
function initApp() {
  renderLessonMap();
  updateTotalStars();
  btnHome.classList.add('hidden');
}

function updateTotalStars() {
  let total = 0;
  for (let lvl in userProgress.stars) {
    total += userProgress.stars[lvl];
  }
  totalStarsSpan.textContent = total;
}

// --- RENDER LESSON MAP ---
function renderLessonMap() {
  lessonsGrid.innerHTML = "";
  lessons.forEach((lesson, index) => {
    const levelNum = index + 1;
    const isLocked = levelNum > userProgress.unlockedLevel;
    const starsEarned = userProgress.stars[levelNum] || 0;

    const card = document.createElement('div');
    card.className = `lesson-card ${isLocked ? 'locked' : ''}`;
    
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<i class="fa-${i <= starsEarned ? 'solid' : 'regular'} fa-star"></i>`;
    }

    card.innerHTML = `
      <div class="lesson-title">Level ${levelNum}: ${lesson.title}</div>
      <div class="lesson-stars">${starsHtml}</div>
    `;

    if (!isLocked) {
      card.addEventListener('click', () => startLesson(index));
    }

    lessonsGrid.appendChild(card);
  });
}

// --- START LESSON ---
function startLesson(index) {
  currentLessonIndex = index;
  currentText = lessons[index].text;
  charIndex = 0;
  errors = 0;
  startTime = null;
  isTypingActive = true;

  viewMap.classList.remove('active');
  viewArena.classList.add('active');
  btnHome.classList.remove('hidden');
  currentLevelNum.textContent = index + 1;

  renderTextDisplay();
  updateFingerGuide();
}

// --- RENDER TEXT DISPLAY ---
function renderTextDisplay() {
  textDisplay.innerHTML = "";
  currentText.split('').forEach((char, idx) => {
    const span = document.createElement('span');
    span.className = 'char';
    if (idx === 0) span.classList.add('current');
    span.textContent = char === ' ' ? '␣' : char;
    textDisplay.appendChild(span);
  });
}

// --- UPDATE FINGER GUIDE ---
function updateFingerGuide() {
  if (charIndex < currentText.length) {
    const char = currentText[charIndex];
    targetKeyDisplay.textContent = char === ' ' ? 'Space' : char.toUpperCase();
    
    // Simple finger mapping logic
    let finger = "Left Index Finger";
    if ("ytrewqasdfgzxcvb".includes(char.toLowerCase())) {
      finger = "Left hand fingers";
    } else {
      finger = "Right hand fingers";
    }
    targetFingerName.textContent = finger;
  }
}

// --- KEYBOARD EVENT LISTENER ---
window.addEventListener('keydown', (e) => {
  if (!isTypingActive) return;

  // Prevent default scrolling on spacebar
  if (e.key === " ") e.preventDefault();

  // Highlight physical/virtual key
  const keyEl = document.querySelector(`.key[data-key="${e.key.toLowerCase()}"]`) || 
                document.querySelector(`.key[data-key="${e.key}"]`);
  if (keyEl) {
    keyEl.classList.add('pressed');
    setTimeout(() => keyEl.classList.remove('pressed'), 150);
  }

  // Handle Typing Input
  const expectedChar = currentText[charIndex];
  if (!expectedChar) return;

  if (!startTime) {
    startTime = new Date();
  }

  const charSpans = textDisplay.querySelectorAll('.char');

  if (e.key === expectedChar) {
    // Correct Key
    charSpans[charIndex].classList.remove('current', 'incorrect');
    charSpans[charIndex].classList.add('correct');
    charIndex++;

    if (charIndex < currentText.length) {
      charSpans[charIndex].classList.add('current');
      updateFingerGuide();
    } else {
      // Lesson Complete!
      finishLesson();
    }
  } else if (e.key.length === 1) {
    // Incorrect Key
    errors++;
    charSpans[charIndex].classList.add('incorrect');
  }

  updateLiveStats();
});

// --- UPDATE STATS ---
function updateLiveStats() {
  if (!startTime) return;
  const timeElapsed = (new Date() - startTime) / 60000; // in minutes
  if (timeElapsed <= 0) return;

  const wordsTyped = charIndex / 5;
  const wpm = Math.round(wordsTyped / timeElapsed);
  liveWpm.textContent = wpm < 0 ? 0 : wpm;

  const accuracy = charIndex === 0 ? 100 : Math.max(0, Math.round(((charIndex - errors) / charIndex) * 100));
  liveAccuracy.textContent = accuracy;

  const progressPercent = (charIndex / currentText.length) * 100;
  progressBarFill.style.width = `${progressPercent}%`;
}

// --- FINISH LESSON ---
function finishLesson() {
  isTypingActive = false;
  const timeElapsed = (new Date() - startTime) / 60000;
  const wordsTyped = currentText.length / 5;
  const wpm = Math.round(wordsTyped / timeElapsed);
  const accuracy = Math.max(0, Math.round(((currentText.length - errors) / currentText.length) * 100));

  // Calculate Stars (1 to 5)
  let stars = 3;
  if (accuracy >= 95 && wpm >= 20) stars = 5;
  else if (accuracy >= 90 && wpm >= 15) stars = 4;
  else if (accuracy >= 80) stars = 3;
  else stars = 2;

  // Save Progress
  const levelNum = currentLessonIndex + 1;
  if (!userProgress.stars[levelNum] || stars > userProgress.stars[levelNum]) {
    userProgress.stars[levelNum] = stars;
  }
  if (levelNum === userProgress.unlockedLevel && levelNum < lessons.length) {
    userProgress.unlockedLevel++;
  }
  localStorage.setItem('typing_progress', JSON.stringify(userProgress));

  // Populate Modal
  finalWpm.textContent = wpm;
  finalAccuracy.textContent = accuracy;
  
  let modalStarsHtml = "";
  for (let i = 1; i <= 5; i++) {
    modalStarsHtml += `<i class="fa-${i <= stars ? 'solid' : 'regular'} fa-star"></i>`;
  }
  starsDisplay.innerHTML = modalStarsHtml;
  resultModal.classList.remove('hidden');
}

// --- BUTTON CONTROLS ---
btnHome.addEventListener('click', () => {
  viewArena.classList.remove('active');
  resultModal.classList.add('hidden');
  viewMap.classList.add('active');
  renderLessonMap();
  updateTotalStars();
  btnHome.classList.add('hidden');
  isTypingActive = false;
});

btnRetry.addEventListener('click', () => {
  resultModal.classList.add('hidden');
  startLesson(currentLessonIndex);
});

btnNextLesson.addEventListener('click', () => {
  resultModal.classList.add('hidden');
  if (currentLessonIndex + 1 < lessons.length) {
    startLesson(currentLessonIndex + 1);
  } else {
    btnHome.click();
  }
});

// Run App on Load
initApp();