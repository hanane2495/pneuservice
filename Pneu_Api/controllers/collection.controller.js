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


//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')
const { type } = require('os')

//bring our models
const PneuAuto = require('../models/pneu.model')
const PneuMoto = require('../models/pneu.moto.model')
const PneuPL = require('../models/pneu.pl.model')
const PneuAgricole = require('../models/pneu.agricole.model')


exports.getCollection = (req, res) =>{
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
                        db.query('select distinct marque, collection, gamme, usage, point_fort, description, image_pneu, image_1, image_2 from pneu_dimension',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var collections = results.rows;
                                return res.json(collections)
                            }
                        })
                    }
                    else if(req.body.categorie == 'pneu moto'){
                        db.query('select distinct marque, collection, gamme, usage, point_fort, description, image_pneu, image_1, image_2 from pneu_moto',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var collections = results.rows;
                                return res.json(collections)
                            }
                        })
                    }
                    else if(req.body.categorie == 'pneu pl'){
                        db.query('select distinct marque, collection, gamme, usage, point_fort, description, image_pneu, image_1, image_2 from pneu_poids_lourds',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var collections = results.rows;
                                return res.json(collections)
                            }
                        })
                    }
                    else if(req.body.categorie == 'pneu agricole'){
                        db.query('select distinct marque, collection, gamme, usage, point_fort, description, image_pneu, image_1, image_2 from pneu_agricole',(err, results) => {       
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                var collections = results.rows;
                                return res.json(collections)
                            }
                        })
                    }
                }
            }) 
    }
}



//supprimer commande 
exports.deleteCollection = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            PneuAuto.destroy({
                where: { collection: {
                    [Op.in] : req.body.listCollection
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus avec dont les collections sont : ${req.body.listCollection} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu moto'){
            PneuMoto.destroy({
                where: { collection: {
                    [Op.in] : req.body.listCollection
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus avec dont les collections sont : ${req.body.listCollection} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu pl'){
            PneuPL.destroy({
                where: { collection: {
                    [Op.in] : req.body.listCollection
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus avec dont les collections sont : ${req.body.listCollection} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu agricole'){
            PneuAgricole.destroy({
                where: { collection: {
                    [Op.in] : req.body.listCollection
                }}
            }).then(() => {
                return res.json({
                    message : `Les pneus avec dont les collections sont : ${req.body.listCollection} ont ete supprimées `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
    }
}

//update commande 
exports.updateCollection = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            PneuAuto.update(
            { //{point_fort1,point_fort2,...}
               gamme: req.body.gamme,
               usage : req.body.usage,
               point_fort : req.body.point_fort,
               description : req.body.description
            },
            {
                where: { collection: req.body.collection}
            }).then(() => {
                return res.json({
                    message : `Les pneus dont la collections est : ${req.body.collection} ont ete modifiés `
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu moto'){
            PneuMoto.update(
                { //{point_fort1,point_fort2,...}
                   gamme: req.body.gamme,
                   usage : req.body.usage,
                   point_fort : req.body.point_fort,
                   description : req.body.description
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `Les pneus dont la collections est : ${req.body.collection} ont ete modifiés `
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu pl'){
            PneuPL.update(
                { //{point_fort1,point_fort2,...}
                   gamme: req.body.gamme,
                   usage : req.body.usage,
                   point_fort : req.body.point_fort,
                   description : req.body.description
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `Les pneus dont la collections est : ${req.body.collection} ont ete modifiés `
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu agricole'){
            PneuAgricole.update(
                { //{point_fort1,point_fort2,...}
                   gamme: req.body.gamme,
                   usage : req.body.usage,
                   point_fort : req.body.point_fort,
                   description : req.body.description
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `Les pneus dont la collections est : ${req.body.collection} ont ete modifiés `
                    })
                }).catch(err => {
                    console.log(err)
                 })
        }
    }
}

exports.updateImagePneu = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            PneuAuto.update(
            { //{point_fort1,point_fort2,...}
               image_pneu : req.file.path
            },
            {
                where: { collection: req.body.collection}
            }).then(() => {
                return res.json({
                    message : `image modifié avec succes`,
                    image_pneu : req.file.path                
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu moto'){
            PneuMoto.update(
                { //{point_fort1,point_fort2,...}
                    image_pneu : req.file.path
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu pl'){
            PneuPL.update(
                { //{point_fort1,point_fort2,...}
                   image_pneu : req.file.path
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu agricole'){
            PneuAgricole.update(
                { //{point_fort1,point_fort2,...}
                   image_pneu : req.file.path
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path
                    })
                }).catch(err => {
                    console.log(err)
                 })
        }
    }
}

exports.updateImage_1 = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            PneuAuto.update(
            { //{point_fort1,point_fort2,...}
               image_1 : req.file.path,
            },
            {
                where: { collection: req.body.collection}
            }).then(() => {
                return res.json({
                    message : `image modifié avec succes`,
                    image_pneu : req.file.path
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu moto'){
            PneuMoto.update(
                { //{point_fort1,point_fort2,...}
                  image_1 : req.file.path,
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu pl'){
            PneuPL.update(
                { //{point_fort1,point_fort2,...}
                  image_1 : req.file.path,
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu agricole'){
            PneuAgricole.update(
                { //{point_fort1,point_fort2,...}
                   image_1 : req.file.path,
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 })
        }
    }
}

exports.updateImage_2 = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        if(req.body.categorie == 'pneu auto'){
            PneuAuto.update(
            { //{point_fort1,point_fort2,...}
               image_2 : req.file.path, 
            },
            {
                where: { collection: req.body.collection}
            }).then(() => {
                return res.json({
                    message : `image modifié avec succes`,
                    image_pneu : req.file.path                
                })
            }).catch(err => {
                console.log(err)
             }) 
        }
        else if(req.body.categorie == 'pneu moto'){
            PneuMoto.update(
                { //{point_fort1,point_fort2,...}
                  image_2 : req.file.path
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu pl'){
            PneuPL.update(
                { //{point_fort1,point_fort2,...}
                   image_2 : req.file.path, 
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                   
                    })
                }).catch(err => {
                    console.log(err)
                 }) 
        }
        else if(req.body.categorie == 'pneu agricole'){
            PneuAgricole.update(
                { //{point_fort1,point_fort2,...}
                   image_2 : req.file.path 
                },
                {
                    where: { collection: req.body.collection}
                }).then(() => {
                    return res.json({
                        message : `image modifié avec succes`,
                        image_pneu : req.file.path                    
                    })
                }).catch(err => {
                    console.log(err)
                 })
        }
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
                        db.query(`update pneu_dimension set statut = $1 where collection = $2`,
                           [req.body.statut, item.collection],
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
                        db.query(`update pneu_moto set statut = $1 where collection = $2`,
                           [req.body.statut, item.collection],
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
                        db.query(`update pneu_poids_lourds set statut = $1 where collection = $2`,
                           [req.body.statut, item.collection],
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
                        db.query(`update pneu_agricole set statut = $1 where collection = $2`,
                           [req.body.statut, item.collection],
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
                        db.query(`update pneu_dimension set promo = $1, id_promo = $2 where collection = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.collection],
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
                        db.query(`update pneu_moto set promo = $1, id_promo = $2 where collection = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.collection],
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
                        db.query(`update pneu_poids_lourds set promo = $1, id_promo = $2 where collection = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.collection],
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
                        db.query(`update pneu_agricole set promo = $1, id_promo = $2 where collection = $3`,
                           [req.body.valeur_promo, req.body.id_promo, item.collection],
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