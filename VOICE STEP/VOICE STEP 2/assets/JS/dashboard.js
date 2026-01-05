/* =====================================================
   VOICE STEP – Dashboard Controller
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. USER DATA (Mock / LocalStorage)
     ===================================================== */

  const defaultUser = {
    username: "ผู้ใช้งานทดลอง",
    level: 1,
    score: 0
  };

  function getUserData() {
    const saved = localStorage.getItem("voiceStepUser");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("voiceStepUser", JSON.stringify(defaultUser));
    return defaultUser;
  }

  function saveUserData(data) {
    localStorage.setItem("voiceStepUser", JSON.stringify(data));
  }

  const userData = getUserData();

  /* =====================================================
     2. BIND USER INFO TO UI
     ===================================================== */

  const usernameEl = document.getElementById("username");
  const levelEl = document.getElementById("level");
  const scoreEl = document.getElementById("score");

  if (usernameEl) usernameEl.textContent = userData.username;
  if (levelEl) levelEl.textContent = userData.level;
  if (scoreEl) scoreEl.textContent = userData.score;

  /* =====================================================
     3. LOGOUT (Mock)
     ===================================================== */

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      alert("ออกจากระบบแล้ว (โหมดทดสอบ)");
      window.location.href = "login.html";
    });
  }

  /* =====================================================
     4. LEVEL STRUCTURE
     ===================================================== */

  const levels = [
    {
      id: 1,
      title: "คำพื้นฐาน",
      totalLessons: 10
    },
    {
      id: 2,
      title: "คำและประโยคสั้น",
      totalLessons: 15
    },
    {
      id: 3,
      title: "การสื่อสารในชีวิตประจำวัน",
      totalLessons: 20
    }
  ];

  /* =====================================================
     5. INITIALIZE PROGRESS
     ===================================================== */

  function initProgress() {
    if (!localStorage.getItem("voiceStepProgress")) {
      const progress = {
        level1: { completed: 0, unlocked: true },
        level2: { completed: 0, unlocked: false },
        level3: { completed: 0, unlocked: false }
      };
      localStorage.setItem("voiceStepProgress", JSON.stringify(progress));
    }
  }

  function getProgress() {
    return JSON.parse(localStorage.getItem("voiceStepProgress"));
  }

  function saveProgress(progress) {
    localStorage.setItem("voiceStepProgress", JSON.stringify(progress));
  }

  initProgress();

  /* =====================================================
     6. PROGRESS SUMMARY (HISTOGRAM)
     ===================================================== */

  const progressHistory = [20, 40, 60, 60, 80, 100, 80];
  const chartContainer = document.getElementById("progressChart");

  function renderHistogram() {
    if (!chartContainer) return;
    chartContainer.innerHTML = "";

    progressHistory.forEach((value) => {
      const bar = document.createElement("div");
      bar.className =
        "flex-1 rounded-t-lg transition-all duration-300";

      bar.style.height = value + "%";

      if (value < 40) {
        bar.style.backgroundColor = "#D6D6D6"; // เทา
      } else if (value < 80) {
        bar.style.backgroundColor = "#9BE7C4"; // มิ้น
      } else {
        bar.style.backgroundColor = "#7CC6F0"; // ฟ้า
      }

      bar.title = value + "%";
      chartContainer.appendChild(bar);
    });
  }

  renderHistogram();

  /* =====================================================
     7. LEVEL LOGIC (LOCK / UNLOCK)
     ===================================================== */

  function completeLesson(levelId) {
    const progress = getProgress();
    const key = "level" + levelId;

    progress[key].completed += 1;

    // Unlock next level
    if (
      progress[key].completed >= levels[levelId - 1].totalLessons &&
      levelId < levels.length
    ) {
      progress["level" + (levelId + 1)].unlocked = true;
    }

    // Update user
    userData.level = Math.max(userData.level, levelId);
    userData.score += 10;

    saveUserData(userData);
    saveProgress(progress);

    alert("บันทึกความก้าวหน้าแล้ว ✔");
    location.reload();
  }

  /* =====================================================
     8. PRACTICE NAVIGATION
     ===================================================== */

  window.goToPractice = function (levelId) {
    const progress = getProgress();
    const key = "level" + levelId;

    if (!progress[key].unlocked) {
      alert("ด่านนี้ยังถูกล็อกอยู่ 🔒");
      return;
    }

    localStorage.setItem("currentLevel", levelId);
    window.location.href = "practice.html";
  };

  /* =====================================================
     9. DEBUG (DEV ONLY)
     ===================================================== */

  window.__voiceStepDebug = {
    completeLesson,
    getProgress
  };

});