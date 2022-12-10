const mongoose = require ('mongoose');
require ('dotenv').config();




//conect database

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
})


//create a schema

const userSchema = new mongoose.Schema({

    username: String,
    firstname:String,
    lastname: String,
    email: String,
    password: String,
    picture: String,
    accountBalance: Number,
    roleMask: Number,
    adminStatus:Boolean,
    date: Date

})

const UserModel = mongoose.model("Test", userSchema);



module.exports = {UserModel};