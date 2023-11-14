const express = require("express")
const router = express.Router()

//Shop Routes
const {createShop} = require("../Controllers/shop_controller.js")
const {displayShops} = require("../Controllers/shop_controller.js")
const {editShop} = require("../Controllers/shop_controller.js")
const {deleteShop} = require("../Controllers/shop_controller.js")
router.get("/displayShops", displayShops)
router.post("/createShop", createShop)
router.put("/editShop/:id", editShop)
router.delete("/deleteShop/:id", deleteShop)

//Order Routes
const {createOrder} = require("../Controllers/shop_controller.js")
const {editOrder} = require("../Controllers/shop_controller.js")
const {deleteOrder} = require("../Controllers/shop_controller.js")

 router.post("/createOrder/:shop_id", createOrder)
 router.put("/editOrder/:shop_id/:order_id", editOrder)
 router.delete("/deleteOrder/:shop_id/:order_id", deleteOrder)

//Debit Routes
const {debitEntry} = require("../Controllers/shop_controller.js")
const {debitDelete} = require("../Controllers/shop_controller.js")
router.put("/debitEntry/:shop_id", debitEntry)
router.delete("/debitDelete/:shop_id/:debit_id", debitDelete)

module.exports = router