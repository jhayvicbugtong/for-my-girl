// Loads the daily inspirational paragraphs from messages.txt.
// To edit the messages, edit messages.txt: one paragraph per block,
// with a blank line between paragraphs.

const fs = require('fs');
const path = require('path');

const paragraphs = fs
    .readFileSync(path.join(__dirname, 'messages.txt'), 'utf8')
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

// Picks a paragraph based on the day, so each one is used once before repeating.
function getDailyParagraph(date = new Date()) {
    const dayNumber = Math.floor(date.getTime() / 86400000);
    return paragraphs[dayNumber % paragraphs.length];
}

module.exports = { paragraphs, getDailyParagraph };
