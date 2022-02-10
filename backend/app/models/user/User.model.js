const {UserSchema} = require('./User.schema')

// Inster user
exports.insertUser = (userObject) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObject).save()
            .then(data => resolve(data))
            .catch(error => {
                console.log('Create user => ', error)
                reject(error)
            })
    })
}

// Get user by email
exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) return false

        try {
            UserSchema.findOne({email}, (error, data) => {
                if (error) {
                    console.log('Get user by email => ', error)
                    reject(error)
                }

                resolve(data)
            })
        } catch (error) {
            console.log('Get user by email => ', error)
            reject(error)
        }

    })
}

// Get user by id
exports.getUserById = (_id) => {
    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            UserSchema.findOne({_id}, (error, data) => {
                if (error) {
                    console.log('Get user by id => ', error)
                    reject(error)
                }

                resolve(data)
            })
        } catch (error) {
            console.log('Get user by id => ', error)
            reject(error)
        }

    })
}

// Store user refreshJWT
exports.storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                {_id},
                {$set: {"refreshJWT.token": token, "refreshJWT.createdAt": Date.now()}},
                {new: true}
            )
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Store user refresh JWT => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Store user refresh JWT => ', error)
            reject(error)
        }
    })
}

// Update password
exports.updatePassword = (email, newPassword) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                {email},
                {$set: {'password': newPassword}},
                {new: true},
            )
                .then(data => resolve(data))
                .catch(error => {
                    console.log('Update password => ', error)
                    reject(error)
                })
        } catch (error) {
            console.log('Update password => ', error)
            reject(error)
        }
    })
}