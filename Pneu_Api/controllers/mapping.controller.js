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
const Mapping = require('../models/mapping.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')


//get pneu auto
exports.getAllMappingController = (req, res) => {
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
                    db.query('select * from mapping_pneu_four order by id_pneu_service ASC',(err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var mappings = results.rows;
                            return res.json(mappings)
                        }
                    })
                }
            })  
        }
}

exports.getMappingFournisseurController = (req, res) => {
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
                    db.query('select * from mapping_pneu_four where id_fournisseur =$1 order by id_pneu_service ASC ',[req.body.id_fournisseur],(err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var mapping = results.rows;
                            return res.json(mapping)
                        }
                    })
                }
            })  
        }
}

//add pneu auto
exports.addMappingController = (req, res) => {
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
                    db.query('insert into mapping_pneu_four(id_pneu_service, id_pneu_fournisseur, designation, id_fournisseur) values($1, $2, $3, $4)',
                      [req.body.id_pneu_service, req.body.suppliers_code, req.body.designation, req.body.id_fournisseur] ,
                      (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            return res.json({
                                message : `Le mapping du pneu ${req.body.designation} a été Ajouté avec succes`
                            })
                        }
                    })
                }
            })  
        }
}

//delete pneu auto
exports.deleteMappingController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        Mapping.destroy({
            where: {  id_mapping: {
                [Op.in] : req.body.listMapping
            }}
        }).then(() => {
            return res.json({
                message : `les mapping ${req.body.listMapping} ont été supprimée`
            })
        }).catch(err => {
            console.log(err)
         }) 
    }
}

//update commande 
exports.updateMappingController = (req, res) =>{
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
               db.query(`update fournisseur set id_pneu_service = $1, id_pneu_fournisseur = $2, designation = $3, id_fournisseur = $4 where  id_mapping = $5`,
               [req.body.id_pneu_service, req.body.id_pneu_fournisseur, req.body.designation, req.body.id_fournisseur, req.body.id_mapping] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `Le Mapping du pneu : ${req.body.designation} a été modifiée`
                    })
                }
               })
            }
        })
    } 
}