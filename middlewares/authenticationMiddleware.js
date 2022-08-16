const { verify } = require("../helpers/jwt")
const { User } = require("../models")

function authenticationMiddleware(req, res, next){    
        if(!req.headers.access_token) {
            next({ name: "FailedAccessToken"})
        }
        const payload = verify(req.headers.access_token)
        const {username} = payload
        User.findOne({ where: {username}})
        .then((user)=> {
            if (!user) throw ({name: "unauthorized"})
            req.user = {
                id: user.id,
                username: user.username,
                role: user.role
            }
            next()
        })
        .catch ((error) => {
            next(error)
        })
}

module.exports = authenticationMiddleware