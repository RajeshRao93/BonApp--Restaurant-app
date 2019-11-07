# BonApp--Restaurant-app
## Introduction
Bon app is a customized restaurant application. This can be used by users in two ways.
1.	As a customer
2.	As a restaurant owner
As a customer you can register with the android mobile application built by us. This will enable the user to look for several restaurants available at a particular place. They can also view the menu of each restaurant as well as the seats availability. They can book the table for their visit to the restaurant and enjoy a delicious meal.
As a restaurant owner, he/she has to register with the mobile app as an owner. This will give them access to our owner portal, a web application developed by us. Through this portal owner can register with his restaurant and upload all the details such menu, table availability etc.

## Implementation
### Server-side implementation:
Server is implemented with below technologies and programming language.

![image](https://user-images.githubusercontent.com/49751425/68385588-687e1800-015a-11ea-8b21-311569d7e612.png)


Figure below shows the Micro service architecture implementation of backend services:

![image](https://user-images.githubusercontent.com/49751425/68385626-7d5aab80-015a-11ea-8d0b-0a8c59370e6b.png)
                    Fig 2: Overview of Node Server Architecture
                    
All the services are implemented as REST APIs with Nodejs. All the services are hosted on docker. Services access PostgreSQL database for fetching and updating the database. Each of the services is a Micro service therefore they can be designed, developed and deployed independently as separate docker containers. Each of the service uses its own private tables from the database. There are mainly 2 services 
1.	Users service
2.	Restaurant service

### 1. Users Service
Users service container consists of APIs related to Signup, Login for customer, Login for owners, Location.
This service mainly focuses on user related services and so they are deployed separately as users-service container on Docker.

Users service makes use of following tables from database	
•	Users 
•	Locations

Following are the different APIs available on Users service.
####	Signup API
This API is used to enable the user to signup or register for the application either as customer or owner of the restaurant. User must provide some data about self in order to register into the application.

Below you see the access details for Signup API:

URL (POST)	“<base_url>/signup”
Sample Input	{"name": "user3", "password": "password3", "pinCode":"47475", "contactNumber":"948075", "email": "user3@gmail.com", "usertype":"Customer"}
Sample Response	{"email":"user36@gmail.com", "pincode":"47475", "name":"user36","user_id":59, "message":"User Signed up..."}
 
### Login API
This API is used to make users of the mobile app login into the application. User must pass the user id assigned to him after the signup along with password to login.

Below you see the access details for login api:

URL (POST)	“<base_url>/login”
Sample Input	{"userid" : "1", "password" : "password1"}
Sample Response	{"email":"user1@gmail.com", "pincode":"47475", "name":"user1","user_id":1,"message":"User logged in!!"}

### Owner Login API
This API is used to make the restaurant owners login to the owner portal for registering their restaurant with the application. Owner will login using user id and password.

Below you see the access details for owner login api:

URL (POST)	“<base_url>/ownerlogin”
Sample Input	{"userid": "1", "password": "password1"}
Sample Response	{"email":"user1@gmail.com", "pincode":"47475", "name":"user1","user_id":1, "message":"User logged in!!"}

### Locations API
This API is used to get details of all the locations available in the database. This has the details about name of the location along with its pin code.

Below are the details to access locations api:

URL (GET)	“<base_url>/getpincode”
Sample Input	NA
Sample Response	{"pincodes":["47475","47178","33102", "40210","44135","45127","48143","50667"]}


### 2. Restaurants service
Restaurants service container consists of APIs related to fetching restaurant details, adding new restaurants etc. This service focuses on restaurant related services and therefore they are deployed independently restaurant-service container on Docker.
Restaurants service makes use of following tables from database	
•	Restaurants
•	Menus
•	Bookings
•	Cuisines
•	Availability

Following are the different APIs available on Restaurants service
### GetAllRestaurants API
This API is used to get all available restaurants for the user based on the location his/her location.

Below are the details to access locations api:

URL (POST)	“<base_url>/ getallrestaurants”
Sample Input	{"pinCode" : "47475" }
Sample Response	[{"image_url":null,"restaurant_id":19,"restaurant_name":"Rajdhani","address":"SchulStr 198","pincode":"47475"}, {"image_url":null,"restaurant_id":20, "restaurant_name":"Maharaja","address":"HenricStr 22", "pincode":"47475"}]


### Get Restaurant Details API
This API is used to get the details about a restaurant for a user.

Below are the details to access locations api:

URL (POST)	“<base_url>/getrestaurantdetails”
Sample Input	{"restaurantid" : "33"}
Sample Response	[{"image_url":"https://images.unsplash.com/photo-1531973968078-9bb02785f13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto= format&fit=crop&w=500&q=60", "restaurant_name":"Indian Mahal", "address":"schulstr","amenities":"Live music, Candle light", "total_tables":"50","cuisines":["Indian"]}]

### Get Menu for Cuisine API
This API is used to get all the menu available for a cuisine type.

Below are the details to access locations api:

URL (POST)	“<base_url>/getmenuforcuisine”
Sample Input	{"restaurantid" : "33", "cuisinename" : "Indian"}
Sample Response	[{"item_name":"Masaladosa","price":"$5.00","item_description":"authetic south indian dosa", "image_url":"https://images.unsplash.com/photo-1531973968078-9bb02785f13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}]


### Book Seats API
This API is used to book a seat in a restaurant. It books the seat for user and gives back the booking id details.

Below are the details to access locations api:

URL (POST)	“<base_url>/booktable”
Sample Input	{"restaurantid" : "33", "userid" : "6" , "seats": "1"}
Sample Response	{"makebooking":94}

### Post Restaurant Details API
This API is used by the owner portal to post details about the restaurants by the owner.

Below are the details to access locations api:

URL (POST)	“<base_url>/postresturantdetails”
Sample Input	{"userid" : "1", "address" : "schulstr", "restaurantname" : "Indian", "pinCode" : "47475", "totaltables" : "30", "amenities":"Live music, Candle light"}
Sample Response	{"restaurant_id":33}


### Post Menu Details API
This API is used by the owner portal to post the Menu details for a cuisine of a restaurant by the owner.


Below are the details to access locations api:

URL (POST)	“<base_url>/postmenudetails”
Sample Input	{"restaurantid" : "33", "cuisineid" : "1", "itemname" : "Masala Dosa", "price" : "5", "itemdescription" : "authetic south indian dosa", "availability":"1"}
Sample Response	{"message":"Menu details added.."}

Above we have seen the entire API’s which has been used for implementing all the functionalities of BonApp mobile applications. 

## Data Model - BonApp
Below image shows the data model for BonApp application.

![image](https://user-images.githubusercontent.com/49751425/68385986-58b30380-015b-11ea-8762-6b8693abcabd.png)

There are total 7 tables in database which stores overall data for BonApp.

●	Users
●	Locations
●	Restaurants
●	Availability
●	Menus
●	Cuisines
●	Bookings

### Screenshots


![image](https://user-images.githubusercontent.com/49751425/68386057-8730de80-015b-11ea-95df-3317187545ca.png)

![image](https://user-images.githubusercontent.com/49751425/68386073-931ca080-015b-11ea-93c6-e45e7103b8f8.png)

![image](https://user-images.githubusercontent.com/49751425/68386145-b5162300-015b-11ea-9cc5-19c5534eafa9.png)

![image](https://user-images.githubusercontent.com/49751425/68386179-c6f7c600-015b-11ea-9e6c-accf7012f5ab.png)

![image](https://user-images.githubusercontent.com/49751425/68386192-d119c480-015b-11ea-8aa0-0f1cb0fa3062.png)




