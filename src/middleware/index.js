const User = require("../users/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        console.log("Inside the hashPass middleware function")
        req.body.password = await bcrypt.hash(req.body.password, parseInt(saltRounds))
        next()
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error:error})
    }
}

const checkPass = async (req, res, next) => {
    try {
        req.user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        console.log("Found user: ", req.user)
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password).then(console.log(res));
        console.log("Compare password - ", comparePassword)
        if(!comparePassword){
            throw new Error("Password or username does not match!")
        }
        next();
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);
    }
}

module.exports = {
    hashPass,
    checkPass
}