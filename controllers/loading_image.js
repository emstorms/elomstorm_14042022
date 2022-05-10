const multer = require('multer');
//configuration des mimes acceptées
const ACCEPTED_MIME = {'image/jpg':'jpg',
                       'image/jpeg':'jpg',
                       'image/png':'png'
                       };

                       const storage = multer.diskStorage({
    destination: (req,theFile,callback) =>{
        callback(null,'images_folder')
    },
    filename: (req,theFile,callback)=> {
        //replacing white space with underscore
        const name = theFile.originalname.split('/([\s\.])/').join('_');
        //setting accepted file mime
        const mime_extension = ACCEPTED_MIME[theFile.mimetype];
        //setting new name with name + date + extension (mime)
        callback(null,name + Date.now() +'.'+mime_extension);
    }
});
console.log(storage);
//exporting the multer by setting one file peer load and the file type
module.exports = multer({storage}).single('image');


