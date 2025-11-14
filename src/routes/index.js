import { Router } from "express"
import { usersRouter } from "./users.js"
import { tasksRouter } from "./task.js";

export const mainRouter = Router()

mainRouter.get("/", (req, res) => {
	res.send("Server Working")
});

mainRouter.use("/users", usersRouter);
mainRouter.use("/tasks", tasksRouter);

