const express = require('express');
const router = express.Router();

const seasonController = require('../controllers/seasonController')

router.get('/getallseason',  seasonController.getAllSeason)

module.exports = router;