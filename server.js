const express = require('express');
const traineeRoutes = require('./routes/traineeRoutes')
const companyRoutes = require('./routes/companyRoutes')
const seasonRoutes = require('./routes/seasonRoutes')
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(traineeRoutes);
app.use(companyRoutes);
app.use(seasonRoutes);
app.use(userRoutes);
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})