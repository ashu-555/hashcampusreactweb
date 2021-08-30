
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const booksCtrls = require("../controllers/booksCtrl");
const path = require('path'); 
const uuidv4 = require('uuidv4');

const upload = multer({ dest: 'uploadVideo/' })

//file storade setting,,,,,,,,,,,,,,,,,,
// const fileStorage = multer.s3({
//   destination: (req, file, cb) => {       
//     if (file.fieldname === "epdf") { 
//       cb(null, 'uploadE-pdf');
//     } else if(file.fieldname === "audiobooks") {
//       cb( null ,'uploadAudio')
//     } else if(file.fieldname === "video") {
//       cb( null ,'uploadVideo')
//      }else{ 
//       cb(null, 'upload3D-video');
//     }
//     },
//     filename: function (request, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   },
// });

// file filter,,,,,,,,,,,,,,,,,,,,,,,, 
// const fileFilter = (req, file, cb) => {
//   // console.log(file) 
//   if (file.fieldname === "epdf") { 
//     if (
//       file.mimetype === 'application/pdf' ||
//       file.mimetype === 'application/msword' ||
//       file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     ) { 
//       cb(null, true);
//     } else {
//       cb(null, false); 
//     }
//   }else   if (file.fieldname === "audiobooks") { 
//     if (
//       file.mimetype === 'audio/mpeg' ) { 
//       cb(null, true);
//     } else {
//       cb(null, false); 
//     }
//   }else   if (file.fieldname === "video") { 
//     if (
//       file.mimetype === 'video/x-matroska'||  file.mimetype === 'video/mp4' ) { 
//       cb(null, true);
//     } else {
//       cb(null, false); 
//     }
  
//   } else {
//     if (
//       file.mimetype === 'video/x-matroska' || file.mimetype === 'video/mp4' ) { 
//       cb(null, true);
//     }else {
//       cb(null, false);
//     }
//   }
// };


// //multer upload setup,,,,,,
// const uploads =  multer(
//   { 
//     storage: fileStorage, 
  
//     fileFilter: fileFilter 
//   }
// )



// post Routing Api................................................
// router.post('/', uploads.fields(
//   [ { 
//     name: 'epdf', 
//     maxCount: 1 
//   },
//     { 
//       name: 'audiobooks', 
//       maxCount: 1 
//     },
//     { 
//       name: 'video', 
//       maxCount: 1 
//     }, 
//     { 
//       name: 'viewer3D', 
//       maxCount: 1 
//     }
//   ]
// ),booksCtrls.register)

router.post('/', upload.single('video'),booksCtrls.register)
// get Books Routing Api......................................
router.get('/', booksCtrls.getbooks)


// get by booksid Routing Api................................
router.get("/:booksId", booksCtrls.selectbook)

// patch Routing Api...........................................
router.patch("/:booksId", booksCtrls.updatebooks)

// delete Routing Api........................................
router.delete("/:booksId", booksCtrls.deletebooks)




module.exports = router;