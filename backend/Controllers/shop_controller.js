const Shop = require("../Models/shops_model")

module.exports.createShop = async (req, res, next) => {
    try {
            const { name, properitor, contact, location} = req.body;
            
            
            const shop = Shop.create({name, properitor, contact, location, debitHistory: [{debitAmount: 0, updatedAt: new Date()}]});
            res.json({status: true, shop})
           

            
    }
    catch (error){ 
        next("Failed: " + error)

    }
}



module.exports.displayShops = async (req, res, next ) => {
    try {

        const shop = await Shop.find()
        
        res.json({status: true, shop})

    }
    catch (error) {
        next("Failed: " + error)
    }
}

module.exports.editShop = async (req, res, next ) => {
    try {

        const {name, properitor, contact, location} = req.body;
       

        await Shop.findOneAndUpdate({_id:req.params.id}, 
            {
                $set: {name, properitor, contact, location}
            },
            {new: true}).then((result)=>{
                if (result) {
                    console.log("Shop edited successfully")
                    res.json({status: true})
                }   
                else {
                    console.log("Failed: Shop not found!")
                    res.json({status: false})
                }

            }).catch((error)=>{
                console.log("Error: ", error)
            })

        



    }catch(error) {
        next(error)
    }
}

module.exports.deleteShop = async (req, res, next ) => {
    try {

        const shop = await Shop.findOneAndDelete({_id: req.params.id})
        res.json({status: true, shop})
        
        
        

    }catch(error) {
        next(error)
    }
}

//Order Controllers

module.exports.createOrder = async (req, res, next) => {
    try {
         const {orderDetails, amount} = req.body;        
         
        await Shop.findOneAndUpdate({_id: req.params.shop_id}, {

            $push: {
                orders: {  orderDetails, amount, updatedAt: new Date()},
            },
            updatedAt: new Date()
        },
        {new: true, upsert: true}).then((result)=> {

            if(result)  {            
            console.log("Order Entry Successfull")
            res.json({status: true, msg: result})}
            
            else {
            console.log("Error: Shop Not Found!")
            res.json({status: false, msg: result})
            }

        }).catch((error)=>{
            console.log("Error: ", error) })
    
    
    }catch(error) {
        next("Failed: " + error)
    }
}



module.exports.editOrder = async (req, res, next) => {

    try {
        const { orderDetails, amount} = req.body;
        const shop_id = req.params.shop_id
        const order_id = req.params.order_id
        
        await Shop.findOneAndUpdate({_id:shop_id, "orders._id":order_id}, {

            $set: {
                "orders.$.orderDetails": orderDetails,
                "orders.$.amount": amount
            },
            

        },{new: true},
        ).then((result)=>{
                if(result) {
                    console.log("Order edited successfully")
                    res.json({status: true, msg: result})    
                }
                else 
                {
                    console.log("Order edit failed")
                    res.json({status: false, msg: result})    
                }
        }).catch((error)=>{
                console.log("Error: ", error)
        })
        
    }
    catch(error) {
        next("Failed:" + error)
    }
}



module.exports.deleteOrder = async (req, res, next) => {

    try {
        const{ order_id, shop_id } = req.params
        console.log(req.params)
        await Shop.updateOne({_id: shop_id},
            {
                $pull: {
                    orders: {_id: order_id}
                },
            
            }).then((result)=> {

                if(result) {
                    console.log("Order deleted successfully")
                    res.json({status: true})
                }else {
                    console.log("Error: Shop not found")
                    res.json({status: false})
                }

            }).catch((error) => {
                console.log("Error: ", error)
            })
        
       
    }
    catch(error) {
        next("Failed:" + error)
    }
}



//Debit Controllers

module.exports.debitEntry = async (req, res, next ) => {
    try {

        const {debitAmount } = req.body
        await Shop.findOneAndUpdate({_id: req.params.shop_id}, {

                $push: {
                    debitHistory: {debitAmount: debitAmount, updatedAt: new Date()},
                },
                updatedAt: new Date(),
            },
            
            {new: true, upsert: true },).then((result)=>{
                if(result) {
                    console.log("Debit Entry Successfull")
                    res.json({status: true})
                }
                else {
                    console.log("Error: Shop not found!")
                    res.json({status: false})
                }

            }).catch((error) => {
                console.log("Error: ", error)
            })

       
        

    }catch(error) {
        next(error)
    }
}


module.exports.debitDelete = async (req, res, next) => {
    try {
            const {debit_id, shop_id} = req.params

            await Shop.updateOne({_id: shop_id}, {
                $pull: { debitHistory: {_id: debit_id}} 
            }).then((result)=>{
                if (result) {
                    console.log("Debit entry deleted successfully")
                 `   res.json({status: true})`
                }else {
                    console.log("Error! Shop not found")
                    res.json({status: false})
                }
            }).catch((error) => {
                console.log(error)
            })

           
        


    }catch (error) {
            next(error)
    }
}