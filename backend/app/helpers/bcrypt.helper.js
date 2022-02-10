const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hash password
exports.hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds))
    })
}

// Compare password
exports.comparePassword = (password, mainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, mainPassword,  (error, result) => {
            if (error) {
                console.log('Compare password => ', error)
                reject(error);
            }

            resolve(result);
        });
    });
};