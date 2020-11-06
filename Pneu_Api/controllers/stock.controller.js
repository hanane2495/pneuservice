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
const Stock = require('../models/stock.model')
const Mapping = require('../models/mapping.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')
const { forEach } = require('lodash')


//get pneu auto
exports.getStockController = (req, res) => {
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
                    db.query('select * from fournisseur order by id_fournisseur ASC',(err, results) => {
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
exports.addStockController = (req, res) => {
    const errors = validationResult(req)
    var today = new Date();
    var date_ajout = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    
        if(!errors.isEmpty()){
            const firstError = errors.array().map(error => error.msg)[0]
            return res.status(422).json({
                error: firstError
            })
        }else{
            const stock = []
            fs.createReadStream(req.file.path)
              .pipe(csv({ separator: ';' }))
              .on('data', (data) => stock.push(data))
              .on('end', () => {
                  stock.forEach((element) => {
                      element.id_fournisseur = req.body.id_fournisseur
                      element.date_ajout = date_ajout
                  })
                  Stock.bulkCreate(stock) // will return only the specified columns for each row inserted
                  .then(() => { 
                      // Notice: There are no arguments here, as of right now you'll have to...
                    Mapping.findAll({
                        raw : true,
                        attributes: ['id_pneu_fournisseur']
                    }).then((ids_pneu_fournisseur) => {
                            let id_suppliers = []
                            ids_pneu_fournisseur.forEach(item => {
                               id_suppliers.push(item.id_pneu_fournisseur)
                            })
                            Stock.findAll({
                                raw : true,
                                where : {
                                    suppliers_code : {
                                        [Op.notIn] : id_suppliers
                                    }
                                }
                            }).then( stocks => {
                                return res.json({
                                    produits_non_mappee : stocks
                                })
                            })
                        })
                    })
                })
        }
}

//delete pneu auto
exports.deleteStockController = (req, res) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        Fournisseurs.destroy({
            where: { id_fournisseur: {
                [Op.in] : req.body.listFournisseurs
            }}
        }).then(() => {
            return res.json({
                message : `les fournisseurs ${req.body.listFournisseurs} on ete supprimee`
            })
        }).catch(err => {
            console.log(err)
         }) 
    }
}

//update commande 
exports.updateStockController = (req, res) =>{
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
               db.query(`update fournisseur set nom = $1, prenom = $2, email = $3, telephone = $4, adresse = $5, banque = $6, agence = $7, NIS = $8, matricule_fiscale = $9, n_registre = $10, n_article_imposition = $11, forme_juridique = $12, raison_sociale = $13, numero_rib = $14, cle_rib = $15 where  id_fournisseur = $16`,
               [req.body.nom, req.body.prenom, req.body.email, req.body.telephone, req.body.adresse, req.body.banque, req.body.agence, req.body.nis, req.body.matricule_fiscale, req.body.n_registre, req.body.n_article_imposition, req.body.forme_juridique, req.body.raison_sociale, req.body.numero_rib, req.body.cle_rib, req.body.id_fournisseur] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `Le Fournisseur avec l'ID : ${req.body.id_fournisseur} a été modifiée`
                    })
                }
               })
            }
        })
    } 
}