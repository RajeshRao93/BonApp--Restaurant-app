# BonApp--Restaurant-app
It is customized restaurant app to view the hotels avaialable in a specific area
Pre-requisite for Docker Installation
•	Docker for Windows runs on 64-bit Windows 10 Pro, Enterprise.
•	Optimum requirement for RAM and CPU along with disk space. 
•	Virtualisation should be enabled.

Installation of Docker Toolbox Kit on Windows 10 
Download installer from: https://hub.docker.com/editions/community/docker-ce-desktop-windows 


Firstly, as we need Node and a code text editor. We can get that from:
1.	Nodejs. download from : https://nodejs.org/en/download/
2.	A text Editor (Visual Studio Code) : https://code.visualstudio.com/download

•	Assuming docker toolbox is already installed in the system.
•	Then to begin with, copy the source code to local directory of your choice and open the same in Visual Studio Code editor.
•	Since the application is hosted on docker, we will have a docker-compose .yml file. This file is responsible for starting the services.
•	Before running the services, download ngrok.exe and then open downloaded exe file and type the command “ngrok.exe http 8008”. Here is 8008 because our API Gateway is running on the port 8008.
•	Run the above command and you should see below image on your screen
•	Open the terminal at same location where docker-compose. yml is present. Then run the command “docker-compose up”. This will build and start all the container services.
•	Running “docker ps” command would show all the services that are started.
•	Now open the browser and enter http://192.168.99.100/3000/. This should open the owner portal UI.

Setting up PostgreSQL container
•	Run the command 
“docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres:9.5”

•	This will pull the postgres container from docker hub which we will be using to host the database.
•	As a result we will have database hosted at “192.168.99.100:5432” on the docker.
•	You can access the database by downloading Postgres SQL to your computer.
•	Then download pg admin 3 to access the database server.
