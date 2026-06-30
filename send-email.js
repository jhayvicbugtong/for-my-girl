const emailjs = require('@emailjs/nodejs');

// Initialize EmailJS with private key (backend auth)
emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

// Array of reasons (same as in your website)
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

// Pick a random reason
const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

// Format date nicely
const now = new Date();
const formattedDate = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
});

// Send email via EmailJS
emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    {
        to_email: process.env.RECIPIENT_EMAIL,
        reason: randomReason,
        date: formattedDate
    }
).then(response => {
    console.log('✅ Daily email sent successfully!');
    console.log('📧 To:', process.env.RECIPIENT_EMAIL);
    console.log('💝 Reason:', randomReason);
    console.log('📅 Date:', formattedDate);
    process.exit(0);
}).catch(err => {
    console.error('❌ Failed to send email:', err);
    process.exit(1);
});
