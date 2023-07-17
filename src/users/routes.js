const { Router } = require("express");

const userRouter = Router();

const { registerUser, getUsers } = require("./controllers");

userRouter.post("/users/register", registerUser);
userRouter.get("/users/getAllUsers", getUsers);

module.exports = userRouter;

