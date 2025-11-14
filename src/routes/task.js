import { Router } from "express"
import {
    getAllTasks,
    createTask,
    deleteTask,
    editTask,
} from "../controllers/taskControllers.js"
import { authUser } from "../middlewares/authUser.js"

export const tasksRouter = Router();

tasksRouter.get("/", authUser, getAllTasks)
tasksRouter.post("/", authUser, createTask)
tasksRouter.delete("/:id", authUser, deleteTask)
tasksRouter.put("/:id", authUser, editTask)