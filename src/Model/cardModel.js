const mongoose=require("mongoose")

const cardSchema=new mongoose.Schema({
    cardNumber:{type:String},
    cardType:{type:String,enum:["REGULAR","SPECIAL"]},
    customerName:{type:String},
    status:{type:String,default:"ACTIVE"},
    vision:{type:String},
    customerId:{type:String,ref:"Customer"}
},{timestamps:true})

module.exports=mongoose.model("Card",cardSchema)