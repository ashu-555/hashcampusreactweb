
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())

app.use(morgan("dev"));
app.use('/books', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/video', (req, res) => {
  res.sendFile('assets/video1.mp4', { root: __dirname });
});

//videos route http://localhost:5000/videos/video/outside-the-wire
const Videos = require('./routes/Videos')
app.use('/videos', Videos)

// Routes http://localhost:5000/user/register 
app.use('/user', require('./routes/userRouter'))
//books routing,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.use("/books", require('./routes/booksRouter'));

//profile routing,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.use("/profile",require('./routes/profileRouter'));

//profile routing,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.use("/order",require('./routes/orderRouter'));


// Connect to mongodb,,,,,,,,,,,,,,,,,,,,,,,,

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();

  });
  

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });


  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
  }
  
  module.exports =app;