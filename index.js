const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const Userroute = require('./route/users');
const authRoute = require('./route/auth');
const error = require('./middleware/error');
const helmet = require('helmet');
const compression= require('compression');
const cors = require('cors');


if(!config.get('jwtKey') && !config.get('dbpass')){
    console.error("error jwtPrivateKey  or dbpass not defined");
    process.exit(1);
}

app.use(express.json());
app.use('/api/users/',Userroute);
app.use('/api/auth',authRoute);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(error);
const dbpass = config.get('dbpass');
mongoose.connect(`mongodb+srv://SavanPatel:${dbpass}@cluster0.vv3vp.mongodb.net/exercise?retryWrites=true&w=majority`,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("connected .... to exercise1...."))
.catch(e=>console.log(e.message));

app.get("/",(req,res)=>{res.send("<h1>This is Savan Aghera</h1>")});


const port = process.env.PORT || 3000 ;

app.listen(port ,()=>console.log(`listning on ${port}`))