const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber : {
        type : Number,
        required: true
    },  
    age : {
        type:Number,
        required: true
    },
    dateofbirth : {
        type :Date,
        required: true
    },
    //students details
    schoolName : {
        type : String,
        required: true
    },
    classAndSection :{
         type : String,
         required: true
    },
    schloolRollnumber : {
        type : Number,
        required: true
    }
});

module.exports = mongoose.model('Profile', booksSchema);