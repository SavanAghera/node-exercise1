const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json())

mongoose.connect('mongodb://localhost/exercise1',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("connected .... to exercise1...."))
.catch(e=>console.log(e.message));

app.get("/",(req,res)=>{res.send("hiii")})


const port = process.env.PORT || 3000 ;

app.listen(port ,()=>console.log(`listning on ${port}`))