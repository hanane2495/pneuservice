const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'fournisseur',
    {
       id_fournisseur:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
       },
       nom:{
           type: Sequelize.STRING
       },
       prenom:{
           type: Sequelize.STRING,
       },
       email:{
        type: Sequelize.STRING
       },
       telephone:{
        type: Sequelize.STRING
       },
       adresse:{
        type: Sequelize.STRING
       },
       raison_sociale:{
        type: Sequelize.STRING
       },
       forme_juridique:{
        type: Sequelize.STRING
       },
       n_registre:{
        type: Sequelize.STRING
       },
       matricule_fiscale:{
        type: Sequelize.STRING
       },
       n_article_imposition :{
        type: Sequelize.STRING
       },
       NIS:{
        type: Sequelize.STRING
       },
       banque:{
        type: Sequelize.STRING
       },
       agence:{
        type: Sequelize.STRING
       },
       numero_rib:{
        type: Sequelize.STRING
       },
       cle_rib:{
        type: Sequelize.STRING
       }
    },{
        timestamps: false,
        freezeTableName: true
      })

