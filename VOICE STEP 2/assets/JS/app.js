
// Level data structure matching requirements
const levels = [
{
id: 1,
title: “เสียงพื้นฐาน”,
description: “ฝึกออกเสียงพยัญชนะและสระ”,
totalLessons: 10
},
{
id: 2,
title: “คำและประโยคสั้น”,
description: “ฝึกพูดคำศัพท์และประโยคง่ายๆ”,
totalLessons: 15
},
{
id: 3,
title: “การสื่อสารในชีวิตจริง”,
description: “ฝึกสนทนาและสื่อสารจริง”,
totalLessons: 20
}
];

// Get username from localStorage
function getUserName() {
const username = localStorage.getItem(‘username’);
const displayElement = document.getElementById(‘displayUsername’);
if (username) {
displayElement.textContent = `คุณ${username}`;
} else {
displayElement.textContent = ‘’;
}
}

// Initialize progress data
function initializeProgress() {
if (!localStorage.getItem(‘levelProgress’)) {
const initialProgress = {
level1: { completed: 0, total: 10, unlocked: true },
level2: { completed: 0, total: 15, unlocked: false },
level3: { completed: 0, total: 20, unlocked: false }
};
localStorage.setItem(‘levelProgress’, JSON.stringify(initialProgress));
}
}

// Get progress data
function getProgress() {
return JSON.parse(localStorage.getItem(‘levelProgress’));
}

// Calculate total completed lessons
function getTotalCompleted() {
const progress = getProgress();
return progress.level1.completed + progress.level2.completed + progress.level3.completed;
}

// Render level cards
function renderLevelCards() {
const container = document.getElementById(‘levelsContainer’);
const progress = getProgress();

```
container.innerHTML = '';

levels.forEach((level) => {
    const levelKey = `level${level.id}`;
    const levelProgress = progress[levelKey];
    const isLocked = !levelProgress.unlocked;
    const isCompleted = levelProgress.completed === levelProgress.total;
    const isInProgress = levelProgress.completed > 0 && !isCompleted;
    
    const card = document.createElement('div');
    card.className = 'level-card';
    
    // Generate circles based on progress
    let circlesHTML = '';
    const totalCircles = 5; // Display 5 circles per level
    const completedCircles = Math.floor((levelProgress.completed / levelProgress.total) * totalCircles);
    
    for (let i = 0; i < totalCircles; i++) {
        let circleClass = 'circle locked';
        let checkmark = '';
        
        if (isLocked) {
            circleClass = 'circle locked';
        } else if (i < completedCircles) {
            circleClass = i % 2 === 0 ? 'circle completed' : 'circle completed-light';
            checkmark = '<span class="checkmark">✓</span>';
        } else if (i === completedCircles && !isCompleted) {
            circleClass = isInProgress && completedCircles === totalCircles - 1 ? 'circle current-highlight' : 'circle current';
            checkmark = isInProgress && completedCircles === totalCircles - 1 ? '<span class="checkmark">✓</span>' : '';
        }
        
        circlesHTML += `<div class="${circleClass}">${checkmark}</div>`;
    }
    
    // Determine button text and class
    let buttonClass = 'action-button locked-button';
    let buttonText = 'ร้านเกม 🔒';
    let buttonAction = 'showLockedMessage()';
    
    if (!isLocked) {
        if (isCompleted) {
            buttonClass = 'action-button continue-button';
            buttonText = 'ถอดแมยอ่า';
            buttonAction = `goToPractice(${level.id})`;
        } else if (isInProgress) {
            buttonClass = 'action-button continue-button';
            buttonText = 'ถอดแมยอ่า';
            buttonAction = `goToPractice(${level.id})`;
        } else {
            buttonClass = 'action-button start-button';
            buttonText = 'ร้านเกม';
            buttonAction = `goToPractice(${level.id})`;
        }
    }
    
    const statusText = isCompleted ? 'ดางจังคิม' : '';
    
    card.innerHTML = `
        <div class="level-title">${level.title}</div>
        <div class="circles-container">
            ${circlesHTML}
        </div>
        <div class="status-text">${statusText}</div>
        <button class="${buttonClass}" onclick="${buttonAction}">
            ${buttonText}
        </button>
    `;
    
    container.appendChild(card);
});
```

}

// Render bar chart
function renderBarChart() {
const progress = getProgress();
const chartContainer = document.getElementById(‘barChart’);
chartContainer.innerHTML = ‘’;

```
// Create bar pairs for each level
levels.forEach((level, index) => {
    const levelKey = `level${level.id}`;
    const levelProgress = progress[levelKey];
    const percentage = (levelProgress.completed / levelProgress.total) * 100;
    
    // Completed bar (navy)
    const barGroup1 = document.createElement('div');
    barGroup1.className = 'bar-group';
    barGroup1.innerHTML = `<div class="bar navy" style="height: ${percentage}%;"></div>`;
    chartContainer.appendChild(barGroup1);
    
    // Total bar (teal) - slightly shorter for visual effect
    const barGroup2 = document.createElement('div');
    barGroup2.className = 'bar-group';
    barGroup2.innerHTML = `<div class="bar teal" style="height: ${percentage * 0.85}%;"></div>`;
    chartContainer.appendChild(barGroup2);
});
```

}

// Update progress summary
function updateProgressSummary() {
const totalCompleted = getTotalCompleted();
const summaryElement = document.getElementById(‘progressSummary’);
summaryElement.textContent = `รังผ่านที่นทุนโพศีคนไล่ช่: ${totalCompleted} ท่าอพ`;
}

// Show locked message
function showLockedMessage() {
alert(‘กรุณาผ่านด่านก่อนหน้าก่อนเพื่อปลดล็อกด่านนี้’);
}

// Go to practice page
function goToPractice(levelId) {
const progress = getProgress();
const levelKey = `level${levelId}`;

```
if (!progress[levelKey].unlocked) {
    showLockedMessage();
    return;
}

localStorage.setItem('currentLevel', levelId);
window.location.href = 'practice.html';
```

}

// View details
function viewDetails() {
alert(‘กำลังพัฒนาหน้ารายละเอียดความก้าวหน้า’);
}

// Initialize on page load
window.addEventListener(‘DOMContentLoaded’, () => {
getUserName();
initializeProgress();
renderLevelCards();
renderBarChart();
updateProgressSummary();
});

// Update progress (example function - call after completing lessons)
function updateLevelProgress(levelId, completed) {
const progress = getProgress();
const levelKey = `level${levelId}`;

```
progress[levelKey].completed = completed;

// Unlock next level if current is completed
if (completed >= progress[levelKey].total && levelId < 3) {
    const nextLevelKey = `level${levelId + 1}`;
    progress[nextLevelKey].unlocked = true;
}

localStorage.setItem('levelProgress', JSON.stringify(progress));

// Re-render
renderLevelCards();
renderBarChart();
updateProgressSummary();
```

}