

const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const app = express() 
app.set('view engine', 'ejs');

mongoose.connect(process.env.DB_CONNECTION_URL,{useNewUrlParser:true})
const con = mongoose.connection 

con.on('open',function(){

    console.log("connected.....")

})

app.use(express.json())


const Home = require("./routes/home")
app.use("/",Home)

const mobileRouter = require('./routes/mobile')
app.use("/mobiles",mobileRouter)

const laptopRouter = require('./routes/laptop')
app.use("/laptops",laptopRouter)




app.listen(process.env.PORT,()=>{
    console.log("Server Started....")

})
app.use(express.static('public'));





