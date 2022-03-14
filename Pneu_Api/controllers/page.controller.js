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
                    db.query('select * from pages, image_pub where pages.page_name = image_pub.page_name and pages.page_name = $1', [req.body.page_name], (err, results) => {
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


exports.addImageController = (req, res) => {
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
                    db.query('Insert into image_pub (image_name, image_pub_url, page_name) values($1, $2, $3)', [req.body.name, req.file.path, req.body.page_name], (err, results) => {
                        done()
                        if(err){
                            return res.send(err)
                        }else{
                            const image = {
                                page:req.body.page_name,
                                name:req.body.name,
                                path: req.file.path
                            }                        
                            
                           return res.json({
                                success : true,
                                message: 'image Ajoutee avec succes',
                                image
                            })
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
                    db.query(`update image_pub set image_name = $1, image_pub_url = $2 where id_image_pub = $3 `, 
                    [req.body.name, req.file.path, req.body.id_image_pub], 
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
                                message: 'image modifiee avec succes',
                                image
                            })

                        }
                    })
                }
            })
        }
}

exports.deleteImageController = (req, res) => {
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
                    db.query('delete from image_pneu where id_image_pub = $1', [req.body.id_image_pub], (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            return res.json({
                                success : true,
                                message: 'Slide supprimé avec succes',
                                image
                            })
                        }
                    })
                }
            })  
        }
}


