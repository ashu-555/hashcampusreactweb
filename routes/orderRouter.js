
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const ordersCtrls = require("../controllers/orderCtrl");

  

// post Routing Api,,,,
router.post('/',ordersCtrls.orderpost)

// get Books Routing Api,,,
router.get('/', ordersCtrls.getorder)






module.exports = router;