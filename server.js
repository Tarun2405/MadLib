const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files from the "public" directory
const publicPath = path.join(__dirname, 'public');
server.use(express.static(publicPath));

// POST route for Mad Lib
server.post('/ITC505/lab-7/submit', (req, res) => {
    const { adjective, noun, verb, adverb, pluralNoun } = req.body;

    // Validate inputs
    if (!adjective || !noun || !verb || !adverb || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    // Mad Lib story
    const madLib = `
        Once upon a time, there was a very ${adjective} ${noun} who loved to ${verb} ${adverb}.
        They had a group of ${pluralNoun} that always joined them on their adventures.
    `;

    res.send(`
        <h1>Your Mad Lib Story</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Create Another Mad Lib</a>
    `);
});

// Start the server
let port = 8080;
if (process.argv[2] !== 'local') {
    port = 80;
}
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
