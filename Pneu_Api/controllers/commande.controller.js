//My libraries
const _ = require('lodash')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const sequelize = require('sequelize')
const db = require('../config/db')
const pg = require('pg')
const path = require("path");
const nodemailer = require('nodemailer')

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


//send commands to client 
exports.getCommandeController = (req, res) =>{
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
               db.query('select * from commandes order by date_commande ASC',
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    var commandes = results.rows
                    return res.json(commandes)
                }
               })
            }
        })
    }
}



//ajouter commande
exports.ajouterCommandeController = (req, res) =>{
    const errors = validationResult(req)
    var today = new Date();
    var date_commande = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var code = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+''+ Math.floor(Math.random() * (100 - 1 + 1)) + 1;

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
            db.query('insert into commandes(code_commande, date_commande, nom_client, prenom_client, email, telephone, designation_pneu, prix_uht, quantite, wilaya, frais_livraison, centre_mentage, total) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
               [code, date_commande, req.body.nom, req.body.prenom, req.body.email, req.body.telephone, req.body.pneu, req.body.prix_pneu, req.body.quantite, req.body.wilaya, req.body.frais_livraison, req.body.centre_mentage, req.body.total] ,
               (err, results) => {
                done()
                if(err){
                    console.log(err)
                }else{
                    //sending email -------------------------------
                    //step 1 : defining email content
                    const emailData = {
                        from: '"Pneu Service 🔧" <test@monsterstudio.org>', // sender address
                        to: `${req.body.email}, hhammoumi@monsterstudio.org`, // list of receivers
                        subject: `Commande #${code} ✔`, // Subject line
                        text: `BONJOUR Mr.${req.body.nom}`, // plain text body
                        html:`
                        <html>
                           <head>
                               <meta charset="utf-8">
                               <style>
                                    body{
                                        text-align:center;
                                        padding:0 10vw;
                                    }
                                    p{
                                        padding:0;
                                        margin:0;
                                    }
                                    .email-header{
                                        width:100%;                                        
                                        background:linear-gradient(90.84deg, #EF1A23 0.61%, #FB3C29 99.42%);
                                    }
                                    .logo{
                                        width:195px;
                                        height:73px;
                                    }
                                    .slogan{
                                        padding:0;
                                        margin:0 5%;
                                        font-size:0.8rem;
                                        color:white;
                                    }
                                    .email-body{
                                        
                                    }
                                    .titre{
                                        margin : 5% 0;
                                        font-size:1.5rem;
                                        font-weight:700;
                                    }
                                    .message{
                                        font-size:1rem;
                                        font-weight:400;
                                    }
                                    .info-commande{
                                        display:flex;
                                        flex-direction:row;
                                        justify-content:center;
                                        align-items:center;
                                        width:100%;
                                        height:40vh;
                                        margin:5% 0;
                                    }
                                    .achats{
                                        width:60%;
                                        height:100%;
                                    }

                                    .achats-ligne{
                                        display:flex;
                                        flex-direction:row;
                                    }
                                    
                                    .livraison{
                                        padding:0 2%;
                                        width:40%;
                                        height:100%;
                                        border-left: 1px solid #333;
                                    }
                                    .info-client{
                                        width:100%;
                                        height:60%;
                                        background: rgba(209, 26, 48, 0.13);
                                        margin-bottom:5%;
                                        padding:2%;
                                    }
                                    .total{
                                        color:#333;
                                        font-size:1.5rem;
                                        font-weight:700;
                                        margin: 1% 0 5% 0;
                                    }
                                    .paragraphe{
                                        font-size:0.8rem;
                                    }
                                    .titre-achat{
                                        color : #555;
                                        font-size:1rem;
                                        font-weight:600;
                                    }
                                    .info-achat{
                                        color : #555;
                                        font-size:1rem;
                                        font-weight:400;
                                    }
                                    .frais-livraison{
                                        color : #555;
                                        font-size:1rem;
                                        font-weight:700;
                                    }
                                    .titre-total{
                                        color : #555;
                                        font-size:1rem;
                                        font-weight:700;
                                        margin-top:5%;
                                    }
                                    .info-total{
                                        color : #555;
                                        font-size:1rem;
                                        font-weight:700;
                                        margin-top:5%;
                                    }
                                    .email-footer{
                                        background: #F2F2F2;
                                        height: 35vh;
                                        width:100%;
                                        display:block;
                                    }
                                    .social-media-container{
                                        width:fit-content;
                                        height:20%;
                                        display:flex;
                                        flex-direction:row;
                                        margin:0 auto 0; 
                                    }
                                    .social-media-icon-container{
                                        border-radius:50%;
                                        background:rgba(255,255,255, 0.8);
                                        width:30px;
                                        height:30px;
                                    }
                                    .social-media-icon{
                                        width:20px;
                                        height:20px;
                                        margin: 0 5px; 
                                    }
                                    .footer-paragraphe-section{
                                        padding: 3% 10%;
                                    }
                                    .footer-paragraphe{
                                        color:#777;
                                        font-size:1rem;
                                        text-align:center;
                                    }
                                    .bientot{
                                        color:#777;
                                        text-align:center;
                                    }
                                    .attention{
                                        color:#555;
                                        text-align:center;
                                        margin-top:20px;
                                    }
                                </style>
                           </head>
                           <body>
                                <div class = 'email-header'>
                                    <img src='https://www.monsterstudio.org/public/logo/PneuS-06.png' class = 'logo'/>
                                    <p class = 'slogan'>Le Leader de pneu pas cher en Algerie</p>
                                </div>
                                <div class = 'email-body'>
                                    <p class = 'titre' >
                                       L'équipe Pneuservice.dz vous remercie de votre confiance et fidelité. 
                                    </p>
                                    <p class = 'message'>
                                       Cher ${req.body.nom} ${req.body.prenom}, Votre commande numero #${code} du ${date} sur pneuservice.dz est actuellement en attente de validation par nos services. Vous recevrez un mail de Pneuservice vous confirmant la validation de votre commande et la date d'expédition de votre marchandise. 
                                    </p>
                                    <div class = 'info-commande'>
                                        <div class = 'achats'>
                                            <h3 style='color: #FB3C29;'>VOS ACHATS</h3>
                                            <div class='achats-ligne'>
                                                <p class = 'titre-achat'>Date de commande : </p>
                                                <p class = 'info-achat'> ${date}</p>
                                            </div>
                                            <div class='achats-ligne'>
                                                <p class = 'titre-achat'> Commande N": </p>
                                                <p class = 'info-achat'> ${code}</p>
                                            </div>
                                            <div class='achats-ligne'>
                                                <p class = 'titre-achat'>Produit : </p>
                                                <p class = 'info-achat'> Pneu ${req.body.pneu}</p>
                                            </div>
                                            <div class='achats-ligne'>
                                                <p class = 'titre-achat'>Prix unitaire : </p>
                                                <p class = 'info-achat'>${req.body.prix_pneu} DZD</p>
                                            </div>
                                            <div class='achats-ligne'>
                                                <p class = 'titre-achat'>Quantité : </p>
                                                <p class = 'info-achat'>${req.body.quantite}</p>
                                            </div>
                                            <div class='achats-ligne'>
                                                <p class = 'titre-total'>Montant : </p>
                                                <p class = 'info-total'>${req.body.quantite * req.body.prix_pneu} DZD</p>
                                            </div>
                                        </div>
                                        <div class = 'livraison'>
                                            <h3 style='color: #FB3C29;'>Livraison</h3>
                                            <div class = 'info-client'>
                                                <p class = 'info-achat'>${req.body.nom} ${req.body.prenom}</p>
                                                <p class = 'info-achat'>${req.body.wilaya}</p>
                                                <p class = 'info-achat'>${req.body.telephone}</p>
                                                <p class = 'info-achat'>${req.body.email}</p>
                                            </div>
                                            <p class = 'frais-livraison'>Frais de livraison : ${req.body.frais_livraison <= 0 ? '(Gratuite)' : req.body.frais_livraison} </p>
                                            <p class = 'frais-livraison'>Total de Livraison : ${req.body.frais_livraison * req.body.quantite} DZD</p>
                                        </div>
                                    </div>
                                    <hr/>
                                    <p class = 'total'>Total Net à payer: ${req.body.total} DZD</p>
                                </div>
                                <div class = 'email-footer'>
                                    <div class = 'footer-paragraphe-section'>
                                      <p class = 'footer-paragraphe'>
                                        Pour toute question, rendez-vous sur Pneuservice.dz, ou contactez-nous au 0560 66 99 99. 
                                        Vous pouvez également consulter nos conditions générales de vente en cliquant ici.
                                      </p>
                                    </div>
                                    <div class = 'social-media-container'>
                                        <img src='https://www.monsterstudio.org/public/logo/facebook.png' class = 'social-media-icon'/>
                                        <img src='https://www.monsterstudio.org/public/logo/instagram.png' class = 'social-media-icon'/>
                                        <img src='https://www.monsterstudio.org/public/logo/linkedin.png' class = 'social-media-icon'/>
                                    </div>
                                    <p class = 'bientot'>A très bientôt sur www.pneuservice.dz <br/>
                                    Le service client</p>
                                </div>
                                <div  class = 'attention'>
                                    <p> Attention : ne pas répondre directement à ce mail, il s'agit d'un message envoyé automatiquement.</p>
                                </div>
                           </body>
                        </html>
                        `
                    }
                    //step 2 : create transporter
                    let transporter = nodemailer.createTransport({
                        host: "mail11.lwspanel.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                        user: 'test@monsterstudio.org', // generated ethereal user
                        pass: '57932082@Essai', // generated ethereal password
                        },
                    });
                    
                    //step 3 : send mail with defined transport object
                    transporter.sendMail(emailData).then(sent => {
                        return res.json({
                            message : `Email has been sent to ${req.body.email}`
                        })
                    }).catch(err => {
                        return err.json({
                            error : errorHandler(err)
                        })
                    });
                }
            })
        }
    })
    }
}


//supprimer commande 
exports.deleteCommandeController = (req, res) =>{
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
               db.query('Delete from commandes where id_commande = $1',
               [req.body.id_commande] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `la commande numero #${req.body.code_commande} a été supprimé`
                    })
                }
               })
            }
        })
    }
}

//update commande 
exports.updateCommandeController = (req, res) =>{
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
               db.query(`update commandes set nom_client = $1, prenom_client = $2, email = $3, telephone = $4, designation_pneu = $5, prix_uht = $6, quantite = $7, wilaya = $8, frais_livraison = $9, centre_mentage = $10, total = $11, date_commande = $12 where id_commande = $13`,
               [req.body.nom_client, req.body.prenom_client, req.body.email, req.body.telephone, req.body.designation_pneu, req.body.prix_uht, req.body.quantite, req.body.wilaya, req.body.frais_livraison, req.body.centre_mentage, req.body.total, req.body.date_commande,  req.body.id_commande] ,
               (err, results) => {
                   done()
                   if(err){
                    console.log(err)
                }else{
                    return res.json({
                        message : `La commande numero #${req.body.code_commande} a été modifiée`
                    })
                }
               })
            }
        })
    }
}

