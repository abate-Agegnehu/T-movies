
to create database of t-movies use this is command to create database and table

CREATE DATABASE IF NOT EXISTS movies;
USE movies;

CREATE TABLE IF NOT EXISTS program (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(500),
    status VARCHAR(255),
    videoURL VARCHAR(255),
    duration VARCHAR(255),
    channel VARCHAR(255),
    category VARCHAR(255),
    type VARCHAR(255)
);



CREATE TABLE IF NOT EXISTS channel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL
);

to run server first  install those package



change the directory path 
cd server/
npm install cors
node server.js
open new terminal tab and change the directory path 

cd movies/
npm i react-router-dom
npm i axios
npm i recharts
npm start


