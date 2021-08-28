const Books = require ('../models/booksModel');
const mongoose = require('mongoose');
const {uploadFile} = require('../helpers/s3')
const {getFileStream} =require('../helpers/s3')
const express = require('express');
const fs = require('fs')
const util = require('util');
const { json } = require('body-parser');
const unlinkFile = util.promisify(fs.unlink)


const booksCtrls ={
  // post Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  register:(req, res,  next) =>{
    const books = new Books({
       _id: new mongoose.Types.ObjectId(),
       title : req.body.title,
       authors : req.body.authors,
       creators : req.body.creators,
       category : req.body.category,
       tag : req.body.tag,
       languages : req.body.languages,
       duration : req.body.duration,
       rating : req.body.rating,
       releaseDate: req.body.releaseDate,
       publisher : req.body.publisher,
       copyrights : req.body.copyrights,
       video : req.file.path,
    });
    const file = req.file
    console.log(file)
    const result =  uploadFile(file)
    unlinkFile(file.path)
    console.log(result+"s3data") 
   // console.log("ata--->"+JSON.stringify(books))
   // return true
      books.save()
      .then(result => {
        res.status(201).json({
        message: "Created product successfully",
        }); 
        }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
          });
        });
      },


  // get Books Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  getbooks: (req, res, next) => {
  
    Books.find()
    .select(" title  authors  creators  category  tag  languages _id  duration  rating  releaseDate  publisher  copyrights  audiobooks epdf video viewer3D")
        .exec()
        .then(docs => {
        const response = {
            count: docs.length,
            books: docs.map(doc => {
              return {
                title:doc.title,
                authors:doc.authors,
                creators:doc.creators,
                category:doc.category,
                tag:doc.tag,
                languages:doc.languages,
                duration:doc.duration,
                rating:doc.rating,
                releaseDate:doc.releaseDate,
                publisher:doc.publisher,
                copyrights:doc.copyrights,
                audiobooks:doc.audiobooks,
                epdf:doc.epdf,
                video:doc.video,
                viewer3D:doc.viewer3D,
                _id: doc._id,
                request: {
                  type: "GET",
                  url: "http://localhost:5000/books/key" + doc._id
                }
              };
            })
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
    videoget: (req, res) => {
      console.log(req.params)
      const key = req.params.key
      const readStream = getFileStream(key).then(docs =>{
        readStream.pipe(res)
      }).catch(err => {
        console.log(err)
      })



    
      
    },
    
  // get by booksid Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  selectbook:(req, res, next) => {
    const id = req.params.booksId;
    Books.findById(id)
    .select(" title  authors  creators  category  tag  languages _id  duration  rating  releaseDate  publisher  copyrights  audiobooks epdf video viewer3D")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        books: docs.map(doc => {
          return {
                title:doc.title,
                authors:doc.authors,
                creators:doc.creators,
                category:doc.category,
                tag:doc.tag,
                languages:doc.languages,
                duration:doc.duration,
                rating:doc.rating,
                releaseDate:doc.releaseDate,
                publisher:doc.publisher,
                copyrights:doc.copyrights,
                audiobooks:doc.audiobooks,
                epdf:doc.epdf,
                video:doc.video,
                viewer3D:doc.viewer3D,
                _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:5000/books/" + doc._id
            }
          };
        })
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


  
  // patch Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  updatebooks:(req, res, next) => {
     const id = req.params.BooksId;
     const updateOps = {};
        for (const ops of req.body) {
          updateOps[ops.propName] = ops.value;
        }
        Books.update({ _id: id }, { $set: updateOps })
          .exec()
          .then(result => {
            res.status(200).json({
                message: 'Books updated',
            });
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
        });
      },
    
  // delete Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  deletebooks:(req, res, next) => {
    
     const id = req.params.booksId;
     console.log(id)
     Books.remove({ _id: id })
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
   
 module.exports =booksCtrls;