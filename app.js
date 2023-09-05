const express = require('express');
const dotenv = require('dotenv').config();// Load dotenv separately
const path = require('path');
require('colors');
const app = express();
const port = process.env.PORT || 9000;

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the correct path for the route
app.use("/openai", require('./routes/openRoute')); // Corrected route path

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`.bgGreen.black);
});
