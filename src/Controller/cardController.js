const cardModel=require("../Model/cardModel")
const customerModel = require("../Model/customerModel")
const isValidUUIDV4 = require('is-valid-uuid-v4').isValidUUIDV4

const createCard=async function(req,res){
try{
    let data=req.body
    if(Object.keys(data).length==0) return res.status(400).send("All fields are mandetory")

    let {cardType,vision,customerId}=data
    if(!cardType) return res.status(400).send({status:false,message:"Card Type is required"})
    if(!vision) return res.status(400).send({status:false, message:"vision is required"})
    if(!customerId) return res.status(400).send({status:false,message:"customerId is required"})
    if(!isValidUUIDV4(customerId)) return res.status(400).send({status:false,message:"customerId is not valid"})

    let detail=await customerModel.findOne({customerId})
    if(!detail) return res.status(404).send({status:false,message:"customer not found"})

    let fullName=detail.firstName+" "+detail.lastName

    data.customerName=fullName

    let cardnum= await cardModel.find()
    data.cardNumber=`C00${++cardnum.length}`

    let cardexist=await cardModel.findOne({customerId})
    if(cardexist) return res.status(400).send({status:false,message:"Card is already created for this customer"})

    let cardcreate=await cardModel.create(data)
    return res.status(201).send({status:true,data:cardcreate})

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}    
}

const getcard=async function(req,res){
try{
    let data=await cardModel.find()
    return res.status(200).send({status:true,data:data})
}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports={createCard,getcard}