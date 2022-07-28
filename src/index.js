const express = require('express'); 
//require('dotenv').config(); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose'); 
const router = require('./routes/route'); 

const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));  
mongoose.connect("mongodb+srv://mashum:GfvbXkTb0tLmZhEU@cluster0.jo9tb.mongodb.net/eventManagement",{
    useNewUrlParser: true})
    .then(() => {
    console.log("MongoDb Connected !");
}).catch((error) => {
    console.log(error.message);
});

app.use('/', router); 

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on PORT ${process.env.PORT || 3000}`);
}); 
