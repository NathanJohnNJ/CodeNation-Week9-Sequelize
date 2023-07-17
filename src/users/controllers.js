const User = require("./model");

const registerUser = async (req, res) => {
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

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({})
        for (let user of users){
            user.password="";
        }
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
    getUsers
}