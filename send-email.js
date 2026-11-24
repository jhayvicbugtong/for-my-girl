require('dotenv').config();
const emailjs = require('@emailjs/nodejs');

const { getDailyParagraph } = require("./messages");

function formatDate(date = new Date()) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

const requiredEnv = [
    'EMAILJS_PUBLIC_KEY',
    'EMAILJS_PRIVATE_KEY',
    'EMAILJS_SERVICE_ID',
    'EMAILJS_TEMPLATE_ID',
    'RECIPIENT_EMAIL'
];

const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
    console.error('Missing required environment variables:', missing.join(', '));
    console.error('Create a .env file or set them in your terminal before running the sender.');
    process.exit(1);
}

emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

const randomReason = getDailyParagraph();
const formattedDate = formatDate();

emailjs.send(
    process.env.EMAILJS_SERVICE_ID,
    process.env.EMAILJS_TEMPLATE_ID,
    {
        to_email: process.env.RECIPIENT_EMAIL,
        subject: 'A sweet little love note for you 💌',
        greeting: 'Hi my love,',
        message: `Good morning, my love.\n\nI hope this note brightens your day and reminds you how cherished you are. Today’s reason: ${randomReason}\n\nSending you all my love.`,
        reason: randomReason,
        date: formattedDate,
        closing: 'Forever yours,',
        signature: 'Your ❤️'
    }
)
    .then(() => {
        console.log('✅ Daily email sent successfully!');
        console.log('📧 To:', process.env.RECIPIENT_EMAIL);
        console.log('💝 Message:', randomReason);
        console.log('📅 Date:', formattedDate);
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Failed to send email:', err);
        process.exit(1);
    });
