import { Router } from "express"
import {
	createPayment,
	deletePayment,
	getAllPaymentsFromBadget,
} from "../controllers/paymentControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validatePayment } from "../middlewares/validatePayment.js"

export const paymentsRouter = Router()

paymentsRouter.get("/:id", authUser, getAllPaymentsFromBadget)
paymentsRouter.post("/", authUser, validatePayment, createPayment)
paymentsRouter.delete("/:id", authUser, deletePayment)
