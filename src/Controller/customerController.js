const {v4: uuidv4}=require("uuid")
const customerModel=require("../Model/customerModel")
const isValidUUIDV4 = require('is-valid-uuid-v4').isValidUUIDV4

const createCustomer=async function(req,res){
try{
    let data=req.body
    data.customerId=uuidv4()
    let savedata=await customerModel.create(data)
    return res.status(201).send({status:true,data:savedata})
}catch(error){
    return res.status(500).send({status:false,error:error.message})
}
}

const getcustomer=async function(req,res){
try{
    let data=await customerModel.find({status:"ACTIVE"})
    if(data.length==0) return res.status(404).send({status:false,message:"No customer found"})

    return res.status(200).send({status:true,data:data})

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

const deleteCustomer= async function(req,res){
try{
    let customerId=req.params.customerId
    if(!isValidUUIDV4(customerId)) return res.status(400).send({status:false,message:"customerId is not valid"})
    await customerModel.deleteOne({customerId})
    return res.status(200).send({status:true,message:"Deleted Successfully"})

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports={createCustomer,getcustomer,deleteCustomer}