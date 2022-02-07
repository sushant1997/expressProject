const fs = require('fs')
//const jsonnFile = require('../model/userDetails.json')
const bcrypt = require('bcrypt')


//create users
const create = async (req, res) => {
    let userDetails = [];
    const { id, username, email, Password, address } = req.body

    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(Password, salt)

    try {
        userDetails = JSON.parse(fs.readFileSync("userDetails.json"))
    } catch (e) {
        console.log(e)
    }

    let index = userDetails.findIndex((userID) => userID.id === id)


    if (index === -1) {
        userDetails.push({ id, username, email, password, address })

    } else {
        console.log(`User already exist with id :${id} and email: ${email} `)
    }
    try {
        fs.writeFileSync('userDetails.json', JSON.stringify(userDetails));
        res.send('user created')
    } catch (e) {
        res.send(e)
    }
}




//get all users
const list = async (req, res) => {
    let userDetails = [];


    try {
        userDetails = await JSON.parse(fs.readFileSync("userDetails.json"))
        res.send('file read')
    } catch (e) {
        return []
    }

    userDetails.forEach(element => {
        console.log(`[id :${element.id} username :${element.username} email: ${element.email} address: ${element.address}]`);
    });

}



//get single users
const getSingleUser = (req, res) =>{
    let userDetails = [];
    const {id} = req.params;
    

    try {
        userDetails = JSON.parse(fs.readFileSync("userDetails.json"))
    } catch (e) {
        // console.log(e)
    }

    const index = userDetails.find((user) => user.id==id)
    // console.log(index)
    if(index){
        const filteredList = userDetails.filter((userId) => userId.id == id)

        console.log(filteredList)
        res.send(`user found`)
    }else{

        console.log(`no user found`)
    }
   
    
}



//updating users
const update = (req, res) =>{
    let userDetails = [];
    const {id} = req.params;
    // console.log("the id is " + id)
    const {username, email, address} = req.body;



    try {
        userDetails =  JSON.parse(fs.readFileSync("userDetails.json"))
    } catch (e) {
         console.log(e)
    }


    let index = userDetails.findIndex((userId) => userId.id == id);
    console.log("index is : " + index)

    if (index === -1) {
      console.log("No such user found with id : " + id +".");
    } else {
        userDetails[index].username = username;
        userDetails[index].email = email;
        userDetails[index].address = address;
    }
    try{
     fs.writeFileSync("userDetails.json", JSON.stringify(userDetails));
     res.send("User updated")
    }catch(e){
        console.log(e)
    }
}


//deleting users
const deleteUsers = (req, res) => {
    let userDetails = [];
    const { id } = req.params;

    try {
        userDetails = JSON.parse(fs.readFileSync("userDetails.json"))
    } catch (e) {
        console.log(e)
    }



    const filteredList = userDetails.filter((userId) => userId.id != id)

    try{
    fs.writeFileSync('userDetails.json', JSON.stringify(filteredList));
    res.send(`user deleted`)
    }catch (e){
        console.log(e)
    }

}


module.exports = { list, create, deleteUsers, getSingleUser,update };