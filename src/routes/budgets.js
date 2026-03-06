import { Router } from "express"
import {
	createBudget,
	deleteBudget,
	getAllBudgets,
	getBudgetById,
	getBudgetPdf,
	getRecentBudgets,
	updateBudget,
	updateBudgetStatus,
} from "../controllers/budgetControllers.js"
import { validateBudget } from "../middlewares/validateBudget.js"

export const budgetsRouter = Router()

budgetsRouter.get("/", getAllBudgets)
budgetsRouter.post("/recent", getRecentBudgets)
budgetsRouter.post("/", validateBudget, createBudget)
budgetsRouter.put("/:id", validateBudget, updateBudget)
budgetsRouter.put("/status/:id", validateBudget, updateBudgetStatus)
budgetsRouter.get("/detail/:id", getBudgetById)
budgetsRouter.get("/pdf/:id", getBudgetPdf)
budgetsRouter.delete("/:id", deleteBudget)
