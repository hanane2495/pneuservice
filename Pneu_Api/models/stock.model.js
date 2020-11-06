const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'stock',
    {
        suppliers_code:{
            type: Sequelize.STRING,
            primaryKey : true
       },
       qte:{
           type: Sequelize.INTEGER
       },
       price:{
           type: Sequelize.INTEGER,
       },
       id_fournisseur:{
        type: Sequelize.STRING,
        primaryKey : true

       },
       date_ajout:{
        type: Sequelize.DATE,
        primaryKey : true

       },
    },{
        timestamps: false,
        freezeTableName: true
      })

