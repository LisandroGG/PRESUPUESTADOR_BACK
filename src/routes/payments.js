import { Router } from "express"
import {
	createPayment,
	deletePayment,
	getAllPaymentsFromBadget,
} from "../controllers/paymentControllers.js"
import { validatePayment } from "../middlewares/validatePayment.js"

export const paymentsRouter = Router()

paymentsRouter.get("/:budgetId", getAllPaymentsFromBadget)
paymentsRouter.post("/", validatePayment, createPayment)
paymentsRouter.delete("/:id", deletePayment)
