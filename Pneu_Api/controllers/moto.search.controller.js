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

//marque_img

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
const PneuMoto = require('../models/pneu.moto.model')

//bring our helpers
const { errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')


//recherche poids lourd par dimension 
exports.searchLargeurController = (req, res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        db.query("select distinct largeur from pneu_moto order by largeur ASC", { type: sequelize.QueryTypes.SELECT})
        .then(x => {
            return res.json(x.sort())
            
        }).catch(err => {
            res.send('error :' + err)
        }) 
    }
}


exports.searchHauteurController = (req, res) =>{

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
                db.query('select distinct hauteur from pneu_moto where largeur = $1 order by hauteur ASC',[req.body.largeur] ,(err, results) => {
                    done()
                    if(err){
                       console.log(err)
                    }else{
                        var hauteurs = results.rows;
                        console.log(hauteurs)
                        return res.json(hauteurs)
                    }
                })
            }
        }) 
    }
}

exports.searchDiametreController = (req, res) =>{

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
                db.query('select distinct diametre from pneu_moto where largeur = $1 and hauteur = $2 order by diametre ASC',[req.body.largeur, req.body.hauteur] ,(err, results) => {
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


exports.searchChargeController = (req, res) =>{
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
                    db.query('select distinct charge from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 order by charge ASC',[req.body.largeur, req.body.hauteur, req.body.diametre] ,(err, results) => {
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
    
exports.searchVitesseController = (req, res) =>{
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
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        if(req.body.charge !== 'Tous'){
                            db.query('select distinct vitesse from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 order by vitesse ASC',[req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge] ,(err, results) => {
                                done()
                                if(err){
                                    console.log(err)
                                }else{
                                    var vitesses = results.rows;
                                    console.log(vitesses)
                                    return res.json(vitesses)
                                }
                            })
                        }else{
                            db.query('select distinct vitesse from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 order by vitesse ASC',[req.body.largeur, req.body.hauteur, req.body.diametre] ,(err, results) => {
                                done()
                                if(err){
                                    console.log(err)
                                }else{
                                    var vitesses = results.rows;
                                    console.log(vitesses)
                                    return res.json(vitesses)
                                }
                            })
                        }
                       
                    }
                })  
                done()
            }
        })   
    }
}
    

exports.searchTypeController = (req, res) =>{
    const errors = validationResult(req)
    //les requetes de filtre
    const requete1 = 'select distinct type from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 and vitesse = $5 order by type ASC'
    const requete2 = 'select distinct type from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 order by type ASC'
    const requete3 = 'select distinct type from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and vitesse = $4 order by type ASC'
    const requete4 = 'select distinct type from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 order by type ASC'

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


exports.searchPositionController = (req, res) =>{
    const errors = validationResult(req)

    //les requetes de filtre
    const requete1 = 'select distinct position from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge=$4 and vitesse = $5 order by position ASC'
    const requete2 = 'select distinct position from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge=$4 order by position ASC'
    const requete3 = 'select distinct position from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and vitesse = $4 order by position ASC'
    const requete4 = 'select distinct position from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 order by position ASC'

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


exports.searchMarqueController = (req, res) =>{
    const errors = validationResult(req)
    //les requetes de filtre
    const requete1 = 'select distinct marque from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 and vitesse=$5 order by marque ASC'
    const requete2 = 'select distinct marque from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and charge = $4 order by marque ASC'
    const requete3 = 'select distinct marque from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 and vitesse = $4 order by position ASC'
    const requete4 = 'select distinct marque from pneu_moto where largeur = $1 and hauteur = $2 and diametre = $3 order by position ASC'

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

//envoyer resultat de la recherche
exports.searchPneusController = (req, res) => {
    //select pneu_id_pl, designation, collection, type, marque, marque_img, largeur, hauteur, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img, promo from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and largeur='265' and hauteur='70' and diametre='17.5' and type='REGIONAL' and position='ARRIERE' and marque='MICHELIN' order by pneu_id_pl
        const errors = validationResult(req)
   
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
                             //id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img
                             {
                                pneu_id:pneu_sprix.id_pneu_m,
                                designation:pneu_sprix.designation_m,
                                collection:pneu_sprix.collection,
                                type:pneu_sprix.type,
                                marque:pneu_sprix.marque,
                                largeur:pneu_sprix.largeur,
                                hauteur:pneu_sprix.hauteur,
                                diametre:pneu_sprix.diametre,
                                charge:pneu_sprix.charge,
                                vitesse:pneu_sprix.vitesse,
                                position:pneu_sprix.position,
                                carburant:pneu_sprix.carburant,
                                adherence:pneu_sprix.adherence,
                                bruit:pneu_sprix.bruit,
                                promo:pneu_sprix.promo,
                                price:0,
                                image_pneu:pneu_sprix.image_pneu,
                                image_1:pneu_sprix.image_1,
                                image_2:pneu_sprix.image_2,
                                marque_img:pneu_sprix.marque_img
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
           //type de pneu !== tous position !== tous marque !== tous charge !== tous vitesse !== tous
           const requetegenerale1='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 and marque=$8 order by id_pneu_m'
           const requete1='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 and marque=$8 order by id_pneu_m'
           const parametres1 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.type, req.body.position, req.body.marque]

           //type de pneu === tous position !== tous marque !== tous charge !== tous vitesse !== tous
           const requetegenerale2='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and position=$6 and marque=$7 order by id_pneu_m'
           const requete2='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, position, diametre, charge, vitesse, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 and marque=$8 order by id_pneu_m'
           const parametres2 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.type, req.body.marque]

           //type de pneu !== tous position === tous marque !== tous charge !== tous vitesse !== tous
           const requetegenerale3='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and marque=$7 order by id_pneu_m'
           const requete3='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and marque=$7 order by id_pneu_m'
           const parametres3 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.type, req.body.marque]

           //type de pneu !== tous position !== tous marque === tous charge !== tous vitesse !== tous
           const requetegenerale4='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 order by id_pneu_m'
           const requete4='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 order by id_pneu_m'
           const parametres4 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.type, req.body.position]

           //type de pneu !== tous position !== tous marque !== tous charge === tous vitesse !== tous
           const requetegenerale5='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 and type=$5 and position=$6 and marque=$7 order by id_pneu_m'
           const requete5='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 and type=$5 and position=$6 and marque=$7 order by id_pneu_m'
           const parametres5 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.vitesse, req.body.type, req.body.position, req.body.marque]

          //type de pneu !== tous position !== tous marque !== tous charge !== tous vitesse === tous
           const requetegenerale6='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 and marque=$8 order by id_pneu_m'
           const requete6='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 and type=$6 and position=$7 and marque=$8 order by id_pneu_m'
           const parametres6 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type, req.body.marque]

          //type de pneu !== tous position === tous marque === tous charge === tous vitesse === tous
           const requetegenerale7='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 order by id_pneu_m'
           const requete7='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 order by id_pneu_m'
           const parametres7 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type]

           //type de pneu === tous position !== tous marque === tous charge === tous vitesse === tous
           const requetegenerale8='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and position=$4 order by id_pneu_m'
           const requete8='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and position=$4 order by id_pneu_m'
           const parametres8 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.position]

          //type de pneu === tous position === tous marque !== tous charge === tous vitesse === tous
           const requetegenerale9='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 order by id_pneu_m'
           const requete9='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 order by id_pneu_m'
           const parametres9 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.marque]

          //type de pneu === tous position === tous marque === tous charge !== tous vitesse === tous
           const requetegenerale10='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 order by id_pneu_m'
           const requete10='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 order by id_pneu_m'
           const parametres10 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge]

          //type de pneu === tous position === tous marque === tous charge === tous vitesse !== tous
           const requetegenerale11='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 order by id_pneu_m'
           const requete11='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and vitesse=$4 order by id_pneu_m'
           const parametres11 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.vitesse]

           //type de pneu === tous position === tous marque !== tous charge !== tous vitesse !== tous
           const requetegenerale12='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and and marque=$4 and charge=$5 and vitesse=$6 order by id_pneu_m'
           const requete12='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 and charge=$5 and vitesse=$6 order by id_pneu_m'
           const parametres12 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.marque, req.body.charge, req.body.vitesse]

            //type de pneu !== tous position === tous marque === tous charge !== tous vitesse !== tous
            const requetegenerale13='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and charge=$5 vitesse=$6 order by id_pneu_m'
            const requete13='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and charge=$5 and vitesse=$6 order by id_pneu_m'
            const parametres13 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type, req.body.charge, req.body.vitesse]

            //type de pneu !== tous position !== tous marque === tous charge === tous vitesse !== tous
            const requetegenerale14='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and position=$5 and vitesse=$6 order by id_pneu_m'
            const requete14='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and position=$5 and vitesse=$6 order by id_pneu_m'
            const parametres14 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type, req.body.position, req.body.vitesse]

            //type de pneu !== tous position !== tous marque !== tous charge === tous vitesse === tous
            const requetegenerale15='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and position=$5 and marque=$6 order by id_pneu_m'
            const requete15='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and position=$5 and marque=$6 order by id_pneu_m'
            const parametres15 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type, req.body.position, req.body.marque]

            //type de pneu !== tous position !== tous marque === tous charge === tous vitesse === tous
            const requetegenerale16='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and position=$5 order by id_pneu_m'
            const requete16='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and position=$5 order by id_pneu_m'
            const parametres16 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type, req.body.position]

            //type de pneu === tous position !== tous marque !== tous charge === tous vitesse === tous
            const requetegenerale17='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and position=$4 and marque=$5 order by id_pneu_m'
            const requete17='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and position=$4 and marque=$5 order by id_pneu_m'
            const parametres17 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.position, req.body.marque]

            //type de pneu === tous position === tous marque !== tous charge !== tous vitesse === tous
            const requetegenerale18='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 and charge=$5 order by id_pneu_m'
            const requete18='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 and charge=$5 order by id_pneu_m'
            const parametres18 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.marque, req.body.charge]

           //type de pneu === tous position === tous marque === tous charge !== tous vitesse !== tous
           const requetegenerale19='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 order by id_pneu_m'
           const requete19='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 and charge=$4 and vitesse=$5 order by id_pneu_m'
           const parametres19 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse]

           //type de pneu === tous position === tous marque === tous charge === tous vitesse === tous
           const requetegenerale20='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(stock.price,0) as price, image_pneu, image_1, image_2, marque_img from pneu_moto, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_moto.id_pneu_m and mapping_pneu_four.id_pneu_fournisseur = stock.suppliers_code and mapping_pneu_four.designation = pneu_moto.designation_m and largeur=$1 and hauteur=$2 and diametre=$3 order by id_pneu_m'
           const requete20='select id_pneu_m, designation_m, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, marque_img from pneu_moto where largeur=$1 and hauteur=$2 and diametre=$3 order by id_pneu_m'
           const parametres20 = [req.body.largeur, req.body.hauteur, req.body.diametre]


           if(err){
               return res.send(err);
           }else{
               if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque !== 'Tous' && req.body.charge !=='Tous' && req.body.vitesse !=='Tous'){
                   searchFilter(db, requetegenerale1,requete1, parametres1, done)
                   console.log('requetegenerale1')
               }else if(req.body.type === 'Tous' && req.body.position !== 'Tous' && req.body.marque !== 'Tous' && req.body.charge !=='Tous' && req.body.vitesse !=='Tous'){
                   //type de pneu === x position == tous marque == tous
                   searchFilter(db, requetegenerale2,requete2, parametres2, done)
                   console.log('requetegenerale2')
               }else if(req.body.type !== 'Tous' && req.body.position === 'Tous' && req.body.marque !== 'Tous' && req.body.charge !=='Tous' && req.body.vitesse !=='Tous'){
                   //type de pneu === tous position == x marque == tous
                   searchFilter(db, requetegenerale3,requete3, parametres3, done)
                   console.log('requetegenerale3')
               }else if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque === 'Tous' && req.body.charge !=='Tous' && req.body.vitesse !=='Tous'){
                    //type de pneu === tous position == tous marque == x
                    searchFilter(db, requetegenerale4,requete4, parametres4, done)
                    console.log('requetegenerale4')
                }else if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque !== 'Tous' && req.body.charge ==='Tous' && req.body.vitesse !=='Tous'){
                    //type de pneu === tous position == x marque == x
                    searchFilter(db, requetegenerale5,requete5, parametres5, done)
                    console.log('requetegenerale5')
                }else if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque !== 'Tous' && req.body.charge !=='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == tous marque == x
                    searchFilter(db, requetegenerale6,requete6, parametres6, done)
                    console.log('requetegenerale6')
                }else if(req.body.type !== 'Tous' && req.body.position === 'Tous' && req.body.marque === 'Tous' && req.body.charge ==='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale7,requete7, parametres7, done)
                    console.log('requetegenerale7')
                }else if(req.body.type === 'Tous' && req.body.position !== 'Tous' && req.body.marque === 'Tous' && req.body.charge ==='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale8,requete8, parametres8, done)
                    console.log('requetegenerale8')
                }else if(req.body.type === 'Tous' && req.body.position === 'Tous' && req.body.marque !== 'Tous' && req.body.charge ==='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale9,requete9, parametres9, done)
                    console.log('requetegenerale9')
                }else if(req.body.type === 'Tous' && req.body.position === 'Tous' && req.body.marque === 'Tous' && req.body.charge !=='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale10,requete10, parametres10, done)
                    console.log('requetegenerale10')
                }else if(req.body.type === 'Tous' && req.body.position === 'Tous' && req.body.marque === 'Tous' && req.body.charge ==='Tous' && req.body.vitesse !=='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale11,requete11, parametres11, done)
                    console.log('requetegenerale11')
                }else if(req.body.type === 'Tous' && req.body.position === 'Tous' && req.body.marque !== 'Tous' && req.body.charge !=='Tous' && req.body.vitesse !=='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale12,requete12, parametres12, done)
                    console.log('requetegenerale12')
                }else if(req.body.type !== 'Tous' && req.body.position === 'Tous' && req.body.marque === 'Tous' && req.body.charge !=='Tous' && req.body.vitesse !=='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale13,requete13, parametres13, done)
                    console.log('requetegenerale13')
                }else if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque === 'Tous' && req.body.charge ==='Tous' && req.body.vitesse !=='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale14, requete14, parametres14, done)
                    console.log('requetegenerale14')
                }else if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque !== 'Tous' && req.body.charge ==='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale15, requete15, parametres15, done)
                    console.log('requetegenerale15')
                }else if(req.body.type !== 'Tous' && req.body.position !== 'Tous' && req.body.marque === 'Tous' && req.body.charge ==='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale16, requete16, parametres16, done)
                    console.log('requetegenerale16')
                }else if(req.body.type === 'Tous' && req.body.position !== 'Tous' && req.body.marque !== 'Tous' && req.body.charge ==='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale17, requete17, parametres17, done)
                    console.log('requetegenerale17')
                }else if(req.body.type === 'Tous' && req.body.position === 'Tous' && req.body.marque !== 'Tous' && req.body.charge !=='Tous' && req.body.vitesse ==='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale18, requete18, parametres18, done)
                    console.log('requetegenerale18')
                }else if(req.body.type === 'Tous' && req.body.position === 'Tous' && req.body.marque === 'Tous' && req.body.charge !=='Tous' && req.query.vitesse !=='Tous'){
                    //type de pneu === x position == x marque == tous
                    searchFilter(db, requetegenerale19,requete19, parametres19, done)
                    console.log('requetegenerale19')
                }else{ //type de pneu === tous position == tous marque == tous
                    searchFilter(db, requetegenerale20,requete20, parametres20, done)
                    console.log('requetegenerale20')
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
                    db.query('select * from pneu_moto order by designation_m ASC',(err, results) => {
                        
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
                    db.query('insert into pneu_moto(categorie, type, position, marque, collection, largeur, hauteur, diametre, charge, vitesse, designation_m, carburant, adherence, bruit, marge, image_pneu, image_1, image_2, marque_img, promo ) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
                      [req.body.categorie, req.body.type, req.body.position, req.body.marque, req.body.collection, req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.designation_m, req.body.carburant, req.body.adherence, req.body.bruit, req.body.marge, req.body.image_pneu, req.body.image_1, req.body.image_2, req.body.marque_img, req.body.promo] ,
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
        PneuMoto.destroy({
            where: {
                id_pneu_m : {
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
               db.query(`update pneu_dimension set categorie = $1, type = $2, position = $3, marque = $4, collection = $5, largeur = $6, hauteur = $7, diametre = $8, charge = $9, vitesse = $10, designation_m = $11, carburant = $12, adherence = $13, bruit = $14, marge = $15, image_pneu = $16, image_1 = $17, image_2 = $18, marque_img = $19, promo = $20  where pneu_id = $21`,
               [req.body.categorie, req.body.type, req.body.position, req.body.marque, req.body.collection, req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.designation_m, req.body.carburant, req.body.adherence, req.body.bruit, req.body.marge, req.body.image_pneu, req.body.image_1, req.body.image_2, req.body.marque_img, req.body.promo, req.body.id_pneu_m] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `Le pneu avec l'ID : ${req.body.id_pneu_m} a été modifiée`
                    })
                }
               })
            }
        })
    }
    
}




