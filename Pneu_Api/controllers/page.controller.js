//My libraries
const _ = require('lodash')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const sequelize = require('sequelize')
const {Op} = require('sequelize')
const db = require('../config/db')
const pg = require('pg')
const path = require("path");

//connect to database
let pool = new pg.Pool({
    user: 'postgres', 
    database : 'pneuservice',
    password : '1234',
    host : 'localhost',
    port : 5432,
    max : 10,
    idleTimeoutMillis : 30000
});

//bring our models
const Page = require('../models/page.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')


//get pneu auto
exports.getImageController = (req, res) => {
    const errors = validationResult(req)
    
        if(!errors.isEmpty()){
            const firstError = errors.array().map(error => error.msg)[0]
            return res.status(422).json({
                error: firstError
            })
        }else{
            pool.connect((err, db, done) => {
                if(err){
                    return res.send(err);
                }else{
                    db.query('select * from pages', (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var pages = results.rows;
                            return res.json(pages)
                        }
                    })
                }
            })  
        }
}

//add pneu auto
exports.updateImageController = (req, res) => {
    const errors = validationResult(req)
    
        if(!errors.isEmpty()){
            const firstError = errors.array().map(error => error.msg)[0]
            return res.status(422).json({
                error: firstError
            })
        }else{
            pool.connect((err, db, done) => {
                if(err){
                    return res.send(err);
                }else{
                    db.query(`update pages set image_url = $1, image_name = $2 where page_name = $3 `, 
                    [req.file.path, req.body.name, req.body.page_name], 
                    (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            const image = {
                                page:req.body.page_name,
                                name:req.body.name,
                                path: req.file.path
                            }
                            return res.json({
                                success : true,
                                message: 'Votre profil a été modifié avec succes',
                                image
                            })

                        }
                    })
                }
            })
        }
}

