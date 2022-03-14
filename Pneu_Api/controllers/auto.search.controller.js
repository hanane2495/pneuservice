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

//image_pneu

function filter_search_inputs(res, db, done, requete, params){
    db.query(`${requete}`,params ,(err, results) => {
        done()
        if(err){
            console.log(err)
        }else{
            var search_item = results.rows;
            return res.json(search_item)
        }
    })
}

//bring our models
const PneuDimension = require('../models/pneu.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')

//recherche par dimension 
exports.searchDimensionLargeurController = (req, res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        db.query("select distinct largeur from pneu_dimension order by largeur ASC", { type: sequelize.QueryTypes.SELECT})
        .then(x => {
            return res.json(x.sort())
            
        }).catch(err => {
            res.send('error :' + err)
         }) 
    }
}

exports.searchDimensionHauteurController = (req, res) =>{

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
                db.query('select distinct hauteur from pneu_dimension where largeur = $1 order by hauteur ASC',[req.body.largeur] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var hauteurs = results.rows;
                        return res.json(hauteurs)
                    }
                })
            }
        })  
    }
}

exports.searchDimensionDiametreController = (req, res) =>{
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
                db.query('select distinct diametre from pneu_dimension where largeur = $1 and hauteur = $2 order by diametre ASC',[req.body.largeur, req.body.hauteur] ,(err, results) => {
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var diametres = results.rows;
                        return res.json(diametres)
                    }
                    
                })
            }
        })  
    }
}

exports.searchDimensionChargeController = (req, res) =>{
//select distinct charge from pneu_dimension where largeur = :largeur and hauteur = :hauteur and diametre = :diametre order by charge DESC
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
                db.query('select distinct charge from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 order by charge ASC',[req.body.largeur, req.body.hauteur, req.body.diametre] ,(err, results) => {
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var charges = results.rows;
                        return res.json(charges)
                    }
                })
            }
        })  
    }
}

exports.searchDimensionVitesseController = (req, res) =>{
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
                if(req.body.charge === 'Tous'){
                    db.query('select distinct vitesse from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 order by vitesse ASC',[req.body.largeur, req.body.hauteur, req.body.diametre] ,(err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var charges = results.rows;
                            console.log(results.rows)
                            return res.json(charges)
                        }
                    })
                }else{
                    db.query('select distinct vitesse from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 order by vitesse ASC',[req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge] ,(err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var charges = results.rows;
                            console.log(results.rows)
                            return res.json(charges)
                        }
                    })
                }
            }
        })   
    }
}

exports.searchDimensionMarqueController = (req, res) =>{
//select distinct marque from pneu_dimension where largeur = :largeur and hauteur = :hauteur and diametre = :diametre and charge = :charge vitesse = :vitesse order by charge DESC
    const errors = validationResult(req)

    //les requetes de filtre
    const requete1 = 'select distinct marque from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 and vitesse = $5 order by marque ASC'
    const requete2 = 'select distinct marque from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 order by marque ASC'
    const requete3 = 'select distinct marque from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 and vitesse = $4 order by marque ASC'
    const requete4 = 'select distinct marque from pneu_dimension where largeur = $1 and hauteur = $2 and diametre = $3 order by marque ASC'

    //les parametre de la requete
    const params1 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse]
    const params2 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge]
    const params3 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.vitesse]
    const params4 = [req.body.largeur, req.body.hauteur, req.body.diametre]

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
                if(req.body.charge !== 'Tous' && req.body.vitesse !== 'Tous' ){
                    filter_search_inputs(res, db, done, requete1, params1)
                }else if(req.body.charge !== 'Tous' && req.body.vitesse === 'Tous' ){
                    filter_search_inputs(res, db, done, requete2, params2)
                }else if(req.body.charge === 'Tous' && req.body.vitesse !== 'Tous'){
                    filter_search_inputs(res, db, done, requete3, params3)
                }else{
                    filter_search_inputs(res, db, done, requete4, params4)
                }
                
            }
        }) 
    }
}


//recherche par vehicule
exports.searchVehiculeMarqueController = (req, res) =>{
//select distinct brand from pneu_vehicule order by brand DESC
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
                db.query('select distinct brand from pneu_vehicule order by brand ASC' ,(err, results) => {
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var marques = results.rows;
                        return res.json(marques)
                    }
                    
                })
            }
        })  
    }
}

exports.searchVehiculeModeleController = (req, res) =>{
//select distinct model from pneu_vehicule where brand = :brand order by brand DESC
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
                db.query('select distinct model from pneu_vehicule where brand = $1 order by model ASC',[req.body.marque] ,(err, results) => {
                    
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var modeles = results.rows;
                        console.log('modeles has been sent')
                        return res.json(modeles)
                    }
                    
                })
            }
        })  
    }
}

exports.searchVehiculeMotorisationController = (req, res) =>{
    //select distinct engine from pneu_vehicule where brand = :brand and model = :model order by brand DESC
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
                db.query('select distinct engine from pneu_vehicule where brand = $1 and model = $2 order by engine ASC',[req.body.marque, req.body.modele] ,(err, results) => {
                    
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var motorisations = results.rows;
                        return res.json(motorisations)
                    }
                    
                })
            }
        })   
    }
}

exports.searchVehiculeAnneeController = (req, res) =>{
//select distinct ad from pneu_vehicule where brand = :brand and model = :model and engine = :engine order by brand DESC
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
                db.query('select distinct ad from pneu_vehicule where brand = $1 and model = $2 and engine = $3 order by ad ASC',[req.body.marque, req.body.modele, req.body.motorisation] ,(err, results) => {
                    
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var annees = results.rows;
                        return res.json(annees)
                    }
                    
                })
            }
        })  
    }
}

exports.searchVehiculeTailleController= (req, res) =>{
//select distinct dimension_complete from pneu_vehicule where brand = :brand and model = :model and engine = :engine and ad = :ad order by brand DESC
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
                db.query('select distinct dimension_complete from pneu_vehicule where brand = $1 and model = $2 and engine = $3 and ad = $4 order by dimension_complete ASC',[req.body.marque, req.body.modele, req.body.motorisation, req.body.annee] ,(err, results) => {
                    
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var tailles = results.rows;
                        return res.json(tailles)
                    }
                })
            }
        })  
    }
}


//get largeur, hauteur, diametre, charge, vitesse for recherche par vehicule
exports.searchGetParamsVehicule= (req, res) =>{
    //select distinct dimension_complete from pneu_vehicule where brand = :brand and model = :model and engine = :engine and ad = :ad order by brand DESC
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
                    db.query('select distinct largeur, hauteur, diametre, charge, vitesse from pneu_vehicule where brand=$1 and model=$2 and engine=$3 and ad=$4 and dimension_complete=$5', [req.body.marque, req.body.modele, req.body.motorisation, req.body.annee, req.body.taille] ,(err, results) => {
                        
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var parms = results.rows;
                            console.log(parms)
                            return res.json(parms)
                        }
                    })
                }
            })  
        }
    }
    

//envoyer resultat de la recherche
exports.searchPneusController = (req, res) => {
     //select pneu_id, designation_pneu, collection, marque, carburant, adherence, bruit, promo, marge from pneu_dimension where largeur=:largeur and hauteur=:hauteur and diametre=:diametre and charge=:charge 
     //select pneu_id, suppliers_code, designation_pneu, collection, largeur, hauteur, diametre, marque, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code order by pneu_id 
     const errors = validationResult(req)

     //two arrays in one without duplicates
     /*function merge_array(array1, array2) {
        var result_array = [];
        var arr = array1.concat(array2);
        var len = arr.length;
        var assoc = {};
    
        while(len--) {
            var item = arr[len];
    
            if(!assoc[item]) 
            { 
                result_array.unshift(item);
                assoc[item] = true;
            }
        }
    
        return result_array;
    }*/
    
    function searchFilter(db, requete1, requete2, parametres, done){
        db.query(requete1, parametres,
        (err, results) => {
             if(err){
                 return res.send(err)
             }else{
                  var pneus1 = results.rows;
                  var pneus2 = []
                  db.query(requete2, parametres,
                  (err, results) =>{
                      done()
                      if(err){
                          console.log(err)
                      }else{
                      var pneus_sprix  = results.rows
                      pneus_sprix.forEach(pneu_sprix => {
                          pneus2.push(
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
                                  image_pneu:pneu_sprix.image_pneu
                              }
                          )
                      })
                      Array.prototype.push.apply(pneus1,pneus2)
                      console.log(pneus1)
                      return res.json(pneus1)
                    }   
                })   
            }
        })
    }

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        pool.connect((err, db, done) => {
            //charge !== tous vitesse !== tous marque !== tous 
            const requetegenerale1='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and marque=$6 order by pneu_id'
            const requete1='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and marque=$6'
            const parametres1 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.marque]
            //charge == tous vitesse !== tous marque !== tous  
            const requetegenerale2='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 and marque=$5 order by pneu_id'
            const requete2='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 and marque=$5'
            const parametres2 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.vitesse, req.body.marque]
            //charge !== tous vitesse == tous marque !== tous 
            const requetegenerale3='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 marque=$5 order by pneu_id'
            const requete3='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and marque=$5'
            const parametres3 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.marque]
            //charge !== tous vitesse !== tous marque == tous 
            const requetegenerale4='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 order by pneu_id'
            const requete4='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5'
            const parametres4 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse]
            //charge !== tous vitesse == tous marque == tous 
            const requetegenerale5='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 order by pneu_id'
            const requete5='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4'
            const parametres5 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge]
            //charge == tous vitesse !== tous marque == tous 
            const requetegenerale6='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 order by pneu_id'
            const requete6='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4'
            const parametres6 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.vitesse]
            //charge == tous vitesse == tous marque !== tous 
            const requetegenerale7='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 order by pneu_id'
            const requete7='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4'
            const parametres7 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.marque]
            //charge == tous vitesse == tous marque == tous 
            const requetegenerale8='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur=$1 and hauteur=$2 and diametre=$3 order by pneu_id'
            const requete8='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3'
            const parametres8 = [req.body.largeur, req.body.hauteur, req.body.diametre]
            if(err){
                return res.send(err);
            }else{
                if(req.body.charge !== 'Tous' && req.body.vitesse !== 'Tous' && req.body.marque !== 'Tous'){
                    console.log(req.body)
                    // vitesse = une vitesse & marque = une marque
                    searchFilter(db, requetegenerale1,requete1, parametres1, done)
                   
                }else if(req.body.charge === 'Tous' && req.body.vitesse !== 'Tous' && req.body.marque !== 'Tous'){
                    console.log(req.body)
                    //vitesse = une vitesse & marque = Tous
                    searchFilter(db, requetegenerale2,requete2, parametres2, done)
                   
                }else if(req.body.charge !== 'Tous' && req.body.vitesse === 'Tous' && req.body.marque !== 'Tous'){
                    console.log(req.body)
                    //vitesse = Tous & marque = une marque
                    searchFilter(db, requetegenerale3,requete3, parametres3, done)

                }else if(req.body.charge !== 'Tous' && req.body.vitesse !== 'Tous' && req.body.marque === 'Tous'){
                    console.log(req.body)
                    //vitesse = Tous & marque = une marque
                    searchFilter(db, requetegenerale4,requete4, parametres4, done)

                }else if(req.body.charge !== 'Tous' && req.body.vitesse === 'Tous' && req.body.marque === 'Tous'){
                    console.log(req.body)
                    //vitesse = Tous & marque = une marque
                    searchFilter(db, requetegenerale5,requete5, parametres5, done)

                }else if(req.body.charge === 'Tous' && req.body.vitesse !== 'Tous' && req.body.marque === 'Tous'){
                    console.log(req.body)
                    //vitesse = Tous & marque = une marque
                    searchFilter(db, requetegenerale6,requete6, parametres6, done)

                }else if(req.body.charge === 'Tous' && req.body.vitesse === 'Tous' && req.body.marque !== 'Tous'){
                    console.log(req.body)
                    //vitesse = Tous & marque = une marque
                    searchFilter(db, requetegenerale7,requete7, parametres7, done)

                }else{ //vitesse = Tous & marque = Tous
                    console.log(req.body)
                    searchFilter(db, requetegenerale8, requete8, parametres8, done)
                }
            }
        })   
    }

}

//get pneu auto
exports.getPneusController = (req, res) => {
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
                    db.query('select * from pneu_dimension order by designation_pneu ASC',(err, results) => {
                        
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            var parms = results.rows;
                            return res.json(parms)
                        }
                    })
                }
            })  
        }
}

//add pneu auto
exports.addPneuController = (req, res) => {
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
                    db.query('insert into pneu_dimension(designation_pneu, marque, collection, type, largeur, hauteur, diametre, charge, vitesse, marge, statut, carburant, adherence, bruit, promo ) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
                      [req.body.designation_pneu, req.body.marque, req.body.collection, req.body.type, req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.marge, req.body.statut, req.body.carburant, req.body.adherence, req.body.bruit, req.body.promo] ,
                      (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            return res.json({
                                message : `Pneu Ajouté avec succes`
                            })
                        }
                    })
                }
            })  
        }
}

//delete pneu auto
exports.deletePneuController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        PneuDimension.destroy({
            where: {
                pneu_id : {
                    [Op.in] : req.body.listPneu
                }
            }
        }).then(() => {
            return res.json({
                message : `suppression terminée`
            })
        }).catch(err => {
            console.log(err)
         }) 
    }
}

//update commande 
exports.updatePneuController = (req, res) =>{
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
               db.query(`update pneu_dimension set designation_pneu = $1, marque = $2, collection = $3, type = $4, largeur = $5, hauteur =$6, diametre = $7, charge =$8, vitesse =$9, marge = $10, statut = $11, carburant = $12, adherence = $13, bruit = $14, promo = $15 where pneu_id = $16`,
               [req.body.designation_pneu, req.body.marque, req.body.collection, req.body.type, req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.marge, req.body.statut, req.body.carburant, req.body.adherence, req.body.bruit, req.body.promo, req.body.pneu_id] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `Le pneu avec l'ID : ${req.body.pneu_id} a été modifiée`
                    })
                }
               })
            }
        })
    }
}




