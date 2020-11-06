const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'mapping_pneu_four',
    {
       id_mapping:{
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
       },
       id_pneu_service:{
           type: Sequelize.INTEGER
       },
       id_pneu_fournisseur:{
           type: Sequelize.STRING,
       },
       designation:{
        type: Sequelize.STRING,

       },
       id_fournisseur:{
        type: Sequelize.STRING,
        primaryKey : true

       },
    },{
        timestamps: false,
        freezeTableName: true
      })

