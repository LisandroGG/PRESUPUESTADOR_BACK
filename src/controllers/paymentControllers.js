import { sequelize } from "../config/database.js"
import { paymentMessages } from "../helpers/messages.js"
import { buildPagedResponse, getPagination } from "../helpers/pagination.js"
import { sendError } from "../helpers/response.js"
import { Budget } from "../models/budgets.js"
import { Payment } from "../models/payments.js"

// Get all payments with ID badget
export const getAllPaymentsFromBadget = async (req, res) => {
	try {
		const { budgetId } = req.params
		const { page, limit, offset } = getPagination(req.query, 9)
		const { count: total, rows } = await Payment.findAndCountAll({
			where: { budgetId },
			limit,
			offset,
			order: [["id", "DESC"]],
		})
		if (total === 0) {
			return sendError(res, paymentMessages.NOT_FOUND, 404)
		}
		res.status(200).json(buildPagedResponse(rows, total, page, limit))
	} catch (error) {
		req.log.error("Error al obtener pagos del presupuesto", error)
		return sendError(res, "Error al obtener pagos del presupuesto", 500)
	}
}

// Create a new payment
export const createPayment = async (req, res) => {
	const { amount, date, method, budgetId } = req.body

	const t = await sequelize.transaction()

	try {
		const budget = await Budget.findByPk(budgetId, {
			transaction: t,
			lock: t.LOCK.UPDATE,
		})

		if (!budget) {
			await t.rollback()
			return sendError(res, "Presupuesto no encontrado", 404)
		}

		if (budget.status === "pending") {
			await t.rollback()
			return sendError(res, "Debe aprobar el presupuesto primero", 400)
		}

		if (!budget.totalAmount) {
			await t.rollback()
			return sendError(res, "Presupuesto sin total congelado", 400)
		}

		const payment = await Payment.create(
			{ amount, date, method, budgetId },
			{ transaction: t },
		)

		const totalPaid =
			(await Payment.sum("amount", {
				where: { budgetId },
				transaction: t,
			})) || 0

		const totalBudget = Number(budget.totalAmount)

		// 🚫 evitar sobrepago
		if (totalPaid > totalBudget) {
			await t.rollback()
			return sendError(res, "El pago excede el total", 400)
		}

		// 🧾 auto paid
		if (totalPaid >= totalBudget) {
			budget.status = "paid"
			await budget.save({ transaction: t })
		}

		await t.commit()

		res.status(200).json({
			message: "Pago registrado",
			total: totalBudget,
			paid: totalPaid,
			remaining: Math.max(0, totalBudget - totalPaid),
		})
	} catch (error) {
		await t.rollback()
		req.log.error("Error al crear pago", error)
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
