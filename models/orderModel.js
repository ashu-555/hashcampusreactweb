  
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,

    name:{
          type:String,
         required:true
    },
    email:{
         type:String,
         required:true
    },
    books: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Books', 
         required: true
         },
    address :{
         type:String,
         required:true
        },

    distric:{
         type:String,
         required:true,
        },
    pincode:{
         type:Number,
         required:true
        },
    state:{
         type:String,
         required:true
        },

    quantity: { 
         type: Number,
         default: 1 
        },  
            
    amount: {
         type: Number,
         required: true,
        },    
});

module.exports = mongoose.model('Order', orderSchema);

