require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

function safeRequire(name) {
    try {
        return require(name);
    } catch (err) {
        console.warn(`Optional module "${name}" not available: ${err.message}`);
        return null;
    }
}

const sqlite3Module = safeRequire('sqlite3');
const sqlite3 = sqlite3Module ? sqlite3Module.verbose() : null;
const cron = safeRequire('cron');
const emailjs = safeRequire('@emailjs/nodejs');

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
const emailConfigured = missingEnv.length === 0 && !!emailjs;
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

let db = null;
let inMemoryStore = { milestones: [], nextId: 1 };

if (sqlite3) {
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Failed to open file database:', err);
            console.warn('Falling back to in-memory SQLite database. Milestones will not persist across restarts.');
            db = new sqlite3.Database(':memory:', (memErr) => {
                if (memErr) {
                    console.error('Failed to create in-memory database:', memErr);
                }
            });
        }
    });

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS milestones (
            id INTEGER PRIMARY KEY,
            date TEXT,
            event TEXT
        )`);
    });
} else {
    console.warn('sqlite3 not available — using in-memory milestones store. Data will not persist across restarts.');
}

app.get('/api/milestones', (req, res) => {
    if (db) {
        db.all('SELECT id, date, event FROM milestones ORDER BY id DESC', (err, rows) => {
            if (err) return res.status(500).json({ error: 'Unable to load milestones' });
            res.json({ milestones: rows });
        });
    } else {
        // return in-memory milestones (most recent first)
        const list = [...inMemoryStore.milestones].reverse();
        res.json({ milestones: list });
    }
});

app.post('/api/milestones', (req, res) => {
    const { id, date, event } = req.body;
    if (!date || !event) {
        return res.status(400).json({ error: 'Date and event are required' });
    }

    if (db) {
        db.run(
            'INSERT INTO milestones (date, event) VALUES (?, ?)',
            [date, event],
            function (err) {
                if (err) return res.status(500).json({ error: 'Unable to save milestone' });
                res.json({ id: this.lastID, date, event });
            }
        );
    } else {
        const newItem = { id: inMemoryStore.nextId++, date, event };
        inMemoryStore.milestones.push(newItem);
        res.json(newItem);
    }
});

app.delete('/api/milestones/:id', (req, res) => {
    const milestoneId = Number(req.params.id);
    if (db) {
        db.run('DELETE FROM milestones WHERE id = ?', milestoneId, function (err) {
            if (err) return res.status(500).json({ error: 'Unable to remove milestone' });
            if (this.changes === 0) return res.status(404).json({ error: 'Milestone not found' });
            res.json({ success: true });
        });
    } else {
        const idx = inMemoryStore.milestones.findIndex(m => m.id === milestoneId);
        if (idx === -1) return res.status(404).json({ error: 'Milestone not found' });
        inMemoryStore.milestones.splice(idx, 1);
        res.json({ success: true });
    }
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
if (emailConfigured && cron) {
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
    if (!emailConfigured) console.log('Email scheduler disabled because email config is missing.');
    else console.log('Email scheduler disabled because cron module is unavailable.');
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