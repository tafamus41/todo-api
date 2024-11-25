"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
$ npm init -y
$ npm i express dotenv express-async-errors
$ echo PORT=8000 > .env
$ npm i sequelize sqlite3
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data and convert to object:
app.use(express.json())

// express-async-errors: catch async-errors and send to errorHandler:
require('express-async-errors')

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})
/* ------------------------------------------------------- */
//* SEQUELIZE
// npm i sequelize sqlite3

const { Sequelize, DataTypes } = require('sequelize')

// DB Connection Settings:
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
// const sequelize = new Sequelize('sqlite:' + process.env.SQLITE)
const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'))

// Model:
// Her model, veritabanında bir tabloya karşılık gelir.
// sequelize.define('tableName', { tableDetails })

// Model isimleri PascalCase:
const Todo = sequelize.define('todos', {

    // sequelize'da id tanımlamaya gerek yoktur. Otomatik tanımlanır.
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // default: true
    //     unique: true, // default: false
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false
    //     field: 'custom_name', 
    //     defaultValue: 0 // default: null
    // },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // description: {
    //     type: DataTypes.TEXT,
    // },
    description: DataTypes.TEXT, // ShortHand 

    priority: { // -1: Low, 0: Normal, 1: Yüksek
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    // createdAt: {},
    // updatedAt: {},
    // createdAt ve updatedAt tanımlamaya gerek yoktur. Sequelize otomatik yönetir.

})

//* Syncronization:
//? Model'i veritabanına uygula:
// sequelize.sync() // CREATE TABLE (ilk uygulama)
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE (Dikkat! Data var ise silinir.)
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE & FROM BACKUP 
//! sync() methodu 1 kere uygulanır ((modelde değişiklik var ise tekrar uygulanır.)

// Connect to DB:
sequelize.authenticate()
    .then(() => console.log('* DB Connected * '))
    .catch(() => console.log('* DB Not Connected * '))

/* ------------------------------------------------------- */

//ROUTERS:

const router=express.Router()
//?CRUD ->

router.post("/",(req,res)=>{
    
})





/* ------------------------------------------------------- */







const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));