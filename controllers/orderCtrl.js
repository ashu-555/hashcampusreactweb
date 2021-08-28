const mongoose = require('mongoose');
const Order = require ('../models/orderModel');
const Books = require('../models/booksModel')

const ordersCtrls ={
  // post Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
 
      orderpost:("/", (req, res, next) => {
        Books.findById(req.body.booksId)
        console.log(Books+"boks err")
          .then(books => {
            if (!books) {
              return res.status(404).json({
                message: "books not found"
              });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                 name:req.body.name,
                 email: req.body.email,
                books: req.body.booksId,
                address: req.body.address,
                distric :req.body.distric,
                pincode: req.body.pincode,
                quantity: req.body.quantity,
                amount :req.body.amount
            })
            return order.save()
          })
          .then(result => {
            // console.log(result);
            res.status(201).json({
              message: "Order stored",
              createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
              },
              
            });
          })
          .catch(err => {
            // console.log(err);
            res.status(500).json({
              error: err
            });
          })
      }),
    

    
      

//   // get Books Routing Api,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  getorder: (req, res, next) => {
    Order.find()
    .select("_id name email books address distric pincode state quantity amount  ")
    .populate( 'title', 'authors', 'creators', 'category', 'tag',  'languages')
   .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
           return docs
        })
        })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
         });
       });
    },
     getorder: (req, res, next) => {
    Order.find()
    .select("_id name email books address distric pincode state quantity amount  ")
    .populate( 'title', 'authors', 'creators', 'category', 'tag',  'languages')
   .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
           return docs
        })
        })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
         });
       });
    },
    
    
    

   }
   
 module.exports =ordersCtrls;