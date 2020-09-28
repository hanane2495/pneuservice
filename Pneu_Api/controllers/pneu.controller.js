//My libraries
const _ = require('lodash')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const sequelize = require('sequelize')
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
const PneuDimension = require('../models/pneu.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')

//pneu auto 
exports.detailPneuAutoController = (req, res) =>{
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
                db.query('select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_url from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and pneu_id = $1',
                [req.body.id] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var pneu = results.rows
                        if(results.rows.length == 0 ){
                            db.query('select * from pneu_dimension where pneu_id = $1',
                            [req.body.id] ,(err, results) => {
                                if(err){
                                console.log(err)
                                }else{
                                    var pneu2 = [];
                                    results.rows.forEach(pneu_sprix => {
                                        pneu2.push(
                                            {
                                                pneu_id:pneu_sprix.pneu_id,
                                                designation:pneu_sprix.designation_pneu,
                                                collection:pneu_sprix.collection,
                                                marque:pneu_sprix.marque,
                                                marque_img : pneu_sprix.marque_img,
                                                type:pneu_sprix.type,
                                                largeur:pneu_sprix.largeur,
                                                hauteur:pneu_sprix.hauteur,
                                                charge:pneu_sprix.charge,
                                                vitesse:pneu_sprix.vitesse,
                                                carburant:pneu_sprix.carburant,
                                                adherence:pneu_sprix.adherence,
                                                bruit:pneu_sprix.bruit,
                                                promo:pneu_sprix.promo,
                                                price:0,
                                                image_url:pneu_sprix.image_url
                                            }
                                        )
                                    })
                                    return res.json(pneu2)
                                }
                            })
                        }else{
                            return res.json(pneu)
                        }
                       
                    }
                })
            }
        })  
 
    }
}

//pneu moto
exports.detailPneuMotoController = (req, res) =>{
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
                db.query('select id_pneu_m, designation_m, collection, type, marque, image_marque, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and id_pneu_m = $1',
                [req.body.id] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var pneu = results.rows
                        if(results.rows.length == 0 ){
                            db.query('select * from pneu_moto where id_pneu_m = $1',
                            [req.body.id] ,(err, results) => {
                                if(err){
                                console.log(err)
                                }else{
                                    var pneu2 = [];
                                    results.rows.forEach( pneu_sprix => {
                                        pneu2.push(
                                            {
                                                pneu_id:pneu_sprix.id_pneu_m,
                                                designation:pneu_sprix.designation_m,
                                                collection:pneu_sprix.collection,
                                                marque:pneu_sprix.marque,
                                                type:pneu_sprix.type,
                                                position:pneu_sprix.position,
                                                largeur:pneu_sprix.largeur,
                                                hauteur:pneu_sprix.hauteur,
                                                charge:pneu_sprix.charge,
                                                vitesse:pneu_sprix.vitesse,
                                                carburant:pneu_sprix.carburant,
                                                adherence:pneu_sprix.adherence,
                                                bruit:pneu_sprix.bruit,
                                                promo:pneu_sprix.promo,
                                                price:0,
                                                image_url:pneu_sprix.image_pneu,
                                                marque_img : pneu_sprix.image_marque,
                                                image_1: pneu_sprix.image_1,
                                                image_2:pneu_sprix.image_2
                                            }
                                        )
                                    })
                                    return res.json(pneu2)
                                }
                            })
                        }else{
                            return res.json(pneu)
                        }
                       
                    }
                })
            }
        })  
 
    }
}

//pneu poids lourd
exports.detailPneuPLController = (req, res) =>{
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
                db.query('select id_pneu_pl, designation_pl, collection, type, marque, img_marque, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu from pneu_poids_lourds, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_poids_lourds.id_pneu_pl and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and id_pneu_pl = $1',
                [req.body.id] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var pneu = results.rows
                        if(results.rows.length == 0 ){
                            db.query('select * from pneu_poids_lourds where id_pneu_pl = $1',
                            [req.body.id] ,(err, results) => {
                                if(err){
                                console.log(err)
                                }else{
                                    var pneu2 = [];
                                    results.rows.forEach( pneu_sprix => {
                                        pneu2.push(
                                            {
                                                pneu_id:pneu_sprix.id_pneu_pl,
                                                designation:pneu_sprix.designation_pl,
                                                collection:pneu_sprix.collection,
                                                marque:pneu_sprix.marque,
                                                type:pneu_sprix.type,
                                                position:pneu_sprix.position,
                                                largeur:pneu_sprix.largeur,
                                                hauteur:pneu_sprix.hauteur,
                                                charge:pneu_sprix.charge,
                                                vitesse:pneu_sprix.vitesse,
                                                carburant:pneu_sprix.carburant,
                                                adherence:pneu_sprix.adherence,
                                                bruit:pneu_sprix.bruit,
                                                promo:pneu_sprix.promo,
                                                price:0,
                                                image_url:pneu_sprix.image_pneu,
                                                marque_img : pneu_sprix.img_marque,
                                                image_1 : pneu_sprix.image_1,
                                                image_2 : pneu_sprix.image_2
                                            }
                                        )
                                    })
                                    return res.json(pneu2)
                                }
                            })
                        }else{
                            return res.json(pneu)
                        }
                       
                    }
                })
            }
        })  
 
    }
}

//pneu Agricole
exports.detailPneuAgricoleController = (req, res) =>{
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
                db.query('select id_pneu_ag, designation_ag, collection, type, marque, image_marque, largeur, hauteur, charge, vitesse, plis, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu from pneu_agricole, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_agricole.id_pneu_ag and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and id_pneu_ag = $1',
                [req.body.id] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var pneu = results.rows
                        if(results.rows.length == 0 ){
                            db.query('select * from pneu_agricole where id_pneu_ag = $1',
                            [req.body.id] ,(err, results) => {
                                if(err){
                                console.log(err)
                                }else{
                                    var pneu2 = [];
                                    results.rows.forEach( pneu_sprix => {
                                        pneu2.push(
                                            {
                                                pneu_id:pneu_sprix.pneu_id,
                                                designation:pneu_sprix.designation_pneu,
                                                collection:pneu_sprix.collection,
                                                marque:pneu_sprix.marque,
                                                type:pneu_sprix.type,
                                                largeur:pneu_sprix.largeur,
                                                hauteur:pneu_sprix.hauteur,
                                                charge:pneu_sprix.charge,
                                                vitesse:pneu_sprix.vitesse,
                                                plis:pneu_sprix.plis,
                                                carburant:pneu_sprix.carburant,
                                                adherence:pneu_sprix.adherence,
                                                bruit:pneu_sprix.bruit,
                                                promo:pneu_sprix.promo,
                                                price:0,
                                                image_pneu:pneu_sprix.image_pneu,
                                                image_marque:pneu_sprix.image_marque
                                            }
                                        )
                                    })
                                    return res.json(pneu2)
                                }
                            })
                        }else{
                            return res.json(pneu)
                        }
                       
                    }
                })
            }
        })  
 
    }
}

//livraison 
exports.livraisonController = (req, res) =>{
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
                db.query('select * from livraison where categorie=$1 order by wilaya ASC',[req.body.categorie] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var livraison = results.rows;
                        console.log(livraison)
                        return res.json(livraison)
                    }
                })
            }
        })
    }
}