//
require('dotenv').config();
const express = require('express');
const db = require('./db');
const jwt = require("jsonwebtoken");
const router = express.Router();

function makeToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '12h' });
}
// router.post('/', (req, res) => {
//     if (req.body.username === 'bonobo' && req.body.password === 'secret'){
//         res.json({ token: makeToken({ username: req.body.username }) });
//     } else {
//         res.status(401).end();
//     }
// });
// router.post('/login', (req, res) => {
//     if (req.body.username === 'bonobo' && req.body.password === 'secret') {
//         res.json({ token: makeToken({ username: req.body.username }) });
//     } else {
//         res.status(401).end();
//     }
// });

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Query the database for the user by username
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];
        
        if (user && password === user.password) {
            // Passwords match (using plain text comparison here)
            const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '12h' });
            res.json({ token });
        } else {
            // User not found or password does not match
            res.status(401).send('Username or password is incorrect');
        }
    } catch (error) {
        console.error('Login error', error);
        res.status(500).end();
    }
});
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        // Insert the new user into the database
        const result = await db.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;',
            [username, password]
        );
        const newUser = result.rows[0];

        // Respond with the newly created user
        res.status(201).json({ id: newUser.id, username: newUser.username });
    } catch (error) {
        console.error(error);
        // Handle potential errors, such as username uniqueness constraint violation
        if (error.code === '23505') { // Unique violation
            return res.status(409).json({ error: "Username already exists." });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
