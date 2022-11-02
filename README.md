# Controlling-Cameras  
project of Controlling cameras using NodeJS with React as frontEnd


## Getting Started

These instructions will get you a copy of the project to running it on your local machine for development.

### Prerequisites

 Things you need to install 

* [Git](https://git-scm.com/downloads) - free and open source distributed version control system 
* [Node.js](https://nodejs.org/en/) - Node.js >= 10.19.0
* [mySQL]Setup your mySQL depending in your Operating system this is for windows (https://www.lifewire.com/how-to-install-mysql-windows-10-4584021)
Get the Code

$ git clone https://github.com/diaahassaniya/E2E-Application-development.git
$ npm install

update MySQL DB configuration according to yours from config file
 
#Run
#npm start
1. create user from the UI then you can login as a user
2. in users table update the role_id to 1 so the updated user will be as admin

## Overview
This is a mini app for a cameras monitaring system:
1. Room that have the cameras 
2. cameras that is in the rooms
3. users that have the cameras in a specific room


The expected flow of project operations 

1. Create, get, update(on/off)and delete camera 
2. Create, get, update and delete room
3. Associate the camera with the room 
4. move camera from room to another 
