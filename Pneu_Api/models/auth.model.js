const crypto = require('crypto')
const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'utilisateur',
    {
       id_utilisateur:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
       },
       email:{
           type: Sequelize.STRING
       },
       mot_de_passe:{
           type: Sequelize.STRING,
       },
       nom:{
        type: Sequelize.STRING
       },
       prenom:{
        type: Sequelize.STRING
       },
       telephone1:{
        type: Sequelize.STRING
       },
       telephone2:{
        type: Sequelize.STRING
       },
       fonction:{
        type: Sequelize.STRING
       },
       adresse:{
        type: Sequelize.STRING
       },
       image_url:{
        type: Sequelize.STRING
       },
       image_name :{
        type: Sequelize.STRING
       },
       resetpasswordlink:{
        type: Sequelize.STRING
       }
    },{
        timestamps: false,
        freezeTableName: true
      })

