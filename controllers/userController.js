const { comparePassword } = require("../helpers/bcrypt")
const {sign} = require("../helpers/jwt")
const {User} = require("../models")

class userController {
    static login(req, res, next){
        const {username, password} = req.body
        if (!username || !password) {
            next({name: "Bad Request"})
        }
        User.findOne({where: {username}})
        .then((user) => {
            if (!user) throw ({name: "unauthorized"})
            const compareUser = comparePassword(password, user.password)
            if (!compareUser) throw ({name: "unauthorized"})
            const access_token = sign({id: user.id, username: user.username})
            res.status(200).json({
                access_token,
                role: user.role
            })
        })
        .catch ((error)=> {
            next(error)
        })
    }
    static register(req, res, next){
        const { phoneNumber, gender, dob, ktp, password} = req.body    
        User.create({username: phoneNumber, password, gender, dob, ktp, role: 'patient'})
        .then((user) => {
            res.status(201).json(`Sukses Register with akun ${user.username}`)
        })
        .catch ((error) => {
            console.log(error);
            next(error)
        })
    }
}

module.exports = userController