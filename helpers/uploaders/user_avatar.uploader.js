import multer from "multer";
import path from "path";
import moment from "moment";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/avatars/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + moment.now() + path.extname(file.originalname)
    );
  },
});

const userAvatarUploader = multer({
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

export default userAvatarUploader;