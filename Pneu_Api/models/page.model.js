const Sequelize = require('sequelize');
const db = require('../config/db');


//User schema 
module.exports = db.define(
    'pages',
    {
        id_page:{
            type: Sequelize.INTEGER,
            primaryKey : true
       },
       image_url:{
           type: Sequelize.STRING
       },
       image_name:{
           type: Sequelize.STRING
       },
       page_name:{
        type: Sequelize.STRING
       },
    },{
        timestamps: false,
        freezeTableName: true
      })

