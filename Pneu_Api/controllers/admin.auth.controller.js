//My libraries
const expressJWT = require('express-jwt')
const _ = require('lodash')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const pg = require('pg')

//bring our models
const User = require('../models/auth.model')

//bring our helpers
const {errorHandler } = require('../helpers/dbErrorHandlling')

//connect to database via Pool
let pool = new pg.Pool({
    user: 'postgres', 
    database : 'pneuservice',
    password : '1234',
    host : 'localhost',
    port : 5432,
    max : 10,
    idleTimeoutMillis : 30000
});


//Register
exports.addUserController = (req, res) => {
    let {email, password, first_name, last_name, fonction, telephone1, telephone2, adresse, image_url } = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }
    else{
        User.findOne({
            where : {
               email 
            }
         }).then(user => {
            if (user) {
                return res.status(400).json({
                    errors: 'Cet email est déja en utilisation'
                });
            }
            //Generate token 
            let token = jwt.sign(
                {
                    email, password, first_name, last_name, fonction, telephone1, telephone2, adresse, image_url
                },
                process.env.JWT_ACCOUNT_ACTIVATION, 
                {
                    expiresIn: '15m'
                }
            )
            //sending email -------------------------------
            //step 1 : defining email content
            const emailData = {
                from: '"Pneuservice.dz" <test@monsterstudio.org>', // sender address
                to: email, // list of receivers
                subject: "Account Activation ✔", // Subject line
                text: "Bonjour", // plain text body
                html:`
                <h1>Veuillez cliquer sur ce lien pour activer votre compte</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr/>
                <p>Cet e-mail contient des informations sensibles</p>
                <p>${process.env.CLIENT_URL}</p>
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
                    message : `un email a été envoyé à ${email}`
                })
            }).catch(err => {
                return err.json({
                    error : errorHandler(err)
                })
            });
         }).catch(err => {
            res.send('error :' + err)
         }) 
    }
}


//activate account
exports.activationController = (req, res) => {
    const {token} = req.body

    if(token){
        //verify the token is valid or not 
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    error:`lien d'activation expiré. Veuillez vous réinscrire`
                })
            }else{
                //if valid save to database
                //get email, password, title, first_name, last_name, institution, country, reviewer from token
                let {
                    email, password, first_name, last_name, fonction, telephone1, telephone2, adresse, image_url
                } = jwt.decode(token)

                bcrypt.hash(password, 10, (err, hash) => {
                    password = hash
                    //Ajouter un nouveau utilisateur a la table utilisateur 
                    const user = User.create({
                        email, password, first_name, last_name, fonction, telephone1, telephone2, adresse, image_url
                    }).then(() =>{
                        return res.json({
                            success : true,
                            message: 'Inscription réussie'
                        })
                    })
                })
            }    
        })
    }else{
        return res.json({
            message:`une erreur s'est produite, veuillez réessayer`
        })
    }
}        

//Update User
exports.updateUserController = (req, res) =>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }else{
        //store password in variable in order to hash it later 
        var password = req.body.password;

        //update all profile (profile infos + password + profile image)
        if(req.body.password !== '' && req.body.name !== ''){
            bcrypt.hash(password, 10, (err, hash) => {
                password = hash
                //Modifier utilisateur  where id = req.body.id 
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update utilisateur set nom = $1, prenom = $2, email = $3, telephone1 = $4, telephone2 = $5, adresse = $6, fonction = $7, image_name = $8, image_url = $9, mot_de_passe = $10 where id_utilisateur = $11 `, 
                        [req.body.nom, req.body.prenom, req.body.email, req.body.telephone1, req.body.telephone2, req.body.adresse, req.body.fonction, req.body.name, req.file.path, password, req.body.id], 
                        (err, results) => {
                            done()
                            if(err){
                                console.log('password : '+req.body.password)
                                console.log(err)
                            }else{
                                const image = {
                                    name:req.body.name,
                                    path: req.file.path
                                }
                                const profile = {
                                    nom : req.body.nom,
                                    prenom : req.body.prenom,
                                    email : req.body.email,
                                    password : '',
                                    telephone1 : req.body.telephone1,
                                    telephone2 : req.body.telephone2,
                                    adresse : req.body.adresse,
                                    fonction : req.body.fonction,
                                    id : req.body.id
                                }
                                return res.json({
                                    success : true,
                                    message: 'Votre profil a été modifié avec succes',
                                    image,
                                    profile
                                })
    
                            }
                        })
                    }
                })
            })
        }
        
        //update all profile fields except password (profile info + profile image)
        else if(req.body.password === '' && req.body.name !== ''){
            pool.connect((err, db, done) => {
                if(err){
                    return res.send(err);
                }else{
                    db.query(`update utilisateur set nom = $1, prenom = $2, email = $3, telephone1 = $4, telephone2 = $5, adresse = $6, fonction = $7, image_name = $8, image_url = $9 where id_utilisateur = $10 `, 
                    [req.body.nom, req.body.prenom, req.body.email, req.body.telephone1, req.body.telephone2, req.body.adresse, req.body.fonction, req.body.name, req.file.path, req.body.id], 
                    (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            const image = {
                                name:req.body.name,
                                path: req.file.path
                            }
                            const profile = {
                                id : req.body.id,
                                nom : req.body.nom,
                                prenom : req.body.prenom,
                                email : req.body.email,
                                telephone1 : req.body.telephone1,
                                telephone2 : req.body.telephone2,
                                adresse : req.body.adresse,
                                fonction : req.body.fonction,
                            }
                            return res.json({
                                success : true,
                                message: 'Votre profil a été modifié avec succes',
                                image,
                                profile
                            })

                        }
                    })
                }
            })
        }
        
        //update all profile filds except profile image ( profile info + password )
        else if(req.body.password !== '' && req.body.name === ''){

            //hash the password inorder to store it in database
            bcrypt.hash(password, 10, (err, hash) => {
                password = hash

                //Modifier utilisateur  where id = req.body.id 
                pool.connect((err, db, done) => {
                    if(err){
                        return res.send(err);
                    }else{
                        db.query(`update utilisateur set nom = $1, prenom = $2, email = $3, telephone1 = $4, telephone2 = $5, adresse = $6, fonction = $7, mot_de_passe = $8 where id_utilisateur = $9 `, 
                        [req.body.nom, req.body.prenom, req.body.email, req.body.telephone1, req.body.telephone2, req.body.adresse, req.body.fonction, password, req.body.id], 
                        (err, results) => {
                            done()
                            if(err){
                                console.log(err)
                            }else{
                                const profile = {
                                    id : req.body.id,
                                    nom : req.body.nom,
                                    prenom : req.body.prenom,
                                    email : req.body.email,
                                    telephone1 : req.body.telephone1,
                                    telephone2 : req.body.telephone2,
                                    adresse : req.body.adresse,
                                    fonction : req.body.fonction
                                }
                                return res.json({
                                    success : true,
                                    message: 'Votre profil a été modifié avec succes',
                                    profile,
                                    image:null
                                })
    
                            }
                        })
                    }
                })
            })
        }
        
        //update profile infos only (profile info)
        else{
            pool.connect((err, db, done) => {
                if(err){
                    return res.send(err);
                }else{
                    db.query(`update utilisateur set nom = $1, prenom = $2, email = $3, telephone1 = $4, telephone2 = $5, adresse = $6, fonction = $7 where id_utilisateur = $8 `, 
                    [req.body.nom, req.body.prenom, req.body.email, req.body.telephone1, req.body.telephone2, req.body.adresse, req.body.fonction, req.body.id], 
                    (err, results) => {
                        done()
                        if(err){
                            console.log(err)
                        }else{
                            const profile = {
                                id : req.body.id,
                                nom : req.body.nom,
                                prenom : req.body.prenom,
                                email : req.body.email,
                                telephone1 : req.body.telephone1,
                                telephone2 : req.body.telephone2,
                                adresse : req.body.adresse,
                                fonction : req.body.fonction,
                            }
                            return res.json({
                                success : true,
                                message: 'Votre profil a été modifié avec succes',
                                profile,
                                image:null
                            })

                        }
                    })
                }
            })
        }
    }

}

//login
exports.loginController = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //const {email, password} = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    }
    else{
        //check if user exist
        User.findOne({
            where : {
               email 
            }
        }).then(user => {
             if(!user){
                 return res.status(400).json({
                     error: `L'utilisateur avec cet e-mail n'existe pas, veuillez vous inscrire`
                 })
             }

             //Authenticate
             if(!bcrypt.compareSync(password, user.mot_de_passe)){
                 return res.status(400).json({
                     error : `Mot de passe incorrect`
                 })
             }else{
                 //generate token 
                let token = jwt.sign({
                    _id: user._id
                  }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '7d'
                })
                
                const { email, nom, prenom, fonction, telephone1, telephone2, adresse, image_url, image_name, id_utilisateur } = user
                return res.json({
                 token,
                 user : {email, nom, prenom, fonction, telephone1, telephone2, adresse, id:id_utilisateur },
                 image : {path : image_url, name : image_name}
                })
             }
         }).catch(err => {
             console.log(err)
            res.status(400).json({
                error : errorHandler(err)
            })
         })
    }
}

//forget password
exports.forgetPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else{
    User.findOne({
        where : {
           email 
        }
     }).then(user => {
        if(!user){
            return res.status(400).json({
                error: 'User with that email does not exist, Please Sign Up'
            })
        }
        //generate token for reseting password
        let token = jwt.sign(
            { _id: user._id }, process.env.JWT_RESET_PASSWORD,{ expiresIn: '15m' } 
          );
        
        //sending email -------------------------------
        //step 1 : defining email content
        const emailData = {
            from: '"Pneuservice" <test@monsterstudio.org>', // sender address
            to: email, // list of receivers
            subject: "Mot de passe oublié 🤔 !?", // Subject line
            text: "Hello", // plain text body
            html:`
            <h1>Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe</h1>
            <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
            <hr/>
            <p>Cet e-mail contient des informations sensibles</p>
            <p>${process.env.CLIENT_URL}</p>
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
        
        return user.update(
            {
                resetpasswordlink: token
            }
        ).then( (err, success) => {
            //step 3 : send mail with defined transport object
            transporter.sendMail(emailData).then(sent => {
                const { email, nom, prenom, fonction, telephone1, telephone2, adresse, image_url, image_name, id_utilisateur } = user
                return res.json({
                    token,
                    user : {email, nom, prenom, fonction, telephone1, telephone2, adresse, id_utilisateur },
                    image : { image_url, image_name },
                    message : `Un e-mail a été envoyé à ${email}`
                })
            }).catch(err => {
                return err.json({
                    error : errorHandler(err)
                })
            })
        }).catch(err => {
            console.log('RESET PASSWORD LINK ERROR', err);
            return err.json({
                error:
                  'Database connection error on user password forgot request'
              });
        })
        
     })
  }
}

//Reset password
exports.resetPasswordController = (req, res) => {
    let { newPassword, resetpasswordlink } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
          errors: firstError
        });
    }else{
        if(resetpasswordlink){
            jwt.verify(
                resetpasswordlink, 
                process.env.JWT_RESET_PASSWORD , 
                function(err,decoded){
                    if (err){
                        return res.status(400).json({
                            error: 'Lien expiré. Réessayer'
                          });
                    }else{
                        User.findOne({
                            where : {
                                resetpasswordlink 
                            }
                        }).then( user => {
                            if (err || !user) {
                                return res.status(400).json({
                                  error: 'Un problème est survenu. Essayer plus tard'
                                });
                              }

                              bcrypt.hash(newPassword, 10, (err, hash) => {
                                newPassword = hash

                                //replace password with the new password in our model
                                const updatedFields = {
                                    password: newPassword,
                                    resetpasswordlink: ''
                                };
                                  
                                user = _.extend(user, updatedFields);

                                //save to database
                                user.save().then(() => {
                                    res.json({
                                        message: `Génial! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe`
                                    });
            
                                }).catch(err => {
                                    return err.json({
                                        error : 'Erreur lors de la réinitialisation du mot de passe utilisateur'
                                    })
                                })                                
                            })
                        })
                    }
                   
                }
            )
        }
    }
}