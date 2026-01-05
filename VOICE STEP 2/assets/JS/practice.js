// ===============================
// PRACTICE MOCK ENGINE
// VOICE STEP
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // ELEMENTS
  // -------------------------------
  const recordBtn = document.getElementById("recordBtn");
  const progressBar = document.getElementById("progressFill");
  const progressText = document.getElementById("progressPercent");
  const syllableContainer = document.getElementById("syllables");
  const waveBars = document.querySelectorAll(".wave-bar");
  const statusText = document.getElementById("statusText");

  // -------------------------------
  // STATE
  // -------------------------------
  let isRecording = false;
  let progress = 0;
  let currentSyllable = 0;

  const syllables = ["สา", "หวัด", "ดี"];
  const targetPerSyllable = 100 / syllables.length;

  let waveInterval = null;
  let progressInterval = null;

  // -------------------------------
  // INIT
  // -------------------------------
  renderSyllables();
  updateStatus("กดปุ่มเพื่อเริ่มฝึกพูด");

  // -------------------------------
  // EVENT
  // -------------------------------
  recordBtn.addEventListener("click", () => {
    if (!isRecording) {
      startMockRecording();
    } else {
      stopMockRecording();
    }
  });

  // -------------------------------
  // FUNCTIONS
  // -------------------------------

  function startMockRecording() {
    isRecording = true;
    recordBtn.classList.add("recording");
    recordBtn.innerHTML = "⏹ หยุดอัดเสียง";
    updateStatus(`ฝึกพยางค์: ${syllables[currentSyllable]}`);

    startWaveAnimation();
    startProgressMock();
  }

  function stopMockRecording() {
    isRecording = false;
    recordBtn.classList.remove("recording");
    recordBtn.innerHTML = "🎤 เริ่มอัดเสียง";

    stopWaveAnimation();
    stopProgressMock();

    updateStatus("หยุดการฝึก");
  }

  // -------------------------------
  // MOCK PROGRESS
  // -------------------------------
  function startProgressMock() {
    progressInterval = setInterval(() => {
      progress += Math.random() * 3 + 1;

      if (progress >= (currentSyllable + 1) * targetPerSyllable) {
        markSyllableDone(currentSyllable);
        currentSyllable++;

        if (currentSyllable >= syllables.length) {
          finishPractice();
          return;
        } else {
          updateStatus(`ฝึกพยางค์: ${syllables[currentSyllable]}`);
        }
      }

      updateProgressUI();

    }, 120);
  }

  function stopProgressMock() {
    clearInterval(progressInterval);
  }

  function finishPractice() {
    stopMockRecording();
    progress = 100;
    updateProgressUI();
    updateStatus("🎉 ผ่านคำนี้แล้ว!");
  }

  // -------------------------------
  // UI HELPERS
  // -------------------------------
  function updateProgressUI() {
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.floor(progress)}%`;
  }

  function renderSyllables() {
    syllableContainer.innerHTML = "";
    syllables.forEach((syllable, index) => {
      const el = document.createElement("span");
      el.className = "syllable";
      el.textContent = syllable;
      if (index === 0) el.classList.add("active");
      syllableContainer.appendChild(el);
    });
  }

  function markSyllableDone(index) {
    const all = document.querySelectorAll(".syllable");
    all[index].classList.remove("active");
    all[index].classList.add("done");

    if (all[index + 1]) {
      all[index + 1].classList.add("active");
    }
  }

  function updateStatus(text) {
    if (statusText) statusText.textContent = text;
  }

  // -------------------------------
  // FAKE WAVE ANIMATION
  // -------------------------------
  function startWaveAnimation() {
    waveInterval = setInterval(() => {
      waveBars.forEach(bar => {
        const height = Math.random() * 80 + 20;
        bar.style.height = `${height}%`;
      });
    }, 100);
  }

  function stopWaveAnimation() {
    clearInterval(waveInterval);
    waveBars.forEach(bar => {
      bar.style.height = "10%";
    });
  }

});