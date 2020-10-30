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


//recherche agricole par dimension 
exports.searchLargeurController = (req, res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        db.query("select distinct largeur from pneu_agricole order by largeur ASC", { type: sequelize.QueryTypes.SELECT})
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
                db.query('select distinct hauteur from pneu_agricole where largeur = $1 order by hauteur ASC',[req.body.largeur] ,(err, results) => {
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
                db.query('select distinct diametre from pneu_agricole where largeur = $1 and hauteur = $2 order by diametre ASC',[req.body.largeur, req.body.hauteur] ,(err, results) => {
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

exports.searchTypeController = (req, res) =>{
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
                db.query('select distinct type from pneu_agricole where largeur = $1 and hauteur = $2 and diametre = $3 order by type ASC',[req.body.largeur, req.body.hauteur, req.body.diametre] ,(err, results) => {
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


exports.searchMarqueController = (req, res) =>{

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
                db.query('select distinct marque from pneu_agricole where largeur = $1 and hauteur = $2 and diametre = $3 and type=$4 order by marque ASC',[req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type] ,(err, results) => {
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

//envoyer resultat de la recherche
exports.searchPneusController = (req, res) => {
    //select pneu_id_pl, designation, collection, type, marque, marque_img, largeur, hauteur, position, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu, image_1, image_2, marque_img, promo from pneu_poids_lourds, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_poids_lourds.id_pneu_ag and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and largeur='265' and hauteur='70' and diametre='17.5' and type='REGIONAL' and position='ARRIERE' and marque='MICHELIN' order by pneu_id_pl
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
                             //id_pneu_pl,  designation_ag, collection, type, marque, largeur, hauteur, position, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, image_marque
                             {
                                pneu_id:pneu_sprix.id_pneu_ag,
                                designation:pneu_sprix.designation_ag,
                                collection:pneu_sprix.collection,
                                type:pneu_sprix.type,
                                marque:pneu_sprix.marque,
                                largeur:pneu_sprix.largeur,
                                hauteur:pneu_sprix.hauteur,
                                diametre:pneu_sprix.diametre,
                                charge:pneu_sprix.charge,
                                vitesse:pneu_sprix.vitesse,
                                position:pneu_sprix.position,
                                plis:pneu_sprix.plis,
                                carburant:pneu_sprix.carburant,
                                adherence:pneu_sprix.adherence,
                                bruit:pneu_sprix.bruit,
                                promo:pneu_sprix.promo,
                                price:0,
                                image_pneu:pneu_sprix.image_pneu,
                                image_1:pneu_sprix.image_1,
                                image_2:pneu_sprix.image_2,
                                image_marque:pneu_sprix.image_marque
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
           //type de pneu !== tous marque !== tous
           const requetegenerale1='select id_pneu_ag, designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu, image_1, image_2, image_marque from pneu_agricole, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_agricole.id_pneu_ag and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and mapping_pneu_four.designation = pneu_agricole.designation_ag and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and marque=$5 order by id_pneu_ag'
           const requete1='select id_pneu_ag, designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, image_marque from pneu_agricole where largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 and marque=$5 order by id_pneu_ag'
           const parametres1 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type, req.body.marque]
           //type de pneu !== tous marque == tous
           const requetegenerale2='select id_pneu_ag, designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu, image_1, image_2, image_marque from pneu_agricole, stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_agricole.id_pneu_ag and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and mapping_pneu_four.designation = pneu_agricole.designation_ag and largeur=$1 and hauteur=$2 and diametre=$3 and type=$4 order by id_pneu_ag'
           const requete2='select id_pneu_ag, designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, image_marque from pneu_agricole where largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 order by id_pneu_ag'
           const parametres2 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.type]
           //type de pneu === tous marque !== tous
           const requetegenerale3='select id_pneu_ag,  designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu, image_1, image_2, image_marque from pneu_agricole,stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_agricole.id_pneu_ag and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and mapping_pneu_four.designation = pneu_agricole.designation_ag and largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 order by id_pneu_ag'
           const requete3='select id_pneu_ag, designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, marge, image_pneu, image_1, image_2, image_marque from pneu_agricole where largeur=$1 and hauteur=$2 and diametre=$3 and marque=$4 order by id_pneu_ag'
           const parametres3 = [req.body.largeur, req.body.hauteur, req.body.diametre, req.body.marque]
           //type de pneu === tous marque === tous
           const requetegenerale4='select id_pneu_ag,  designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, plis, carburant, adherence, bruit, promo, COALESCE(marge,0) + COALESCE(prix,0) as price, image_pneu, image_1, image_2, image_marque from pneu_agricole,stock, mapping_pneu_four where mapping_pneu_four.id_pneu_service = pneu_agricole.id_pneu_ag and mapping_pneu_four.id_pneu_fournisseur = stock.id_supplier and mapping_pneu_four.designation = pneu_agricole.designation_ag and largeur=$1 and hauteur=$2 and diametre=$3 order by id_pneu_ag'
           const requete4='select id_pneu_ag, designation_ag, collection, type, marque, largeur, hauteur, diametre, charge, vitesse, position, carburant, plis, adherence, bruit, promo, marge, image_pneu, image_1, image_2, image_marque from pneu_agricole where largeur=$1 and hauteur=$2 and diametre=$3 order by id_pneu_ag'
           const parametres4 = [req.body.largeur, req.body.hauteur, req.body.diametre]

           if(err){
               return res.send(err);
           }else{
               if(req.body.type !== 'Tous' && req.body.marque !== 'Tous'){
                   // type !== tous & marque !== tous 
                   searchFilter(db, requetegenerale1,requete1, parametres1, done)
                   console.log('req 1')
               }else if(req.body.type !== 'Tous' && req.body.marque === 'Tous'){
                   //type de pneu !== tous  marque === tous
                   searchFilter(db, requetegenerale2,requete2, parametres2, done)
                   console.log('req 2')
               }else if(req.body.type === 'Tous' && req.body.marque !== 'Tous'){
                   //type de pneu === tous  marque !== tous
                   searchFilter(db, requetegenerale3,requete3, parametres3, done)
                   console.log('req 3')
               }else{
                    //type de pneu === tous marque === tous
                    searchFilter(db, requetegenerale4,requete4, parametres4, done)
                    console.log('req 4')
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
                    db.query('select * from pneu_agricole order by designation_ag ASC',(err, results) => {
                        
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
                    db.query('insert into pneu_agricole(categorie, type, position, marque, collection, largeur, hauteur, diametre, charge, vitesse, plis, designation_ag, carburant, adherence, bruit, marge, promo) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
                      [req.body.categorie, req.body.type, req.body.position, req.body.marque, req.body.collection, req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.plis, req.body.designation_ag, req.body.carburant, req.body.adherence, req.body.bruit, req.body.marge, req.body.promo] ,
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
                id_pneu_ag: {
                    [Op.and] : req.body.listPneu
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
               db.query(`update pneu_agricole set categorie = $1, type = $2, position = $3, marque = $4, collection = $5, largeur = $6, hauteur = $7, diametre = $8, charge = $9, vitesse = $10, plis = $11, designation_ag = $12, carburant = $13, adherence = $14, bruit = $15, marge = $16, promo = $17 where id_pneu_ag = $18`,
               [req.body.categorie, req.body.type, req.body.position, req.body.marque, req.body.collection, req.body.largeur, req.body.hauteur, req.body.diametre, req.body.charge, req.body.vitesse, req.body.plis, req.body.designation_ag, req.body.carburant, req.body.adherence, req.body.bruit, req.body.marge, req.body.promo, req.body.id_pneu_ag] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `Le pneu avec l'ID : ${ req.body.id_pneu_ag} a été modifiée`
                    })
                }
               })
            }
        })
    }
    
}







