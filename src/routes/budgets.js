import { Router } from "express"
import {
	createBudget,
	deleteBudget,
	getAllBudgets,
	getBudgetByClientId,
	updateBudgetStatus,
} from "../controllers/budgetControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validateBudget } from "../middlewares/validateBudget.js"

export const budgetsRouter = Router()

budgetsRouter.get("/", authUser, getAllBudgets)
budgetsRouter.post("/", authUser, validateBudget, createBudget)
budgetsRouter.put("/status/:id", authUser, validateBudget, updateBudgetStatus)
budgetsRouter.get("/:clientId", authUser, getBudgetByClientId)
budgetsRouter.delete("/:id", authUser, deleteBudget)
