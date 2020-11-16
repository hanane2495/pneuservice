var fs = require('fs')
module.exports = (req, res, next) => {
    if(req.body.name !== ''){
        if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
            return res.status(400).json({
                errors: `problème d'envoi de données`
            })
        }
        console.log( 'file name : '+req.body.name)
        console.log('file path : '+req.file.path)
        console.log('file type : '+req.file.mimetype)
    
        if (!(req.file.mimetype).includes('ms-excel')) {
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