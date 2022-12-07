const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companyController')

router.get('/getallcompany',  companyController.getAllCompany)

module.exports = router;