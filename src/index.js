const express = require ('express');
// const mongoose = require ('mongoose');
const app = express();
const user = require ("./database/databaseSetup")
// mongoose.connect("mongodb.com")
// .then(() =>{


//     app.get("/", (req,res) =>{
//         const testSchema = new mongoose.Schema({
//             name: String,
//             date: Date
//         });
    
//         const Test = mongoose.model("Test", testSchema);
        
//         Test.createCollection().then (()=>{
//             const testValue = new Test({
//                 name: "dindong",
//                 date: new Date()
            
//             })
//             testValue.save();    
//             console.log(testValue)
//         })

//     })

// })






app.get("/", (req,res) =>{
        user.createUser("dingdong","donggyu","kim","test@gmail.com", "enctrypyted", "something.png", 27, 00, false )

        //model find finds and return documents
        // did {} to get all obj
        user.UserModel.find ({}, (err,found) => {
            if (!err) {
                res.send (found);
            } 
            // console.log(err);
            // res.send ("some error occured!");
        }).catch (err=> console.log("error"+err))
    })



app.listen(3000,()=>{console.log("connected")});


