const express = require('express');
const router = express.Router();

const traineeController = require('../controllers/traineeController')

router.get('/getalltrainee',  traineeController.getAllTrainee)
router.post('/searchtrainee',  traineeController.searchTrainee)
router.post('/gettraineedetail',  traineeController.getTraineeDetail)
router.post('/createtrainee',  traineeController.createTrainee)
router.post('/gettraineeresult',  traineeController.getTraineeResult)

module.exports = router;