const router = require('express').Router();
 router.get('/hello', (req, res) => {
    //  res.json(["Hello!", req.user]);
    res.json({ message: `Hello ${req.user.username}` });
 });
 module.exports = router;