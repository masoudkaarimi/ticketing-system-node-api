const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = (password) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(password, saltRounds))
    })
}

exports.comparePassword = (password, mainPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, mainPassword, function (error, result) {
            if (error) reject(error);

            resolve(result);
        });
    });
};