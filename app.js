const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require('./routes/user.js')
const userRouter = require('./routes/user.js')
const categoryRouter = require('./routes/category.js')
const postRouter = require('./routes/post.js')
const multer = require("multer");
const path = require("path");
const connectDB = require('./DB/connection');





connectDB();
const port = process.env.PORT;
app.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });



app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use("/api/posts", postRouter);
app.use('/api/category',categoryRouter);



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))