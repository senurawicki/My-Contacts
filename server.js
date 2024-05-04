const express= require("express");
const errorHandler=require("./middleware/errorHandler");
const connectDb=require("./config/dbConnection");
const { connect } = require("mongoose");
const dotenv=require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');

connectDb();
const app=express();
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

const port=process.env.PORT||5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,() =>{
    console.log(`server running on port ${port}`);
});