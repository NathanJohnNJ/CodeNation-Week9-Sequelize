const { Router } = require("express");

const userRouter = Router();

const { registerUser } = require("./controllers");

userRouter.post("/users/register", registerUser);

module.exports = userRouter;

