/********************************************************************
******************** v1.js file (inside routes/apis) ****************
********************************************************************/

const apiController = require('../../controllers/apis/controller');

const express = require('express');

let router = express.Router();

router.use('/controller', apiController);

module.exports = router;