const User = require("./model");

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

//First login method
// const login = async (req, res) => {
//     try {
//         const loggedInUser =  await User.findOne({
//             where: {
//                 username: req.body.username
//             }
//         })
//             res.status(200).json({
//                 message: "Logged in successfully.",
//                 loggedInUser: loggedInUser,
//                 user: {
//                     username: req.body.username,
//                     email: req.body.email
//                 }
//             })
//     } catch (error) {
//         res.status(501).json({errorMessage: error.message, error: error});
//         console.log(error);
//     }
// }

//Second login method using a token 
const login = async (req, res) => {
    try {
        const token = await jwt.sign({id: req.user.id}, process.env.SECRET);
        res.status(200).json({
            message: "Success.",
            user: {
                username: req.user.username,
                email: req.user.email,
                token:token
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
        // for (let user of users){
        //     user.password="";
        // }
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