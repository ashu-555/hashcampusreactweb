const Profile = require ('../models/profileModel');
const mongoose = require('mongoose');



const profileCtrls = {

  // post Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  registerprofile:(req, res,  next) =>{
    const profile = new Profile({
      _id: mongoose.Schema.Types.ObjectId,
      name: req.body.name,
      email : req.body.email,
      mobileNumber :req.body.mobileNumber,
      age : req.body.age,
      dateofbirth : req.body.dateofbirth, 
      schoolName : req.body.schoolName,
      classAndSection : req.body.classAndSection,
      schloolRollnumber : req.body.schloolRollnumber
    });
      //  console.log("ata--->"+JSON.stringify(books))
      profile.save()
      .then(result => {
      res.status(201).json({
        message: "Created user profile successfully",
        }); 
        }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
          });
        });
      },


  // get all Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  getprofile: (req, res, next) => {
      Profile.find()
      .select("name email mobileNumber age dateofbirth schoolName classAndSection schloolRollnumber ")
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            profile: docs
          };
        res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
         });
       });
     },
    
    
  // get by id Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  selectprofile:(req, res, next) => {
    const id = req.params.profileId;
    Profile.findById(id)
     .select("name email mobileNumber age dateofbirth schoolName classAndSection schloolRollnumber ")
      .exec()
      .then(doc => {
       if (doc) {
          res.status(200).json({
              books: doc,
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
          }
      }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    
    
  },
  // patch Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  updateprofile:(req, res, next) => {
     const id = req.params.ProfileId;
     const updateOps = {};
        for (const ops of req.body) {
          updateOps[ops.propName] = ops.value;
        }
        Profile.update({ _id: id }, { $set: updateOps })
          .exec()
          .then(result => {
            res.status(200).json({
                message: 'User profile updated',
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
      },
    

  // delete Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  deleteprofile:(req, res, next) => {
    
     const id = req.params.profileId;
     console.log(id)
     Profile.remove({ _id: id })
       .exec()
       .then(result => {
        res.status(200).json({
          message: 'Books deleted',
        });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
         });
      });
     }
   }


 module.exports =profileCtrls;