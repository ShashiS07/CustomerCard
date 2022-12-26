const express=require("express")
const router=express.Router()
const {createCustomer,getcustomer,deleteCustomer}=require("../Controller/customerController")
const {createCard,getcard}=require("../Controller/cardController")

router.post("/register",createCustomer)
router.get("/getcustomer",getcustomer)
router.delete("/deletecustomer/:customerId",deleteCustomer)

router.post("/createcard",createCard)
router.get("/getcard",getcard)


module.exports=router