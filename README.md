# ⌨️ TypingClub Clone | Touch Typing Trainer

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status: Active](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)]()

*A gamified, browser-based touch-typing mastery platform inspired by TypingClub. Built for students and developers to build muscle memory, speed, and precision completely free of charge.*

</div>

---

## 🎯 Overview

**TypingClub Clone** is a modern, lightweight web application designed to teach touch typing from the ground up. Moving away from traditional rigid drills, this platform provides an interactive curriculum, real-time telemetry (WPM & Accuracy), on-screen finger-to-key visual guides, and persistent progress tracking using browser local storage.

---

## ✨ Key Features

* **Curated Pedagogical Roadmap:** Structured lesson levels starting from home row fundamentals (`F & J`, `D & K`) progressing to full alphabet proficiency.
* **Real-Time Telemetry:** Instant calculation of Words Per Minute (WPM) and live Accuracy percentage with visual character state highlighting (correct, incorrect, current).
* **Interactive QWERTY Keyboard & Finger Guide:** Dynamic visualizer highlighting the exact physical/virtual keys pressed along with finger mapping instructions.
* **Gamified Star Reward System:** Earn up to 5 stars per lesson based on real-time performance metrics.
* **Persistent User Progress:** Automatically saves stars, unlocked levels, and stats via `localStorage` so users can resume anytime.
* **Responsive Dark-Mode UI:** Sleek, distraction-free modern UI styled with custom CSS properties and CSS flexbox.

---

## 🛠️ Tech Stack

* **Frontend Structure:** HTML5
* **Styling & Layout:** CSS3 (Flexbox, CSS Variables, Keyframe Animations)
* **Core Logic & State Management:** Vanilla JavaScript (ES6+)
* **Persistence:** Browser LocalStorage API

---

## 📂 Project Structure

```text
typing-club-clone/
│
├── index.html       # Main application markup & view containers
├── style.css        # Modern dark-mode styling, animations, and layout grid
├── script.js        # Core typing game engine, event listeners, and state manager
└── README.md        # Project documentation