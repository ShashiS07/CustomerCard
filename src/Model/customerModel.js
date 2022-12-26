const mongoose=require("mongoose")

const customerSchema= new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    mobileNumber:{type:String,min:10,max:10},
    DOB:{type:Date},
    emailID:{type:String},
    address:{type:String},
    customerId:{type:String},
    status:{type:String,enum:["ACTIVE","INACTIVE"]},
},{timestamps:true})

module.exports=mongoose.model("Customer",customerSchema)