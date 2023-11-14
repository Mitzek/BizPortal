const mongoose = require("mongoose")

const orders = new mongoose.Schema({
    orderDetails: String,
    amount: Number,
    updatedAt: Date,
})

const debitAmount = new mongoose.Schema({
    debitAmount: Number,
    updatedAt: Date,
})


const createShop = new mongoose.Schema({
    name : String,
    properitor: String,
    contact: Number,
    location: String,
    debitHistory: [debitAmount],
    orders: [orders],
})


module.exports = mongoose.model("Shops", createShop)
 
