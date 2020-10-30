const Sequelize = require('sequelize');
const db = require('../config/db');


//pneu auto schema 
module.exports = db.define(
    'pneu_poids_lourds',
    {
        id_pneu_pl:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
       designation_pl:{
           type: Sequelize.STRING
       },
       categorie : {
           type : Sequelize.STRING
       },
       position : {
        type : Sequelize.STRING
       },
       type : {
        type : Sequelize.STRING
       }, 
       marque:{
           type: Sequelize.STRING,
       },
       collection:{
        type: Sequelize.STRING
       },
       type:{
        type: Sequelize.STRING
       },
       largeur:{
        type: Sequelize.STRING
       },
       hauteur:{
        type: Sequelize.STRING
       },
       diametre:{
        type: Sequelize.STRING
       },
       charge:{
        type: Sequelize.STRING
       },
       vitesse:{
        type: Sequelize.STRING
       },
       marge:{
        type: Sequelize.STRING
       },
       statut:{
        type: Sequelize.STRING
       },
       carburant:{
        type: Sequelize.STRING
       },
       adherence:{
        type: Sequelize.STRING
       },
       bruit:{
        type: Sequelize.STRING
       },
       promo:{
        type: Sequelize.STRING
       },
       image_pneu:{
        type: Sequelize.STRING
       },
       image_1:{
        type: Sequelize.STRING
       },
       image_2:{
        type: Sequelize.STRING
       },
       img_marque:{
        type: Sequelize.STRING
       },

    },{
        timestamps: false,
        freezeTableName: true
      })

