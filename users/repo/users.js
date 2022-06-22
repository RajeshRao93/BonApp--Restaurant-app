const pg = require('pg-promise')({});
const conString = "postgres://postgres:postgres@192.168.99.100:5432/postgres"; //for docker hosted db
var result = '';

function Signup(userName, password, pinCode, contactNumber, email, usertype){
    return new Promise((resolve, reject) =>{
        
    const db = pg(conString); 
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.func('signupuser', [userName, pinCode, contactNumber, email, password, usertype])   
        .then (function (data) {
            db.any('SELECT email, name, user_id, pincode FROM users WHERE email = ${email}', { email: email }) 
            .then(function(res) {
                res[0].message = "User Signed up...";                    
                result = res[0];
                resolve(result);
            })            
        })
        .catch(function (err) {
            reject("Error found in signup / User already found..");
        })  
               
    })    
    .catch((err) => {
        console.error("Error found in signup: ", err);
        reject("Error found in signup");
    })
    });     
}

function GetPincode(){
    var pincodes = {"pincodes":[]};
    return new Promise((resolve, reject) =>{
        
        const db = pg(conString); 
        db.connect()
        .then(() => {
            console.log("Connection complete......");
            db.any('SELECT pincode FROM locations')   
            .then (function (data) {
                data.forEach((element)=> {
                    pincodes.pincodes.push(element.pincode);
                });                
                resolve(pincodes);           
            })
            .catch(function (err) {
                reject(err + "Error found in GetPincode");
            })  
            pg.end();       
        })    
        .catch((err) => {
            console.error("Error found in signup: ", err);
            reject("Error found in signup");
        })
        });
}

function LoginUser(userid, password) {
    return new Promise((resolve, reject) => {        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT email, name, user_id, pincode FROM users WHERE user_id = ${userid} AND password = ${password} AND user_type = \'Customer\'', { userid: userid, password: password })
            .then (function (data) { 
                if(data.length == 1){                      
                    data[0].message = "User logged in!!";                    
                    result = data[0];
                }                
                else result = "Log in rejected .. Incorrect username or password!!"; 
                            
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in login/ Incorrect username or password");
            })  
            pg.end();                             
        })
        .catch((err) => {
            console.error("Error found in login: ", err);
            reject("Error found in login/ Incorrect username or password");
        })      
    })
    
}

function LoginOwner(userid, password) {
    return new Promise((resolve, reject) => {        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT email, name, user_id, pincode FROM users WHERE user_id = ${userid} AND password = ${password} AND user_type = \'Owner\'', { userid: userid, password: password })
            .then (function (data) { 
                if(data.length == 1){                      
                    data[0].message = "User logged in!!";                    
                    result = data[0];
                }                
                else result = "Owner Log in rejected .. Incorrect username or password!!"; 
                            
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in Owner login/ Incorrect username or password");
            }) 
            pg.end();                              
        })
        .catch((err) => {
            console.error("Error found in owner login: ", err);
            reject("Error found in owner login/ Incorrect username or password");
        })      
    })
    
}

function Validateuser(userid) {
    return new Promise((resolve, reject) => {        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT email FROM users WHERE user_id = ${userid}', { userid: userid })
            .then (function (data) { 
                if(data.length == 1){                      
                                       
                    result = 1;
                }                
                else result = "user doesn't exist"; 
                            
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in Validateuser");
            }) 
            pg.end();                              
        })
        .catch((err) => {
            console.error("Error found in Validateuser: ", err);
            reject("Error found in Validateuser");
        })      
    })
    
}

module.exports = {
    Signup,
    GetPincode,
    LoginUser,
    LoginOwner,
    Validateuser
 }

