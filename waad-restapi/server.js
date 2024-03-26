require('dotenv').config();
 const express = require('express');
 const app = express();
 const routes = require('./routes');
 app.use(express.json());
 app.use('/api', routes);
 app.use(express.static('app'));
 app.listen(process.env.PORT, () => {
     console.log(`server on port ${process.env.PORT}`)
});