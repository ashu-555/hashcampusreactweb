
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const profileCtrls = require("../controllers/profileCtrl");

  

// post Routing Api,,,,
router.post('/',profileCtrls.registerprofile)

// get Books Routing Api,,,
router.get('/', profileCtrls.getprofile)

// get by id Routing Api,,,
router.get("/:profileId", profileCtrls.selectprofile)

// patch Routing Api,,,
router.patch("/:profileId", profileCtrls.updateprofile)

// delete Routing Api,,,
router.delete("/:profileId", profileCtrls.deleteprofile)




module.exports = router;