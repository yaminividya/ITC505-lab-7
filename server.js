const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// POST route handler for form submission
server.post('/submit', (req, res) => {
    const { adjective, noun, verb, adverb, noun2 } = req.body;
    if (!adjective || !noun || !verb || !adverb || !noun2) {
        res.send(`
          <h1>Submission Failed</h1>
          <p>Please fill out ALL fields</p>
          <a href="/">Go Back to Form</a>
        `);
        return;
    }
    const madLib = `The ${adjective} ${noun} ${verb} ${adverb} to the ${noun2}.`;
    res.send(`
      <h1>Submission Successful</h1>
      <p>${madLib}</p>
      <a href="index.html">Go Back to Form</a>
    `);
});

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));
