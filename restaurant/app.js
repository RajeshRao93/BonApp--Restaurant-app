const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const restaurant = require('./src/restaurant');
const port = process.env.PORT || 6000
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    //Git test
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Test API
app.get('/get', (req, res) => {
    res.send("Hola");
})

//API to get all restaurants on the home page
app.post('/getallrestaurants', (req, res) => {
    try {
        validateGetallRestaurantsInput(req, res);
    }
    catch (err) {
        return res.status(400).send(JSON.stringify({ message: err }))
    }
    restaurant.GetAllRestaurants(req.body.pinCode)
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify(value));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

//API to get all cuisines available for restaurant owner
app.get('/getallcuisines', (req, res) => {

    restaurant.GetAllCuisinesForOwner()
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify(value));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

//API to post restaurants details for the owner
///returns restaurant_id of the added restaurant
app.post('/postresturantdetails', (req, res) => {

    restaurant.PostRestaurantDetails(req.body.userid, req.body.address, req.body.restaurantname,
        req.body.pinCode, req.body.totaltables, req.body.amenities)
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify(value));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

//API to post menu details for a restaurant
app.post('/postmenudetails', (req, res) => {

    restaurant.PostMenuDetails(req.body.restaurantid, req.body.cuisineid, req.body.itemname,
        req.body.price, req.body.itemdescription, req.body.availability)
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify({ "message": value }));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

//API to get details for a restaurant
app.post('/getrestaurantdetails', (req, res) => {

    restaurant.GetRestaurantDetails(req.body.restaurantid)
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify(value));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

//API to get menu for a cuisine in a restaurant
app.post('/getmenuforcuisine', (req, res) => {

    restaurant.GetMenuForCuisine(req.body.cuisinename, req.body.restaurantid)
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify(value));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

//API to book table at a restaurant
app.post('/booktable', (req, res) => {
    restaurant.BookTable(req.body.restaurantid, req.body.userid, req.body.seats)
        .then((value) => {
            console.log(value);
            res.status(200).send(JSON.stringify(value));
        })
        .catch(err => res.status(400).send(JSON.stringify({ message: err })));
});

function validateGetallRestaurantsInput(req, res) {
    if (!req.body.pinCode) {
        throw ("Bad Request Missing username/password.");
    }
}

app.listen(port, () => {
    console.log("Server listening at port: " + port);
})