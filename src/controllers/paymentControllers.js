import { Op } from "sequelize"
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

		const totalPaidRaw =
			(await Payment.sum("amount", {
				where: { budgetId },
				transaction: t,
			})) || 0

		const totalPaid = Number(totalPaidRaw.toFixed(2))

		const totalBudget = Number(Number(budget.totalAmount).toFixed(2))

		const remaining = Number(Math.max(0, totalBudget - totalPaid).toFixed(2))

		if (totalPaid > totalBudget) {
			await t.rollback()
			return sendError(res, "El pago excede el total", 400)
		}

		if (totalPaid >= totalBudget) {
			budget.status = "paid"
			await budget.save({ transaction: t })
		}

		await t.commit()

		res.status(200).json({
			message: "Pago registrado",
			total: totalBudget,
			paid: totalPaid,
			remaining,
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

export const getAllChecks = async (req, res) => {
	try {
		const { checkEntity, exchanged } = req.query
		const { page, limit, offset } = getPagination(req.query, 12)

		const conditions = [{ method: "Cheque" }]

		if (checkEntity) {
			conditions.push({
				checkEntity: { [Op.like]: `%${checkEntity}%` },
			})
		}

		if (exchanged === "true") {
			conditions.push({
				checkExchangeDate: { [Op.not]: null },
			})
		}

		if (exchanged === "false") {
			conditions.push({
				checkExchangeDate: null,
			})
		}

		const { count: total, rows } = await Payment.findAndCountAll({
			where: { [Op.and]: conditions },
			limit,
			offset,
			order: [["id", "DESC"]],
		})

		res.status(200).json(buildPagedResponse(rows, total, page, limit))
	} catch (error) {
		req.log.error("Error al obtener cheques", error)
		console.log("error:", error)
		return sendError(res, "Error al obtener cheques", 500)
	}
}

export const updateCheckDetails = async (req, res) => {
	const { id } = req.params
	const { checkExchangeDate, checkEntity } = req.body

	try {
		const payment = await Payment.findByPk(id)

		if (!payment) {
			return sendError(res, paymentMessages.NOT_FOUND, 404)
		}

		if (payment.method !== "Cheque") {
			return sendError(res, "El pago no es un cheque", 400)
		}

		await payment.update({ checkExchangeDate, checkEntity, exchanged: true })

		res.status(200).json({
			message: "Datos del cheque actualizados",
			payment: payment,
		})
	} catch (error) {
		req.log.error("Error al actualizar cheque", error)
		return sendError(res, "Error al actualizar cheque", 500)
	}
}
