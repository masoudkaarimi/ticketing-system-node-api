// Random pin number
exports.randomPinNumber = (length) => {
    let pin = ''

    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10)
    }

    return pin
}
