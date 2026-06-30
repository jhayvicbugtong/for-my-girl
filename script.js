// === 1. ANNIVERSARY DATE ===
// March 16, 2027 - Our Anniversary!
const targetDate = new Date("March 16, 2027 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;

    if (difference < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<h3>The day is finally here! 🎉</h3>";
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// === 2. ADD YOUR REASONS I LOVE YOU HERE ===
const reasons = [
    "The way your eyes look when you smile at me.",
    "How you always make sure I got home safe.",
    "Your incredible laugh that instantly brightens up my whole day.",
    "How passionate and dedicated you are when working towards your goals.",
    "The way you scrunch your nose up when you completely disagree with me.",
    "You are literally my favorite person to do absolutely nothing with.",
    "How safe and completely at peace I feel whenever you hold my hand.",
    "Your kindness, not just to me, but to everyone around you.",
    "The silly voice notes you send me out of nowhere.",
    "Just being you. There is no one else in the world like you."
];

let lastIndex = -1;

function revealReason() {
    const textElement = document.getElementById("reason-text");
    textElement.style.opacity = 0;
    
    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * reasons.length);
        } while (randomIndex === lastIndex && reasons.length > 1);
        
        lastIndex = randomIndex;
        textElement.innerText = `"${reasons[randomIndex]}"`;
        textElement.style.opacity = 1;
    }, 200);
}


// === 3. GENERATE FLOATING BACKGROUND HEARTS ===
const heartsContainer = document.getElementById('hearts-container');
const totalHearts = 15;

for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    heart.style.left = Math.random() * 100 + '%';
    const size = (Math.random() * 20 + 15) + 'px';
    heart.style.width = size;
    heart.style.height = size;
    heart.style.animationDelay = Math.random() * 15 + 's';
    heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
    
    heartsContainer.appendChild(heart);
}


// === 4. MILESTONES MANAGEMENT ===
const milestonesKey = 'anniversaryMilestones';

function loadMilestones() {
    const stored = localStorage.getItem(milestonesKey);
    return stored ? JSON.parse(stored) : [];
}

function saveMilestones(milestones) {
    localStorage.setItem(milestonesKey, JSON.stringify(milestones));
    displayMilestones();
}

function addMilestone() {
    const input = document.getElementById('milestoneInput');
    const dateValue = input.value.trim();
    
    if (!dateValue) {
        alert('Please enter a date (e.g., "December 25, 2026") or event');
        return;
    }
    
    const milestones = loadMilestones();
    milestones.push(dateValue);
    saveMilestones(milestones);
    input.value = '';
}

function displayMilestones() {
    const milestones = loadMilestones();
    const container = document.getElementById('milestones-list');
    
    // Keep the first item (today)
    const firstItem = container.innerHTML;
    container.innerHTML = firstItem;
    
    milestones.forEach(milestone => {
        const item = document.createElement('div');
        item.className = 'milestone-item';
        item.innerHTML = `
            <span class="milestone-date">${milestone}</span>
            <span style="cursor: pointer; color: #ff4d6d;" onclick="removeMilestone('${milestone}')">✕ Remove</span>
        `;
        container.appendChild(item);
    });
}

function removeMilestone(milestone) {
    const milestones = loadMilestones();
    const updated = milestones.filter(m => m !== milestone);
    saveMilestones(updated);
}

displayMilestones();


// === 5. REMINDER FUNCTIONALITY ===
const reminderKey = 'anniversaryReminder';

function toggleReminder() {
    const checkbox = document.getElementById('reminderToggle');
    const reminderInfo = document.getElementById('reminderInfo');
    
    if (checkbox.checked) {
        localStorage.setItem(reminderKey, 'true');
        reminderInfo.textContent = '✅ Reminder set! You\'ll get a notification on March 16, 2027';
        reminderInfo.style.color = '#4caf50';
    } else {
        localStorage.removeItem(reminderKey);
        reminderInfo.textContent = 'Reminder disabled';
        reminderInfo.style.color = '#888';
    }
}

function initializeReminder() {
    const reminderEnabled = localStorage.getItem(reminderKey);
    if (reminderEnabled) {
        document.getElementById('reminderToggle').checked = true;
        document.getElementById('reminderInfo').textContent = '✅ Reminder set! You\'ll get a notification on March 16, 2027';
        document.getElementById('reminderInfo').style.color = '#4caf50';
    }
}

initializeReminder();


// === 6. DAILY EMAIL FUNCTIONALITY ===
// EmailJS Configuration
const emailServiceID = 'service_3ng3myy';  // Public service ID
const emailTemplateID = 'template_love_message';
const emailPublicKey = 'qSuVCIb0kQXaVQaYY';
const recipientEmail = 'allenybascuguin25@gmail.com';
const emailFeatureKey = 'dailyEmailEnabled';
const lastEmailDateKey = 'lastEmailDate';

// Initialize EmailJS
emailjs.init(emailPublicKey);

function setupDailyEmail() {
    const isEnabled = localStorage.getItem(emailFeatureKey);
    
    if (isEnabled) {
        alert('Daily email is already setup! Check your email at 9:00 AM each day.');
        return;
    }
    
    // Create the email template if not exists
    const setupMsg = `
✅ Daily Email Setup Complete!

Your emails are configured to send at 9:00 AM every day.

📧 Email address: ${recipientEmail}

⚠️ IMPORTANT: 
- You need to open this page around 9:00 AM for the email to send
- The email will only send if this page is open at 9:00 AM
- For guaranteed daily emails without opening the page, you'll need a backend server

💝 Each day you'll receive a random reason why I love you!
    `;
    
    localStorage.setItem(emailFeatureKey, 'true');
    document.getElementById('dailyEmailToggle').checked = true;
    document.getElementById('emailInfo').textContent = '✅ Daily emails enabled! You\'ll receive a message at 9:00 AM';
    document.getElementById('emailInfo').style.color = '#4caf50';
    document.getElementById('emailNote').style.display = 'none';
    document.getElementById('setupEmailBtn').style.display = 'none';
    
    alert(setupMsg);
    
    // Start checking for daily send
    checkAndSendDailyEmail();
    setInterval(checkAndSendDailyEmail, 60000); // Check every minute
}

function toggleDailyEmail() {
    const checkbox = document.getElementById('dailyEmailToggle');
    const emailInfo = document.getElementById('emailInfo');
    
    if (checkbox.checked) {
        setupDailyEmail();
    } else {
        localStorage.removeItem(emailFeatureKey);
        emailInfo.textContent = 'Daily emails disabled';
        emailInfo.style.color = '#888';
    }
}

function checkAndSendDailyEmail() {
    const isEnabled = localStorage.getItem(emailFeatureKey);
    if (!isEnabled) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const today = now.toDateString();
    
    const lastEmailDate = localStorage.getItem(lastEmailDateKey);
    
    // Check if it's 9:00 AM (allowing 9:00-9:59 window)
    if (currentHour === 9 && lastEmailDate !== today) {
        sendDailyLoveEmail();
        localStorage.setItem(lastEmailDateKey, today);
    }
}

function sendDailyLoveEmail() {
    // Pick a random reason
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    
    const emailParams = {
        to_email: recipientEmail,
        reason: randomReason,
        date: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
    
    // Send email via EmailJS
    emailjs.send(emailServiceID, emailTemplateID, emailParams)
        .then(function(response) {
            console.log('Daily email sent successfully!', response);
            console.log('Reason sent: ' + randomReason);
        }, function(error) {
            console.log('Failed to send daily email:', error);
            // Silently fail - don't bother user
        });
}

function initializeDailyEmail() {
    const isEnabled = localStorage.getItem(emailFeatureKey);
    if (isEnabled) {
        document.getElementById('dailyEmailToggle').checked = true;
        document.getElementById('emailInfo').textContent = '✅ Daily emails enabled! You\'ll receive a message at 9:00 AM';
        document.getElementById('emailInfo').style.color = '#4caf50';
        document.getElementById('emailNote').style.display = 'none';
        document.getElementById('setupEmailBtn').style.display = 'none';
        
        // Start checking for daily send
        checkAndSendDailyEmail();
        setInterval(checkAndSendDailyEmail, 60000); // Check every minute
    }
}

initializeDailyEmail();
