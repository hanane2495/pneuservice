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
        let stock = req.file.path
    
        console.log(req.file.path)
    
        if (!(req.file.mimetype).includes('csv')) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                errors: "fichier non pris en charge"
            })
        }
        
    }else{
      console.log('the file is empty')
    }
    next()
}