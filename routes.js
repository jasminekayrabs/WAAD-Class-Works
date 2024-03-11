const model = require('./model');
 const router = require('express').Router();
 router.get('/users', async (req, res) => {
     try {
         const users = await model.getUsers();
         res.json(users);
     } catch (e) {
         console.error(e);
         res.status(400).end();
     }
 });
 module.exports = router;