const express = require ('express');
// const mongoose = require ('mongoose');
const app = express();
const user = require ("./database/userFunctions")
const db = require ("./database/databaseSetup")
// mongoose.connect("mongodb+srv://kimtandyo1132:DarpQA2vbi43btzy@splitify-backend.b9proob.mongodb.net/?retryWrites=true&w=majority")
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
       //user.createUser("dingdong","donggyu","kim","test@gmail.com", "enctrypyted", "something.png", 27, 00, false );
       
        user.changeBalance("6393eb4528bc9ff5a377f3ad", 1532);
        user.editPassword("6393eb4528bc9ff5a377f3ad", "testpasword12");
        user.editFirstName("6393eb4528bc9ff5a377f3ad", "Michael")
        user.editLastName("6393eb4528bc9ff5a377f3ad", "Tandyo")
        user.editEmail("6393eb4528bc9ff5a377f3ad", "test2@gmail.com")
        user.editUserName("6393eb4528bc9ff5a377f3ad", "mahkel")
        user.changeProfilePhoto("6393eb4528bc9ff5a377f3ad", "new pfp ")
        user.verifyPassword("testpassword12", "$2b$10$XFwvCmCwgAG5vgrlmp0NRePmlGYZFRh.PAbROejDILA2l0YsVjPyO")

        //model find finds and return documents
        // did {} to get all obj
        db.UserModel.find ({}, (err,found) => {
            if (!err) {
                res.send (found);
            } 
            // console.log(err);
            // res.send ("some error occured!");
        }).catch (err=> console.log("error"+err))
    })



app.listen(3000,()=>{console.log("connected")});


