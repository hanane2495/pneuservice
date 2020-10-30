var fs = require('fs')
module.exports = (req, res, next) => {
    if(req.body.name !== ''){
        if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
            return res.status(400).json({
                errors: `problème d'envoi de données`
            })
        }
        console.log(req.body.name)
        let name = req.body.name
        let image = req.file.path
    
        console.log(req.file.path)
    
        if (!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg')) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                errors: "fichier non pris en charge"
            })
        }
    
        /*
        if (req.file.size > 1024 * 1024) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                errors: "Le fichier est trop grand"
            })
        }*/    
        /*
        if (!name || !image) {
    
            return res.status(400).json({
                sucess: false,
                message: "Tous les champs sont requis"
            })
        }*/
    
        
    }else{
      console.log('the file is empty')
    }
    next()
}