const User = require("./model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    console.log("Next called and inside controller")
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.status(201).json({
            message: `${req.body.username} succesfully added.`,
            user:{username:req.body.username, email:req.body.email}
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        loggedInUser =  await User.findOne({
            where: {
                username: req.body.username
            }
        })
        const token = await jwt.sign({id: loggedInUser.id}, process.env.SECRET);
        console.log ("********* token = ", token)
            res.status(200).json({
                message: "Logged in successfully.",
                loggedInUser: loggedInUser,
                user: {
                    username: loggedInUser.username,
                    email: loggedInUser.email,
                    token: token
                }
            })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({})
        res.status(201).json({
            message: "Found all users.",
            users:users
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error});
        console.log(error);
    }
};

module.exports = {
    registerUser,
    getUsers,
    login
}