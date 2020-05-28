const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const excercisesRouter = require('./routes/excercises.js');
const usersRouter = require('./routes/users.js');

require('dotenv').config();

const app = express();      //creating express server
const port = process.env.PORT || 5000;      //providing port number

app.use(cors());        //To load the middleware function, call app.use(), specifying the middleware function.eg:following code loads the cors middleware function
app.use(express.json());        //allows to parse json


const uri = process.env.ATLAS_URI;        //uri(the connection string) is the place where our database is stored
mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true});       //starting a connection

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb satabase connection established successfully");
})      //once the connection is open it prints the msg and tells we are connected to the database


app.use('/excercises',excercisesRouter);        //if somebody requests about /excercises then it responses by loading excerciseRouter
 app.use('/users',usersRouter);

//starts listening on a certain port and starts the server
app.listen(port , () => {
    console.log('Server is running on port: '+port)});