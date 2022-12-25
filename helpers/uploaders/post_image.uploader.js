import multer from "multer";
import path from "path";
import moment from "moment";
import fs from 'fs'
const destination = process.cwd() + '/public/images/posts/'

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destination);
    },
    filename: function (request, file, cb) {
        cb(null, `${request.params.id}_${file.originalname}`)
    },
});

const postImageUploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

export default postImageUploader;