const { Router } = require("express");

const userRouter = Router();

const { registerUser, login, getUsers } = require("./controllers");
const { hashPass, checkPass, checkToken } = require("../middleware")

userRouter.post("/users/register", hashPass, registerUser);
userRouter.post("/users/login", checkPass, login);
userRouter.get("/users/getAllUsers", checkToken, getUsers);

module.exports = userRouter;

