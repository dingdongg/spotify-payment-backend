const user = require ("./databaseSetup")
const bcrypt = require ("bcrypt")


//get user


//create user

function createUser (username,firstname,lastname,email,password,picture,accountBalance,roleMask,adminStatus){
    user.UserModel.createCollection().then (()=>{
        const testValue = new user.UserModel({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            picture: picture,
            accountBalance: accountBalance,
            roleMask: roleMask,
            adminStatus:adminStatus,
            date: new Date()
                
             })
        testValue.save().then(()=> {
        console.log("one entry added")
        console.log(testValue);
        });    
    }, (error) => console.log(error));

}



//delete user

function deleteUser (){

}


//change username

function editUserName (id, newUserName){

    user.UserModel.updateOne({_id: id},{
        username: newUserName
    }).then(()=>console.log("username has been updated!"));
}


//change firstname

function editFirstName(id, newFirstName){

    user.UserModel.updateOne({_id: id},{
        firstname: newFirstName
    }).then(()=>console.log("firstname has been updated!"));

}

//change last name 

function editLastName(id, newLastName){

    user.UserModel.updateOne({_id: id},{
        lastname: newLastName
    }).then(()=>console.log("lastname has been updated!"));

}

//change email

function editEmail(id, newEmail){

    user.UserModel.updateOne({_id: id},{
        email: newEmail
    }).then(()=>console.log("email has been updated!"));

}

//change password (make sure encrypted)

function editPassword(id, newPassword){

    bcrypt.genSalt ( 10, (err,salt) => {
        bcrypt.hash(newPassword,salt)
            .then(hash=>{
                //store in db
                //overwriting method
                user.UserModel.updateOne({_id: id},{
                    password: hash
                }).then(()=>console.log("password has been updated!"));
            }).catch(err => {
                console.log(err)
        })
    })

}

//verify passowrd

function verifyPassword (plainTextPassword, hash){

    bcrypt.compare(plainTextPassword, hash)
        .then (result=>{
            console.log("its a match")
            return result
        })
        .catch (err=>{
            console.log("password mismatched")
            console.log(err)
        })
}

//change picture

function changeProfilePhoto (id, png){

    user.UserModel.updateOne({_id: id},{
        picture: png
    }).then(()=>console.log("profile photo has been updated!"));
}


//change balace (admin only)

function changeBalance(id, newBalance){

        
    user.UserModel.updateOne({_id: id},{
        accountBalance: newBalance
    }).then(()=>console.log("balance has been updated!"));

        
    
 

}

//helper function to find admin

function adminChecker (){
    const findAdmin = user.UserModel.findOne ({adminStatus: true})
    if (findAdmin.adminStatus){
        console.log("you can change currency");
        return true;

    } else{
        console.log ("rejected");
        return false;
    }



}


module.exports={createUser, editPassword, changeBalance, changeProfilePhoto, editUserName, editEmail, editFirstName, editLastName,verifyPassword}