require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cron = require('cron');
const emailjs = require('@emailjs/nodejs');

const app = express();
const dbPath = path.join(__dirname, 'milestones.db');
const PORT = process.env.PORT || 3000;

const requiredEnv = [
    'EMAILJS_PUBLIC_KEY',
    'EMAILJS_PRIVATE_KEY',
    'EMAILJS_SERVICE_ID',
    'EMAILJS_TEMPLATE_ID',
    'RECIPIENT_EMAIL'
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);
const emailConfigured = missingEnv.length === 0;
if (!emailConfigured) {
    console.warn('Warning: Missing email environment variables:', missingEnv.join(', '));
    console.warn('Email sending and scheduled jobs will be disabled until environment variables are provided.');
}

const emailReasons = [
    'The way your eyes look when you smile at me.',
    'How you always make sure I got home safe.',
    'Your incredible laugh that instantly brightens up my whole day.',
    'How passionate and dedicated you are when working towards your goals.',
    'The way you make me feel like I can do anything.',
    'How you make the ordinary feel unforgettable.',
    'How you make even the simplest moments feel magical.'
];

if (emailConfigured) {
    try {
        emailjs.init({
            publicKey: process.env.EMAILJS_PUBLIC_KEY,
            privateKey: process.env.EMAILJS_PRIVATE_KEY,
        });
    } catch (err) {
        console.error('Failed to initialize EmailJS:', err);
    }
}

function getRandomReason() {
    return emailReasons[Math.floor(Math.random() * emailReasons.length)];
}

async function sendLoveEmail() {
    if (!emailConfigured) {
        throw new Error('Email service not configured');
    }

    const randomReason = getRandomReason();
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
            to_email: process.env.RECIPIENT_EMAIL,
            reason: randomReason,
            date: formattedDate
        }
    );
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to open database:', err);
        process.exit(1);
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS milestones (
        id INTEGER PRIMARY KEY,
        date TEXT,
        event TEXT
    )`);
});

app.get('/api/milestones', (req, res) => {
    db.all('SELECT id, date, event FROM milestones ORDER BY id DESC', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Unable to load milestones' });
        res.json({ milestones: rows });
    });
});

app.post('/api/milestones', (req, res) => {
    const { id, date, event } = req.body;
    if (!date || !event) {
        return res.status(400).json({ error: 'Date and event are required' });
    }

    db.run(
        'INSERT INTO milestones (date, event) VALUES (?, ?)',
        [date, event],
        function (err) {
            if (err) return res.status(500).json({ error: 'Unable to save milestone' });
            res.json({ id: this.lastID, date, event });
        }
    );
});

app.delete('/api/milestones/:id', (req, res) => {
    const milestoneId = Number(req.params.id);
    db.run('DELETE FROM milestones WHERE id = ?', milestoneId, function (err) {
        if (err) return res.status(500).json({ error: 'Unable to remove milestone' });
        if (this.changes === 0) return res.status(404).json({ error: 'Milestone not found' });
        res.json({ success: true });
    });
});

app.get('/api/send-email', async (req, res) => {
    if (!emailConfigured) {
        return res.status(503).json({ error: 'Email service not configured on server' });
    }

    try {
        await sendLoveEmail();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Failed to send email' });
    }
});

const emailCronSchedule = process.env.EMAIL_SEND_CRON || '0 8 * * *';
if (emailConfigured) {
    try {
        const emailJob = new cron.CronJob(emailCronSchedule, async () => {
            try {
                await sendLoveEmail();
                console.log('Scheduled email sent successfully.');
            } catch (error) {
                console.error('Scheduled email failed:', error);
            }
        });

        emailJob.start();
        console.log('Email scheduler started with cron:', emailCronSchedule);
    } catch (err) {
        console.error('Failed to start email scheduler:', err);
    }
} else {
    console.log('Email scheduler disabled because email config is missing.');
}

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Scheduled email cron: ${emailCronSchedule}`);
});