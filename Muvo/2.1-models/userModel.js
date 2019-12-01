const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String,
        default: ""
    },
    authorizationLevel: {
        type: Number,
        default: 1,
        required: true
    }
});
userSchema.on('index', function (error) {
    console.log(jp);
    jp.save(function (err) {
        console.log(err);
        var jp2 = new Model({ phone: "123456" });
        console.log(jp2);
        jp2.save(function (err) {
            console.log(err);
            process.exit();
        });
    })
});
module.exports = mongoose.model('User', userSchema);
