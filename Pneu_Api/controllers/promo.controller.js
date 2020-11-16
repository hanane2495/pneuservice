//My libraries
const _ = require('lodash')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const sequelize = require('sequelize')
const {Op} = require('sequelize')
const db = require('../config/db')
const pg = require('pg')
const path = require("path");
const fs = require('fs')
const csv = require('csv-parser')

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
const Promo = require('../models/promo.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')


//get pneu auto
exports.getPromoController = (req, res) => {
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
                    db.query('select * from promo',(err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var fournisseurs = results.rows;
                            return res.json(fournisseurs)
                        }
                    })
                }
            })  
        }
}

//add pneu auto
exports.AddPromoController = (req, res) => {
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
                    db.query('insert into promo(nom_promo, slogan_promo, valeur_promo, type_promo, code_promo) values($1, $2, $3, $4, $5)',
                      [req.body.nom_promo, req.body.slogan_promo, req.body.valeur_promo, req.body.type_promo, req.body.code_promo] ,
                      (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            return res.json({
                                message : `une nouvelle promo a été Ajouté`
                            })
                        }
                    })
                }
            })  
        }
}

//delete pneu auto
exports.deletePromoController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        Promo.destroy({
            where: { id_promo: {
                [Op.in] : req.body.listpromo
            }}
        }).then(() => {
            return res.json({
                message : `les promos ${req.body.listpromo} on ete supprimee`
            })
        }).catch(err => {
            console.log(err)
         }) 
    }
}

//update commande 
exports.updatePromoController = (req, res) =>{
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
               db.query(`update promo set nom_promo = $1, slogan_promo = $2, valeur_promo = $3, type_promo = $4, code_promo = $5 where  id_promo = $6`,
               [req.body.nom_promo, req.body.slogan_promo, req.body.valeur_promo, req.body.type_promo, req.body.code_promo, req.body.id_promo] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `La promo ${req.body.nom_promo} a été modifiée`
                    })
                }
               })
            }
        })
    } 
}

