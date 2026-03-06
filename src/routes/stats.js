import { Router } from "express"
import { getDashboardStats } from "../controllers/statsController.js"

export const statsRouter = Router()

statsRouter.get("/", getDashboardStats)
