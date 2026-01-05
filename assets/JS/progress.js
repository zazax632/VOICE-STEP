<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>เข้าสู่ระบบ | VOICE STEP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/login.css">
</head>
<body>

<main class="auth-container">

  <!-- LEFT -->
  <section class="auth-info">
    <div class="auth-logo">🎤</div>
    <h1>VOICE STEP</h1>
    <p class="tagline">ฝึกการออกเสียงด้วย AI เพื่อการสื่อสารที่ดีขึ้น</p>

    <p class="info-text">
      หน้านี้ช่วยบันทึกความก้าวหน้า<br>
      และให้คำแนะนำที่เหมาะกับคุณ
    </p>

    <ul class="benefits">
      <li>✔ บันทึกความคืบหน้า</li>
      <li>✔ วิเคราะห์เสียงด้วย AI</li>
      <li>✔ คำแนะนำเฉพาะบุคคล</li>
      <li>✔ ใช้งานได้ทุกอุปกรณ์</li>
    </ul>

    <div class="skip-actions">
      <a href="#" data-target="index">ข้ามการสมัคร</a>
      <a href="#" data-target="dashboard">ดูวิธีใช้งาน</a>
      <a href="#" data-target="practice">เริ่มฝึกทันที</a>
    </div>

    <p class="disclaimer">
      โครงงานนี้พัฒนาเพื่อการศึกษาและการช่วยเหลือทางสังคม
    </p>
  </section>

  <!-- RIGHT -->
  <section class="auth-form">

    <div class="form-toggle">
  <button type="button" id="registerTab" class="active">
    สมัครสมาชิก
  </button>
  <button type="button" id="loginTab">
    เข้าสู่ระบบ
  </button>
</div>

    <div class="success-message" id="successMessage"></div>

    <!-- Register -->
    <form id="registerForm" class="form active">
      <h2>สมัครสมาชิก</h2>

      <label>
        <span>ชื่อผู้ใช้</span>
        <input type="text" name="displayName" required>
        <div class="error-message" id="regDisplayNameError"></div>
      </label>

      <label>
        <span>อีเมล</span>
        <input type="email" name="email" required>
        <div class="error-message" id="regEmailError"></div>
      </label>

      <label>
        <span>รหัสผ่าน</span>
        <input type="password" name="password" required>
        <div class="error-message" id="regPasswordError"></div>
      </label>

      <label>
        <span>ยืนยันรหัสผ่าน</span>
        <input type="password" name="confirm" required>
        <div class="error-message" id="regConfirmError"></div>
      </label>

      <button type="submit" class="btn primary" id="registerBtn">สมัครสมาชิก</button>
    </form>

    <!-- Login -->
    <form id="loginForm" class="form">
      <h2>เข้าสู่ระบบ</h2>

      <label>
        <span>อีเมล</span>
        <input type="email" name="email" required>
        <div class="error-message" id="loginEmailError"></div>
      </label>

      <label>
        <span>รหัสผ่าน</span>
        <input type="password" name="password" required>
        <div class="error-message" id="loginPasswordError"></div>
      </label>

      <button type="submit" class="btn primary" id="loginBtn">เข้าสู่ระบบ</button>
    </form>

  </section>

</main>

<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>

<!-- JS -->
<script src="../assets/js/login.js"></script>
<script src="../assets/js/progress.js"></script>
</body>
</html>