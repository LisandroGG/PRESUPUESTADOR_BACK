import { Router } from "express"
import {
	createBudget,
	deleteBudget,
	getAllBudgets,
	getBudgetById,
	getBudgetPdf,
	updateBudget,
	updateBudgetStatus,
} from "../controllers/budgetControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validateBudget } from "../middlewares/validateBudget.js"

export const budgetsRouter = Router()

budgetsRouter.get("/", authUser, getAllBudgets)
budgetsRouter.post("/", authUser, validateBudget, createBudget)
budgetsRouter.put("/:id", authUser, validateBudget, updateBudget)
budgetsRouter.put("/status/:id", authUser, validateBudget, updateBudgetStatus)
budgetsRouter.get("/detail/:id", authUser, getBudgetById)
budgetsRouter.get("/pdf/:id", authUser, getBudgetPdf)
budgetsRouter.delete("/:id", authUser, deleteBudget)
