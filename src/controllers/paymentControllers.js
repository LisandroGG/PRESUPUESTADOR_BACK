import { paymentMessages } from "../helpers/messages.js"
import { sendError } from "../helpers/response.js"
import { Payment } from "../models/payments.js"

// Get all payments with ID badget

export const getAllPaymentsFromBadget = async (req, res) => {
	const { id } = req.params
	try {
		const payments = await Payment.findAll({
			where: { budgetId: id },
		})
		if (payments.length === 0) {
			return sendError(res, paymentMessages.NOT_FOUND, 404)
		}
		res.status(200).json(payments)
	} catch (error) {
		req.log.error("Error al obtener pagos del presupuesto", error)
		return sendError(res, "Error al obtener pagos del presupuesto", 500)
	}
}

// Create a new payment
export const createPayment = async (req, res) => {
	const { amount, date, method, budgetId } = req.body
	try {
		const newPayment = await Payment.create({
			amount,
			date,
			method,
			budgetId,
		})
		res.status(200).json({
			message: "Pago creado exitosamente",
			payment: newPayment,
		})
	} catch (error) {
		req.log.error("Errora al crear pago", error)
		return sendError(res, "Error al crear pago", 500)
	}
}

// Delete a payment by ID
export const deletePayment = async (req, res) => {
	const { id } = req.params
	try {
		const payment = await Payment.findByPk(id)
		if (!payment) {
			return sendError(res, paymentMessages.NOT_FOUND, 404)
		}
		await payment.destroy()
		res.status(200).json({
			message: "Pago eliminado exitosamente",
		})
	} catch (error) {
		req.log.error("Error al eliminar pago", error)
		return sendError(res, "Error al eliminar pago", 500)
	}
}
