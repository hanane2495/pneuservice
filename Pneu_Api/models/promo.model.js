const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'promo',
    {
        id_promo:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
       },
       nom_promo:{
           type: Sequelize.STRING
       },
       slogan_promo:{
           type: Sequelize.STRING,
       },
       valeur_promo:{
        type: Sequelize.INTEGER,

       },
       type_promo:{
        type: Sequelize.STRING
       },
       code_promo:{
        type: Sequelize.STRING
       },
       image_promo:{
        type: Sequelize.STRING
       },
       small_image_promo:{
        type: Sequelize.STRING
       },
       date_ajout:{
        type: Sequelize.DATE
       },
       date_fin:{
        type: Sequelize.DATE
       },
    },{
        timestamps: false,
        freezeTableName: true
      })

