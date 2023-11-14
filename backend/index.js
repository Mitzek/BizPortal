const mongoose = require('mongoose');
const cors = require("cors")
const express = require("express")
const app = express()

const shopRoute = require("./Routes/Shop_Routes")


app.use(express.json());
app.use(cors())
app.use("/shops", shopRoute)

require("dotenv").config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Shop Portal Database Connected Successfully");
}).catch((error) => {console.log(error)})





app.listen(process.env.PORT, ()=>{
    console.log("Server listening on port: " + process.env.PORT)
})