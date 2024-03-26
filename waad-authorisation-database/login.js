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
module.exports = router;
