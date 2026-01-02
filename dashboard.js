document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MOCK USER DATA (แทน Firebase ชั่วคราว)
     =============================== */
  const userData = {
    username: "ผู้ใช้งานทดลอง",
    level: 2,
    score: 320,
  };

  const progressHistory = [20, 40, 60, 60, 80, 100, 80]; // 7 ครั้งล่าสุด (เปอร์เซ็นต์)

  /* ===============================
     BIND USER INFO
     =============================== */
  const usernameEl = document.getElementById("username");
  const levelEl = document.getElementById("level");
  const scoreEl = document.getElementById("score");

  if (usernameEl) usernameEl.textContent = userData.username;
  if (levelEl) levelEl.textContent = userData.level;
  if (scoreEl) scoreEl.textContent = userData.score;

  /* ===============================
     LOGOUT (เตรียมไว้ต่อ Firebase)
     =============================== */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // TODO: firebase.auth().signOut()
      alert("ออกจากระบบแล้ว (โหมดทดสอบ)");
      window.location.href = "../login.html";
    });
  }

  /* ===============================
     HISTOGRAM (PROGRESS SUMMARY)
     =============================== */
  const histogramContainer = document.createElement("section");
  histogramContainer.className = "progress-summary";

  const title = document.createElement("h2");
  title.textContent = "สรุปความคืบหน้าการฝึก (7 ครั้งล่าสุด)";
  histogramContainer.appendChild(title);

  const chart = document.createElement("div");
  chart.className = "histogram";

  progressHistory.forEach((value, index) => {
    const barWrapper = document.createElement("div");
    barWrapper.className = "bar-wrapper";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = value + "%";

    // สีตามระดับความคืบหน้า
    if (value < 40) {
      bar.classList.add("bar-low");       // เทา
    } else if (value < 80) {
      bar.classList.add("bar-mid");       // มิ้น
    } else {
      bar.classList.add("bar-high");      // น้ำเงิน
    }

    const label = document.createElement("span");
    label.textContent = `ครั้งที่ ${index + 1}`;

    barWrapper.appendChild(bar);
    barWrapper.appendChild(label);
    chart.appendChild(barWrapper);
  });

  histogramContainer.appendChild(chart);

  /* ===============================
     INSERT TO DASHBOARD
     =============================== */
  const dashboard = document.querySelector(".dashboard");
  if (dashboard) {
    dashboard.appendChild(histogramContainer);
  }

});