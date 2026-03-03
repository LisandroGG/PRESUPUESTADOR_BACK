import { Router } from "express"
import { getDashboardStats } from "../controllers/statsController.js"
import { authUser } from "../middlewares/authUser.js"

export const statsRouter = Router()

statsRouter.get("/", authUser, getDashboardStats)
