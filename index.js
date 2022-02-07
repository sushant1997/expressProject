const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/userRoutes.js')

app.use(express.json())



app.use('/users',routes)


app.listen(PORT,(err) =>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server running on port ${PORT}`)
    }
})