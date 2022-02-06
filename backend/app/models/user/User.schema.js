const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    phone: {
        type: String,
        maxLength: 11
    },
    email: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true
    },
    refreshJWT: {
        token: {
            type: String,
            maxLength: 500,
            default: ''
        },
        createdAt: {
          type: Date
        },
        // updatedAt: {
        //     type: Date,
        //     required: true
        // },
    }
}, { timestamps: true })

// UserSchema.pre('save', (next) => {
//     const currentDate = new Date();
//
//     console.log(this)
//
//     this.updatedAt = currentDate;
//
//     if (!this.createdAt)
//         this.createdAt = currentDate;
//
//     // this.refreshJWT.updatedAt = currentDate;
//     //
//     // if (!this.refreshJWT.createdAt)
//     //     this.createdAt = currentDate
//
//     next();
// });

exports.UserSchema = mongoose.model('User', UserSchema)


