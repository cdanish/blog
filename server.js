const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



//env config
dotenv.config();


//router import

const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");


//db
connectDB();


//res object
const app = express();

//middlewaeres
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/blog",blogRouter);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{


    console.log(`server Running on port ${PORT} `.bgCyan.white);
});