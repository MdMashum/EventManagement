const jwt = require('jsonwebtoken');

const create = (userId) => { 
    return jwt.sign({
        userId: userId
    }, "dlnr4MU44gvXNxvhmyeeV9b6huF4qjFa", { expiresIn: '1h' });
}
/**
 * @jwt.verify(token, secretOrPublicKey, callback) callback is an Asynchronous so we use Promiss
 */
const verify = (res, token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "dlnr4MU44gvXNxvhmyeeV9b6huF4qjFa", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({
                    status: false,
                    message: error.message
                });
            }
            else {
                resolve(decodedToken); 
            }
        });
    });
}



module.exports = {
    createToken: create,
    verifyToken: verify
}