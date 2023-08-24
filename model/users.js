const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const avatar_path = path.join('/uploads/users/avatars')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type:String,
    }
}, {
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // __dirname: current path
        cb(null, path.join(__dirname,"..",avatar_path))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
// default sze for file.fieldname : 100bytes

userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = avatar_path;

const User = mongoose.model("User", userSchema);

module.exports = User;