const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PinSchema = new Schema({
    pin: {
        type: String,
        maxlength: 6,
        minlength: 6,
    },
    email: {
        type: String,
        maxLength: 100,
        required: true,
    }
}, { timestamps: true });

exports.PinSchema = mongoose.model('Pin', PinSchema)
