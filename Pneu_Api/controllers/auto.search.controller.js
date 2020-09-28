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
                        console.log()
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
                db.query('select distinct vitesse from pneu_dimension order by vitesse ASC', (err, results) => {
                    
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var vitesses = results.rows;
                        console.log('vitesse has been sent')
                        return res.json(vitesses)
                    }
                    
                })
            }
        })   
    }
}

exports.searchDimensionMarqueController = (req, res) =>{
//select distinct marque from pneu_dimension where largeur = :largeur and hauteur = :hauteur and diametre = :diametre and charge = :charge vitesse = :vitesse order by charge DESC
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
                db.query('select distinct marque from pneu_dimension order by marque ASC', (err, results) => {
                    
                    done()
                    if(err){
                        console.log(err)
                    }else{
                        var marques = results.rows;
                    console.log('marques has been sent')
                    return res.json(marques)
                    }
                    
                })
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
     //select pneu_id, id_supplier, designation_pneu, collection, largeur, hauteur, diametre, marque, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier order by pneu_id 
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
                                  image_url:pneu_sprix.image_url
                              }
                          )
                      })
                      Array.prototype.push.apply(pneus1,pneus2)
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
            //vitesse !== tous marque !== tous
            const requetegenerale1='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_url from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and marque=$6 order by pneu_id'
            const requete1='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_url from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and marque=$6'
            const parametres1 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.marque]
            //vitesse !== tous et marque == tous 
            const requetegenerale2='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_url from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 order by pneu_id'
            const requete2='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_url from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5'
            const parametres2 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse]
            //vitesse == tous et marque !== tous
            const requetegenerale3='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_url from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 marque=$5 order by pneu_id'
            const requete3='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_url from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and marque=$5'
            const parametres3 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.marque]
            //vitesse == tous et marque == tous
            const requetegenerale4='select pneu_id, designation_pneu, collection, type, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_url from pneu_dimension, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_dimension.pneu_id and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 order by pneu_id'
            const requete4='select pneu_id, designation_pneu, type, collection, marque, marque_img, largeur, hauteur, charge, vitesse, carburant, adherence, bruit, promo, marge, image_url from pneu_dimension where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4'
            const parametres4 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge]
            if(err){
                return res.send(err);
            }else{
                if(req.body.vitesse !== 'Tous' && req.body.marque !== 'Tous'){
                    console.log(req.body)
                    // vitesse = une vitesse & marque = une marque
                    searchFilter(db, requetegenerale1,requete1, parametres1, done)
                   
                }else if(req.body.vitesse !== 'Tous' && req.body.marque === 'Tous'){
                    console.log(req.body)
                    //vitesse = une vitesse & marque = Tous
                    searchFilter(db, requetegenerale2,requete2, parametres2, done)
                   
                }else if(req.body.vitesse === 'Tous' && req.body.marque !== 'Tous'){
                    console.log(req.body)
                    //vitesse = Tous & marque = une marque
                    searchFilter(db, requetegenerale3,requete3, parametres3, done)

                }else{ //vitesse = Tous & marque = Tous
                    console.log(req.body)
                    searchFilter(db, requetegenerale4,requete4, parametres4, done)
                }
            }
        })   
    }

}
