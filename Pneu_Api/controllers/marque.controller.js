//My libraries
const _ = require('lodash')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const sequelize = require('sequelize')
const db = require('../config/db')
const pg = require('pg')
const {Op} = require('sequelize')
const path = require("path");
const nodemailer = require('nodemailer')

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
const CentreMontage = require('../models/centreMontage.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')
const { type } = require('os')

//bring our models
const PneuAuto = require('../models/pneu.model')
const PneuMoto = require('../models/pneu.moto.model')
const PneuPL = require('../models/pneu.pl.model')
const PneuAgricole = require('../models/pneu.agricole.model')


exports.getMarqueController = (req, res) =>{
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
                    if(req.body.categorie == 'pneu auto'){
                        db.query('select distinct marque, marque_img from pneu_dimension',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var marque = results.rows;
                                return res.json(marque)
                            }
                        })
                    }
                    else if(req.body.categorie == 'pneu moto'){
                        db.query('select distinct marque, marque_img from pneu_moto',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var marque = results.rows;
                                return res.json(marque)
                            }
                        })
                    }
                    else if(req.body.categorie == 'pneu pl'){
                        db.query('select distinct marque, marque_img from pneu_poids_lourds',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var marque = results.rows;
                                return res.json(marque)
                            }
                        })
                    }
                    else if(req.body.categorie == 'pneu agricole'){
                        db.query('select distinct marque, marque_img from pneu_agricole',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var marque = results.rows;
                                return res.json(marque)
                            }
                        })
                    }
                }
            }) 
    }
}


//supprimer commande 
exports.deleteMarqueController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            PneuAuto.destroy({
                where: { marque: {
                    [Op.in] : req.body.listMarque
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus dont les marques sont : ${req.body.listMarque} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu moto'){
            PneuMoto.destroy({
                where: { marque: {
                    [Op.in] : req.body.listMarque
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus dont les marques sont : ${req.body.listMarque} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu pl'){
            PneuPL.destroy({
                where: { marque: {
                    [Op.in] : req.body.listMarque
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus dont les marques sont : ${req.body.listMarque} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu agricole'){
            PneuAgricole.destroy({
                where: { marque: {
                    [Op.in] : req.body.listMarque
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus dont les marques sont : ${req.body.listMarque} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
    }
}

//update commande 
exports.updateMarqueController = (req, res) =>{
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
                if(req.body.categorie == 'pneu auto'){
                    PneuAuto.update(
                    { 
                       marque_img : req.file.path
                    },
                    {
                        where: { marque: req.body.marque}
                    }).then(() => {
                        return res.json({
                            message : `image modifié avec succes`,
                            marque_img : req.file.path                
                        })
                    }).catch(err => {
                        console.log(err)
                     }) 
                }
                else if(req.body.categorie == 'pneu moto'){
                    PneuMoto.update(
                        { //{point_fort1,point_fort2,...}
                           image_marque : req.file.path
                        },
                        {
                            where: { marque: req.body.marque}
                        }).then(() => {
                            return res.json({
                                message : `image modifié avec succes`,
                                image_marque : req.file.path
                            })
                        }).catch(err => {
                            console.log(err)
                         })
                }
                else if(req.body.categorie == 'pneu pl'){
                    PneuPL.update(
                        { //{point_fort1,point_fort2,...}
                           img_marque : req.file.path
                        },
                        {
                            where: { marque: req.body.marque}
                        }).then(() => {
                            return res.json({
                                message : `image modifié avec succes`,
                                img_marque : req.file.path                    
                            })
                        }).catch(err => {
                            console.log(err)
                         }) 
                }
                else if(req.body.categorie == 'pneu agricole'){
                    PneuAgricole.update(
                        { //{point_fort1,point_fort2,...}
                           image_marque : req.file.path
                        },
                        {
                            where: { marque: req.body.marque}
                        }).then(() => {
                            return res.json({
                                message : `image modifié avec succes`,
                                image_marque : req.file.path
                            })
                        }).catch(err => {
                            console.log(err)
                         })
                }
            }
        })
    }
}


//activer / desactiver collection
exports.activerDesactiverController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_dimension set statut = $1 where marque = $2`,
                           [req.body.statut, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
            
        }
        else if(req.body.categorie == 'pneu moto'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_moto set statut = $1 where marque = $2`,
                           [req.body.statut, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
            
        }
        else if(req.body.categorie == 'pneu pl'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_poids_lourds set statut = $1 where marque = $2`,
                           [req.body.statut, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
             
        }
        else if(req.body.categorie == 'pneu agricole'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_agricole set statut = $1 where marque = $2`,
                           [req.body.statut, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
            
        }
    }
}


//ajouter promo
exports.ajouterPromoController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_dimension set promo = $1, id_promo = $2 where marque = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
             
        }
        else if(req.body.categorie == 'pneu moto'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_moto set promo = $1, id_promo = $2 where marque = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
             
        }
        else if(req.body.categorie == 'pneu pl'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_poids_lourds set promo = $1, id_promo = $2 where marque = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
            
        }
        else if(req.body.categorie == 'pneu agricole'){
            
            req.body.dataToUpdate.forEach(item => {
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update pneu_agricole set promo = $1, id_promo = $2 where marque = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.marque],
                           (err, results) => {
                               done()
                               if(err){
                                console.log(err)
                            }else{
                                console.log('success')
                            }
                        })
                    }
                })
            })
            return res.json({
                message : `Operation Reussie`
            })
            
        }
    }
}

