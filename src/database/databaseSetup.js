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

function createUser (username,firstname,lastname,email,password,picture,accountBalance,roleMask,adminStatus){
    UserModel.createCollection().then (()=>{
        const testValue = new UserModel({
            username: username,
            firstname:firstname,
            lastname: lastname,
            email: email,
            password: password,
            picture: picture,
            accountBalance: accountBalance,
            roleMask: roleMask,
            adminStatus:adminStatus,
            dateCreated: new Date()
                
             })
        testValue.save().then(()=> {
            console.log("one entry added")
            console.log(testValue);
        });    
        
    }, (error) => console.log(error));

}




module.exports = {UserModel, createUser};