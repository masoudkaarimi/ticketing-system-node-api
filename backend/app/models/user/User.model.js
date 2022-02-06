const {UserSchema} = require('./User.schema')

// Inster user
exports.insertUser = (userObject) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObject).save()
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}
