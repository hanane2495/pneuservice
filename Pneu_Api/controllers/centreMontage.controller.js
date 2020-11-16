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



exports.getCentreController = (req, res) =>{
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
                    console.log(req.body.ville)
                    db.query('select * from centre_montage where ville=$1', [req.body.ville] ,(err, results) => {       
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            
                            var cm = results.rows;
                            if(cm.length > 0){
                                console.log(cm)
                                return res.json(cm)
                            }else{
                                return res.json({
                                    message : `Bintot disponible`
                                })
                            }
                            
                        }
                    })
                }
            }) 
    }
}

exports.getAllCentreController = (req, res) =>{
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
                    db.query('select * from centre_montage',(err, results) => {       
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            
                            var cm = results.rows;
                            console.log(cm)
                            return res.json(cm)
                            
                        }
                    })
                }
            }) 
    }
}



//ajouter commande
exports.ajouterCentreController = (req, res) =>{
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
            db.query('insert into centre_montage(nom, ville, telephone, adresse, montage, equilibrage, parallelisme, reparation, latitude, longitude) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
               [req.body.nom, req.body.ville, req.body.telephone, req.body.adresse, req.body.montage, req.body.equilibrage, req.body.parallelisme, req.body.reparation, req.body.latitude, req.body.longitude] ,
               (err, results) => {
                done()
                if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `Le Centre de Montage ${req.body.nom} a été ajouté`
                    })
                    
                }
            })
        }
    })
    }
}


//supprimer commande 
exports.deleteCentreController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        CentreMontage.destroy({
            where: { id_centre_montage: {
                [Op.in] : req.body.listCentreMontage
            }}
        }).then(() => {
            return res.json({
                message : `les centres de montage ${req.body.listCentreMontage} on ete supprimee`
            })
        }).catch(err => {
            console.log(err)
         }) 
    }
}

//update commande 
exports.updateCentreController = (req, res) =>{
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
                console.log(req.body.nom, req.body.ville, req.body.telephone, req.body.adresse, req.body.montage, req.body.equilibrage, req.body.parallelisme, req.body.reparation, req.body.latitude, req.body.longitude, req.body.id_centre_montage)
               db.query(`update centre_montage set nom = $1, ville = $2, telephone = $3, adresse = $4, montage = $5, equilibrage = $6, parallelisme = $7, reparation = $8, latitude = $9, longitude = $10 where  id_centre_montage = $11`,
               [req.body.nom, req.body.ville, req.body.telephone, req.body.adresse, req.body.montage, req.body.equilibrage, req.body.parallelisme, req.body.reparation, req.body.latitude, req.body.longitude, req.body.id_centre_montage] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    console.log(results)
                    return res.json({
                        message : `Le centre de montage ${req.body.nom} a été modifiée`
                    })
                }
               })
            }
        })
    }
}

