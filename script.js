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
    "Just being you. There is no one else in the world like you.",
    "The way your laugh turns even the smallest moment into magic.",
    "How you always know exactly when I need a hug.",
    "The way you make ordinary days feel like the best days of my life.",
    "Your smile is my favorite thing to see in the morning.",
    "Every time I think of you, my heart feels warm and happy.",
    "How you make my heart race with just one look.",
    "The way you listen so deeply when I need to talk.",
    "Your bravery when you face difficult things.",
    "The way your voice sounds when you say my name.",
    "How you make my coffee taste better by simply being there.",
    "The way you turn quiet nights into unforgettable memories.",
    "How you cheer for me the moment I doubt myself.",
    "The way you remember the little things that matter most.",
    "Your laughter bubbling up from your soul.",
    "How you make me want to be a better version of myself every day.",
    "The way your hand fits perfectly in mine.",
    "Your thoughtful messages that arrive just when I need them.",
    "How you bring sunshine to even the rainiest days.",
    "The way you care so tenderly for the people you love.",
    "How your smile makes the whole room brighter.",
    "The way you dance like nobody is watching.",
    "How you believe in me when I forget to believe in myself.",
    "The way you make our favorite songs feel brand new.",
    "How your presence makes everything feel possible.",
    "The way your hugs make the world fall away.",
    "How you keep all of my secrets safe in your heart.",
    "The way you make comfort feel like home.",
    "How you make me laugh until my cheeks hurt.",
    "The way your eyes sparkle when you are excited.",
    "How you make every place we go together feel special.",
    "The way you say 'I love you' in so many different ways.",
    "How you make simple plans feel like adventures.",
    "The way your support makes hard days easier.",
    "How you give me strength without even trying.",
    "The way you remind me why love is worth everything.",
    "How you keep our bond strong with little surprises.",
    "The way you make me feel cherished and adored.",
    "How you never fail to brighten my darkest days.",
    "The way you are gentle with my heart.",
    "How you make the ordinary feel extraordinary.",
    "The way your kindness makes me believe in good again.",
    "How you make me feel fearless and loved.",
    "The way your eyes hold so much love when they meet mine.",
    "How you make every moment with you feel timeless.",
    "The way your touch calms every worry.",
    "How you make me feel understood without words.",
    "The way your laughter fills the air like music.",
    "How you make me feel like the luckiest person alive.",
    "The way your smile makes all my troubles disappear.",
    "How you make even the smallest gifts feel priceless.",
    "The way your sweetness makes my heart flutter.",
    "How you put so much love into everything you do.",
    "The way you make me feel seen and valued.",
    "How you make every day better just by being you.",
    "The way you are patient with me, always.",
    "How you make me feel safe to be myself.",
    "The way your hugs feel like the perfect shelter.",
    "How you light up the room without even trying.",
    "The way you make every goodbye too short.",
    "How you make every hello feel like coming home.",
    "The way you make ordinary moments feel magical.",
    "How you always find a way to make me smile.",
    "The way your love feels like a warm embrace.",
    "How you make my heart feel so full.",
    "The way you make me feel beautiful inside and out.",
    "How you make the future feel exciting and bright.",
    "The way your laughter makes me feel alive.",
    "How you hold me close even when it is hard.",
    "The way you make me feel proud to be with you.",
    "How you make every second together count.",
    "The way your eyes light up when you are happy.",
    "How you make our memories feel unforgettable.",
    "The way your touch is both gentle and electric.",
    "How you make me feel cherished every single day.",
    "The way you make ordinary words feel full of meaning.",
    "How you make my dreams feel closer than ever.",
    "The way you laugh at my silly jokes.",
    "How you support me in ways I don't even notice.",
    "The way you make me feel like the best version of myself.",
    "How you make me feel treasured and adored.",
    "The way your love feels endless.",
    "How you make my world brighter just by being there.",
    "The way your heart is kinder than anyone else's.",
    "How you make me feel calm and happy at the same time.",
    "The way your smile makes everything okay.",
    "How you make the smallest moments unforgettable.",
    "The way your love wraps around me like a soft blanket.",
    "How you make my days sweeter simply by being present.",
    "The way you bring out the best in me.",
    "How you make me feel like I belong.",
    "The way you make me feel hopeful about tomorrow.",
    "How you make my heart race in the best way.",
    "The way you make every laugh feel louder and better.",
    "How you make me feel special in your own quiet way.",
    "The way your love feels like a gentle breeze.",
    "How you make me feel like life is a beautiful story.",
    "The way you make the little things matter so much.",
    "How you make my heart feel at home.",
    "The way your tenderness makes everything better.",
    "How you make me feel like I'm enough.",
    "The way ordinary mornings feel blissful with you.",
    "How you bring calm to chaos with your presence.",
    "The way you make our memories shine brighter.",
    "How you make every day feel worth celebrating.",
    "The way you make me feel like I am your favorite.",
    "How you make my heart feel like it is smiling.",
    "The way you tell me I'm loved without saying a word.",
    "How you make me feel brave and cherished.",
    "The way your warmth makes my worries melt away.",
    "How you make me feel like I matter more than anything.",
    "The way ordinary routines feel special with you.",
    "How your love feels like a comforting hug.",
    "The way you make me feel calm and confident.",
    "How you make my world so much brighter.",
    "The way every second with you feels precious.",
    "How you make me feel loved in the sweetest possible way.",
    "The way you make me feel like I belong with you.",
    "How you make each day feel filled with possibility.",
    "The way your smile feels like a sunrise.",
    "How you make my heart feel full of joy.",
    "The way your love feels like the perfect home.",
    "How every thought of you feels warm.",
    "The way simple things feel extraordinary with you.",
    "How you make my path feel easier just by walking beside me.",
    "The way you make my life feel more beautiful.",
    "How you make every day feel like an adventure.",
    "The way your laughter lifts my spirits.",
    "How you make me feel seen, heard, and valued.",
    "The way your love feels gentle and fierce all at once.",
    "How you make my heart feel so peaceful.",
    "The way you make every second with you feel precious.",
    "How you make me feel loved even when I am quiet.",
    "The way you make the world feel kinder.",
    "How you make us feel like a perfect team.",
    "The way your care makes everything feel easier.",
    "How you make the ordinary feel like a gift.",
    "The way you make me feel treasured every day.",
    "How you make me feel safe to dream.",
    "The way your love feels endless and true.",
    "How you make my life better just by being in it.",
    "The way your voice makes me smile instantly.",
    "How you make my heart feel so full of love.",
    "The way our future feels bright and hopeful.",
    "How you make every day feel like a celebration.",
    "The way you make me feel like I can do anything.",
    "How you make me feel grounded and free.",
    "The way even small things feel wonderful with you.",
    "How you make me feel like the happiest person alive.",
    "The way your love gives me strength.",
    "How you make our shared moments unforgettable.",
    "The way your eyes shine when you are happy.",
    "How you make me feel like I've found home.",
    "The way you make everything feel more meaningful.",
    "How you make my heart beat faster in the best way.",
    "The way you make me feel calm in the middle of chaos.",
    "How simple smiles feel special with you.",
    "The way your love feels warm and comforting.",
    "How you make every day feel like a beautiful story.",
    "The way you make me feel excited for tomorrow.",
    "How you make me feel like I can conquer anything.",
    "The way you make me feel cherished even in silence.",
    "How you make me feel beautiful inside and out.",
    "The way your embrace makes everything better.",
    "How you make my heart feel so peaceful and happy.",
    "The way you make me feel understood without a word.",
    "How ordinary moments sparkle with you.",
    "The way you make me feel braver and softer.",
    "How you make my world feel full of light.",
    "The way every 'hello' with you feels like the best part of my day.",
    "How your love makes my heart feel like it is smiling.",
    "The way your love feels gentle yet powerful.",
    "How you make every day feel more meaningful.",
    "The way you make me feel happy just to be alive.",
    "How you make me feel like we were meant for each other.",
    "The way our quiet moments feel perfect.",
    "How you make me feel loved in the simplest ways.",
    "The way your kindness makes me feel at peace.",
    "How you make every day a little brighter.",
    "The way you make me feel like my heart is home.",
    "How you make the smallest gestures feel huge.",
    "The way you make my life sweeter by being mine.",
    "How you make me feel like love is always possible.",
    "The way you make me feel like the best version of myself.",
    "How you make every moment feel like a memory I want to keep.",
    "The way your love makes me feel alive.",
    "How you make me feel like I matter more than words.",
    "The way you make the future look beautiful.",
    "How you make even the hard days feel easier.",
    "The way your love feels like the most precious gift.",
    "How you make me feel truly and deeply loved."
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
const apiBase = window.location.origin;
const milestonesKey = 'anniversaryMilestones';
const defaultMilestones = [
    { date: 'June 30, 2026', event: 'Today ✨' },
    { date: 'March 16, 2027', event: 'Our Anniversary 🎊' }
];

async function apiRequest(path, options) {
    try {
        const response = await fetch(`${apiBase}${path}`, options);
        if (!response.ok) throw new Error('API request failed');
        return await response.json();
    } catch (error) {
        return null;
    }
}

function loadLocalMilestones() {
    const stored = localStorage.getItem(milestonesKey);
    return stored ? JSON.parse(stored) : [];
}

function saveLocalMilestones(milestones) {
    localStorage.setItem(milestonesKey, JSON.stringify(milestones));
}

async function loadMilestones() {
    const apiData = await apiRequest('/api/milestones');
    if (apiData && Array.isArray(apiData.milestones)) {
        return apiData.milestones;
    }
    return loadLocalMilestones();
}

async function addMilestone() {
    const dateInput = document.getElementById('milestoneDateInput');
    const descInput = document.getElementById('milestoneDescInput');
    const dateValue = dateInput.value.trim();
    const descValue = descInput.value.trim();

    if (!dateValue || !descValue) {
        alert('Please enter both a date and a description for your milestone.');
        return;
    }

    const milestone = {
        id: Date.now(),
        date: dateValue,
        event: descValue
    };

    const apiResult = await apiRequest('/api/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(milestone)
    });

    if (!apiResult) {
        const existing = loadLocalMilestones();
        existing.push(milestone);
        saveLocalMilestones(existing);
    }

    dateInput.value = '';
    descInput.value = '';
    await displayMilestones();
}

async function displayMilestones() {
    const milestones = await loadMilestones();
    const container = document.getElementById('milestones-list');
    if (!container) return;

    container.innerHTML = '';

    defaultMilestones.forEach(item => {
        const defaultItem = document.createElement('div');
        defaultItem.className = 'milestone-item';
        defaultItem.innerHTML = `
            <span class="milestone-date">${item.date}</span>
            <span class="milestone-event">${item.event}</span>
        `;
        container.appendChild(defaultItem);
    });

    milestones.forEach((milestone) => {
        const item = document.createElement('div');
        item.className = 'milestone-item';
        item.innerHTML = `
            <span class="milestone-date">${milestone.date}</span>
            <span class="milestone-event">${milestone.event}</span>
            <span style="cursor: pointer; color: #ff4d6d; margin-left: auto;" onclick="removeMilestone(${milestone.id})">✕ Remove</span>
        `;
        container.appendChild(item);
    });
}

async function removeMilestone(id) {
    const apiResult = await apiRequest(`/api/milestones/${id}`, { method: 'DELETE' });
    if (!apiResult) {
        const milestones = loadLocalMilestones();
        const updated = milestones.filter(m => m.id !== id);
        saveLocalMilestones(updated);
    }
    await displayMilestones();
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

function initializeDefaultMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;

    const unlockAudio = () => {
        audio.play().catch(() => {
            // keep silent if autoplay is still blocked
        });
    };

    document.body.addEventListener('click', unlockAudio, { once: true });
    document.body.addEventListener('touchstart', unlockAudio, { once: true });

    audio.play().catch(() => {
        // autoplay blocked, will try again on first interaction
    });
}

initializeReminder();
initializeDefaultMusic();


