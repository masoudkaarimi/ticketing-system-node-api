const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', (error) => console.log("Redis connected!"))
client.on('end', (error) => console.log("Redis disconnected!"))
client.on('reconnecting', (error) => console.log("Redis reconnecting!"))
client.on('error', (error) =>  console.log('Redis client => ', error))


// Set JWT
exports.setJWT = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            client.set(key, value, (error, res) => {
                if (error) {
                    console.log('Redis set JWT => ', error)
                    reject(error)
                }

                resolve(res)
            })
        } catch (error) {
            console.log('Redis set JWT => ', error)
            reject(error)
        }
    })
}

// Get JWT
exports.getJWT = (key) => {
    return new Promise((resolve, reject) => {
        try {
            client.get(key, (error, res) => {
                if (error) {
                    console.log('Redis get JWT => ', error)
                    reject(error)
                }

                resolve(res)
            })
        } catch (error) {
            console.log('Redis get JWT => ', error)
            reject(error)
        }
    })
}

// Delete JWT
exports.deleteJWT = (key) => {
    try {
        client.del(key)
    } catch (error) {
        console.log('Redis delete JWT => ', error)
    }
}