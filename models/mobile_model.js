
const mongoose = require("mongoose")

const mobileSchema = new mongoose.Schema({

    // mobile_name : {
    //     type : String,
    //     required:true, 
    // },
    // mobile_price :{
    //     type: Number,
    //     required: true,
    // },
    // mobile_display:{
    //     type:String, 
    //     required: true,
    // },
    // mobile_camera:{
    //     type:String,
    //     required:true 
    // },
    // mobile_battery:{
    //     type:String,
    //     required:true 
    // }
    mobileBrand:String,
    mobileName : String, 
    mobilePrice:Number,
    mobileDisplay:String,
    mobileCamera:String, 
    mobileBattery:String,  



})


module.exports = mongoose.model('mobileModel',mobileSchema)



