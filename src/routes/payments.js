import { Router } from "express"
import {
	createPayment,
	deletePayment,
	getAllChecks,
	getAllPaymentsFromBadget,
	updateCheckDetails,
} from "../controllers/paymentControllers.js"
import { validatePayment } from "../middlewares/validatePayment.js"

export const paymentsRouter = Router()

paymentsRouter.get("/:budgetId", getAllPaymentsFromBadget)
paymentsRouter.post("/", validatePayment, createPayment)
paymentsRouter.get("/", getAllChecks)
paymentsRouter.put("/:id", updateCheckDetails)
paymentsRouter.delete("/:id", deletePayment)
