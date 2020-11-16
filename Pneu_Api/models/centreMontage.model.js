const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'centre_montage',
    {
        id_centre_montage:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
       },
       nom:{
           type: Sequelize.STRING
       },
       ville:{
           type: Sequelize.STRING,
       },
       telephone:{
        type: Sequelize.STRING
       },
       adresse:{
        type: Sequelize.STRING
       },
       latitude:{
        type: Sequelize.STRING
       },
       longitude:{
        type: Sequelize.STRING
       },
       montage:{
        type: Sequelize.BOOLEAN
       },
       equilibrage:{
        type: Sequelize.BOOLEAN
       },
       parallelisme:{
        type: Sequelize.BOOLEAN
       },
       reparation:{
        type: Sequelize.BOOLEAN
       },
    },{
        timestamps: false,
        freezeTableName: true
      })

