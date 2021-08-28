const mongoose = require('mongoose');


const booksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
         type: String,
          required: true 
        },
    authors: { 
        type: String,
         required: true
         },
    creators: {
         type: String,
          required: true 
        }, 
    category: {
        type: String,
        required: true 
           },   
    tag : {
         type: String,
          required: true 
        },
    languages :{
        type:String,
        required:true
    },
    duration :{
        type:String,
        required:true
    },
    rating :{
        type:Number,
        required:true
    },
    //short description.......................
    releaseDate : {
        type :Date,
        required:true,
    },
    publisher :{
        type :String,
        required :true
    },
    copyrights : {
        type:String,
     
    }
    //learning Modules........................
    // audiobooks : {
    //     type :String,
    // },
    // epdf : {
    //     type :String
    // }
    ,video :{
        type : String
    },
    // viewer3D : {
    //     type :String
    // }
});

module.exports = mongoose.model('Books', booksSchema);