# 2102_Calendar
Final Project of 2102


# How to Run

## Installing dependencies 
1. install react packages
```shell
cd reactjs
npm i
```

2. install nodejs packages
```shell
cd nodejs
npm i
```

OPTIONAL   
Note: You can use xampp as well.

Setting up mysql database using docker.
1. Install docker desktop (search online how to)
2. Open docker 
3. Run 
```shell
docker-compose up
```

Can import reminders_db.sql to seed the database.

## Running the App

A. Database 
1. Run 
```shell
docker-compose up
```

2. Database settings is found in docker-compose.yml

B. NodeJs
1. Go to nodejs/config/db.config.js
2. Input corresponding user, password, and database
If you use doctor without touching the yml file, the settings are
user        : 'root',
password    : 'example',
database    : 'reminders_db',
3. Run 
```shell
cd nodejs
npm run start
```

C. ReactJs
1. Run 
```shell
cd nodejs
npm run start
```
2. Open http://localhost:3001

