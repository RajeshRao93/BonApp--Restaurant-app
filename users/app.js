const express = require('express') ;
const bodyParser = require('body-parser');
const app = express();
const users = require('./repo/users');
const getpincode = users.GetPincode;
const signup = users.Signup;
const port = process.env.PORT || 6000
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Test API
app.get('/get', (req,res)=>{
    res.send("Hola");
})


//API to get all the available pincodes 
app.get('/getpincode', (req, res)=>{
    getpincode()
    .then((value) => {
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
})


//Signup API
//returns userid , email, name of the signed up user
app.post('/signup', (req,res) => {     
    
    try{
        validateSignupInput(req, res);
    }
    catch(err){
           return res.status(400).send(JSON.stringify({message : err}))
    }
    signup(req.body.name, req.body.password, req.body.pinCode, req.body.contactNumber,
        req.body.email, req.body.usertype)
    .then((value) => {
        console.log(value);
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));    
}); 

app.post('/login', (req, res) => { 
    try{
        validateLoginInput(req, res);
    }
    catch(err){
        return res.status(400).send(JSON.stringify({message : err}))
    }

    users.LoginUser(req.body.userid, req.body.password)
    .then((value) => {
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
});

//Log in API for restuarant owner
app.post('/ownerlogin', (req, res) => { 
    try{
        validateLoginInput(req, res);
    }
    catch(err){
        return res.status(400).send(JSON.stringify({message : err}))
    }

    users.LoginOwner(req.body.userid, req.body.password)
    .then((value) => {
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
});

app.post('/validateuser', (req, res) => {
    users.Validateuser(req.body.userid)
    .then((value) => {
        res.status(200).send(JSON.stringify(value));
    })
    .catch(err => res.status(400).send(JSON.stringify({message : err})));
})

function validateLoginInput(req, res){
    if (!req.body.userid || !req.body.password){
        throw("Bad Request Missing username/password.");
    }    
}

function validateSignupInput(req, res){
    if (!req.body.name || !req.body.password || !req.body.pinCode 
        || !req.body.contactNumber || !req.body.email || !req.body.usertype){
        throw("Bad Request Missing input parameters.");
    }    
}

app.listen(port, ()=>{
    console.log("Server listening at port: "+ port);
})
