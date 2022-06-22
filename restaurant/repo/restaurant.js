const pg = require('pg-promise')({});
const axios = require('axios');
const connectionString = "postgres://postgres:postgres@192.168.99.100:5432/RestaurantDB"; 
const conString = "postgres://postgres:postgres@192.168.99.100:5432/postgres"; //for docker hosted db
var result = [];
const restaurantImages = ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1526234362653-3b75a0c07438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1483274816418-3975509c8f78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1482275548304-a58859dc31b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1494620531168-6fcc3407322b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1421622548261-c45bfe178854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1533052286801-2385cb274342?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1544739313-6fad02872377?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"]
const menuImages = ["https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1481931098730-318b6f776db0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", "https://images.unsplash.com/photo-1501959915551-4e8d30928317?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"];
const usersevriceurl = "http://192.168.99.100:6002/validateuser";


function GetAllRestaurants(pincode) {
    return new Promise((resolve, reject) => {
        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT image_url, restaurant_id, restaurant_name, address, pincode FROM restaurants WHERE pincode = ${pincode}', { pincode: pincode })
            .then (function (data) { 
                if(data.length >= 1){                                                             
                    result = data;
                }                
                                           
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in GetAllRestaurants");
            })   
            pg.end();                            
        })
        .catch((err) => {
            console.error("Error found in GetAllRestaurants: ", err);
            reject("Error found in GetAllRestaurants");
        })      
    })
    
}

function GetAllCuisinesForOwner() {
    return new Promise((resolve, reject) => {
        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT * FROM cuisines')
            .then (function (data) { 
                if(data.length >= 1){                                                             
                    result = data;
                }                
                                           
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in GetAllCuisinesForOwner");
            })   
            pg.end();                            
        })
        .catch((err) => {
            console.error("Error found in GetAllCuisinesForOwner: ", err);
            reject("Error found in GetAllCuisinesForOwner");
        })      
    })
}

function PostRestaurantDetails(userid, address, restuarantname, pincode, totaltables, amenities){
    return new Promise((resolve, reject) =>{        
    const db = pg(conString); 
    var randomNumber = Math.floor((Math.random() * 10) + 1);
    var valid = callUsersService(userid);
    //if(!valid) return;
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.func('postrestaurantdetails', [userid, address, restuarantname, pincode, totaltables, amenities, restaurantImages[randomNumber]])   
        .then (function (data) {
            db.any('SELECT MAX(restaurant_id) as restaurant_id FROM restaurants WHERE user_id = ${userid}', { userid: userid }) 
            .then(function(res) {
                result = res;
                resolve(result);
            })            
        })
        .catch(function (err) {
            reject(err + "Error found in PostRestaurantDetails");
        })  
              
    })    
    .catch((err) => {
        console.error("Error found PostRestaurantDetails : ", err);
        reject("Error found in PostRestaurantDetails");
    })
    });     
}

function PostMenuDetails(restaurantid, cuisineid, itemname, price, itemdescription, availability){
    return new Promise((resolve, reject) =>{        
    const db = pg(conString); 
    var randomNumber = Math.floor((Math.random() * 5) + 1);
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.func('postmenudetails', [restaurantid, cuisineid, itemname, availability, price, itemdescription, menuImages[randomNumber]])   
        .then (function (data) {             
                resolve("Menu details added..");
        })          
        .catch(function (err) {
            reject("Error found in PostMenuDetails");
        })  
        pg.end();     
    })    
    .catch((err) => {
        console.error("Error found PostMenuDetails : ", err);
        reject("Error found in PostMenuDetails");
    })
    });     
}

function GetRestaurantDetails(restaurantid){
    return new Promise((resolve, reject) =>{  
    var cuisines = [];
    const db = pg(conString); 
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.any('SELECT image_url, restaurant_name, address, amenities, total_tables FROM restaurants WHERE restaurant_id = ${restaurantid}',{ restaurantid: restaurantid })   
        .then (function (data) {
            
            db.any('SELECT DISTINCT cuisine_name FROM menus m INNER JOIN cuisines c ON c.cuisine_id = m.cuisine_id WHERE m.restaurant_id = ${restaurantid}',{ restaurantid: restaurantid })
            .then(function (cuisinedata) {
                
                cuisinedata.forEach(element => {
                    cuisines.push(element.cuisine_name);
                });

                data[0].cuisines = cuisines;
                console.log(data[0])
                          
                resolve(data[0]);
            })           
        })          
        .catch(function (err) {
            reject(err + "Error found in GetRestaurantDetails");
        })   
    })
    .catch((err) => {
        console.error("Error found GetRestaurantDetails : ", err);
        reject(err +"Error found in GetRestaurantDetails");
    })
    });     
}

function GetMenuForCuisine(cuisinename, restaurantid) {
    return new Promise((resolve, reject) => {
        
        const db = pg(conString);
        db.connect()
        .then(() => {
            console.log("DB Connection completed..");            
            db.any('SELECT item_name, price, item_description, image_url  FROM menus m INNER JOIN cuisines c ON c.cuisine_id = m.cuisine_id WHERE restaurant_id = ${restaurantid} AND cuisine_name = ${cuisinename}', {restaurantid : restaurantid, cuisinename : cuisinename})
            .then (function (data) { 
                if(data.length >= 1){                                                             
                    result = data;
                }               
                                           
                resolve(result);
            }) 
            .catch(function (err) {
                reject("Error found in GetMenuForCuisine");
            })   
            pg.end();                            
        })
        .catch((err) => {
            console.error("Error found in GetMenuForCuisine: ", err);
            reject("Error found in GetMenuForCuisine");
        })      
    })
}

function BookTable(restaurantid, userid, seats){
    return new Promise((resolve, reject) =>{
        
    const db = pg(conString); 
    db.connect()
    .then(() => {
        console.log("Connection complete......");
        db.func('makebooking', [seats, restaurantid, userid])   
        .then (function (data) {            
                
         if(data[0].makebooking != '-1')
         resolve(data[0]);
         else reject("Seats not available");
          pg.end();
        })        
        .catch(function (err) {
            reject(err + "Error found in BookTable");
        })  
             
    })    
    .catch((err) => {
        console.error("Error found in BookTable: ", err);
        reject("Error found in BookTable");
    })
    })    
}

function callUsersService(userid){    
    axios
    .post(
        this.usersevriceurl,
        {
            userid : userid
        })
    .then(function (response) {
        if(response.data == 1)
        return true;
        else 
        return false;
    })
    .catch(function (error) {
        console.log(error);
    })
}

module.exports = {
    GetAllRestaurants,
    GetAllCuisinesForOwner,
    PostRestaurantDetails,
    PostMenuDetails,
    GetRestaurantDetails,
    GetMenuForCuisine,
    BookTable
}
