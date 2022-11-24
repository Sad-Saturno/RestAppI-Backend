const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({
        fileFilter: (req, file, cb) => {
            let ext = path.extname(file.originalname);
            if (ext !== '.jpg' || '.png' || 'jpeg') {
                return cb(new Error('Only images formats files are allowed'));
            }
            cb(null, true);
        }
    })
});