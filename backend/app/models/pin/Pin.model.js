const {PinSchema} = require('./Pin.schema')
const {randomPinNumber} = require("../../utils/randomGenerator")

// Set reset password pin
exports.setResetPasswordPin = async (email) => {
    // Generate random pin number
    const pinLength = 6
    const randomPin = await randomPinNumber(pinLength)

    const resetObj = {
        email,
        pin: randomPin
    }

    return new Promise((resolve, reject) => {
        PinSchema(resetObj).save()
            .then(data => resolve(data))
            .catch(error => {
                console.log('Set reset password pin => ', error)
                reject(error)
            })
    })
}

// Check is valid pin and email
exports.checkIsValidPinAndEmail = (pin, email) => {
    return new Promise((resolve, reject) => {
        try {
            PinSchema.findOne({email, pin}, (error, data) => {
                if (error) {
                    console.log('Check is valid pin and email => ', error)
                    resolve(false)
                }

                resolve(data)
            })
        } catch (error) {
            console.log('Check is valid pin and email => ', error)
            reject(error)
        }
    })
}

// Delete pin
exports.deletePin = (email, pin) => {
    try {
        PinSchema.findOneAndDelete({email, pin}, (error, data) => {
            if (error) {
                console.log('Get pin by email and pin => ', error)
            }
        })
    } catch (error) {
        console.log('Get pin by email and pin => ', error)
    }
}
