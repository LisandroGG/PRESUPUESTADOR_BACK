import { budgetMessages } from "../helpers/messages.js"
import { buildPagedResponse, getPagination } from "../helpers/pagination.js"
import { sendError } from "../helpers/response.js"
import { BudgetItem } from "../models/budgetItems.js"
import { Budget } from "../models/budgets.js"
import { Client } from "../models/clients.js"
import { Payment } from "../models/payments.js"
import { Product } from "../models/products.js"

// Get all budgets
export const getAllBudgets = async (req, res) => {
	try {
		const { page, limit, offset } = getPagination(req.query, 9)
		const { count: total, rows } = await Budget.findAndCountAll({
			limit,
			offset,
			order: [["id", "DESC"]],
			attributes: ["id", "description", "status"],
			include: [
				{
					model: Client,
					as: "client",
					attributes: ["id", "name", "cuit"],
				},
			],
		})
		res.status(200).json(buildPagedResponse(rows, total, page, limit))
	} catch (error) {
		req.log.error("Error al obtener presupuestos", error)
		return sendError(res, "Error al obtener presupuestos", 500)
	}
}

// Get a budget by client ID
export const getBudgetByClientId = async (req, res) => {
	try {
		const { clientId } = req.params
		const { page, limit, offset } = getPagination(req.query, 9)
		const { count: total, rows } = await Budget.findAndCountAll({
			where: { clientId },
			limit,
			offset,
			attributes: ["id", "description", "status"],
		})

		if (total === 0) {
			return sendError(res, budgetMessages.NOT_FOUND, 404)
		}
		res.status(200).json(buildPagedResponse(rows, total, page, limit))
	} catch (error) {
		req.log.error("Error al obtener presupuesto del cliente", error)
		return sendError(res, "Error al obtener presupuesto del cliente", 500)
	}
}

// Get a budget by ID
export const getBudgetById = async (req, res) => {
	const { id } = req.params
	try {
		const budget = await Budget.findByPk(id, {
			attributes: ["id", "description", "status"],
			include: [
				{
					model: Client,
					as: "client",
				},
				{
					model: BudgetItem,
					as: "items",
					attributes: ["id", "quantity"],
					include: [
						{
							model: Product,
							as: "product",
							attributes: ["id", "name"],
						},
					],
				},
				{
					model: Payment,
					as: "payments",
					attributes: ["id", "amount", "date", "method"],
				},
			],
		})

		if (!budget) {
			return sendError(res, budgetMessages.NOT_FOUND, 404)
		}
		res.status(200).json(budget)
	} catch (error) {
		req.log.error("Error al obtener presupuesto", error)
		return sendError(res, "Error al obtener presupuesto", 500)
	}
}

// Create a new budget
export const createBudget = async (req, res) => {
	const { clientId, description } = req.body
	try {
		const newBudget = await Budget.create({
			clientId,
			description,
		})

		res.status(200).json({
			message: "Presupuesto creado exitosamente",
			budget: newBudget,
		})
	} catch (error) {
		req.log.error("Error al crear presupuesto", error)
		return sendError(res, "Error al crear presupuesto", 500)
	}
}

// Delete a budget by ID
export const deleteBudget = async (req, res) => {
	const { id } = req.params
	try {
		const budget = await Budget.findByPk(id)
		if (!budget) {
			return sendError(res, budgetMessages.NOT_FOUND, 404)
		}
		await BudgetItem.destroy({ where: { budgetId: id } })
		await Payment.destroy({ where: { budgetId: id } })
		await budget.destroy()
		res.status(200).json({
			message: "Presupuesto eliminado exitosamente",
		})
	} catch (error) {
		req.log.error("Error al eliminar presupuesto", error)
		return sendError(res, "Error al eliminar presupuesto", 500)
	}
}

// Update a budget by ID

export const updateBudget = async (req, res) => {
	const { id } = req.params
	const { description, items } = req.body

	try {
		const budget = await Budget.findByPk(id, {
			include: [
				{
					model: BudgetItem,
					as: "items",
				},
			],
		})

		if (!budget) {
			return sendError(res, budgetMessages.NOT_FOUND, 404)
		}

		if (description !== undefined) {
			budget.description = description
			await budget.save()
		}

		if (items && Array.isArray(items)) {
			const currentItems = budget.items

			const currentProductIds = currentItems.map((item) => item.productId)
			const newProductIds = items.map((i) => i.productId)

			const toDelete = currentProductIds.filter(
				(id) => !newProductIds.includes(id),
			)

			if (toDelete.length > 0) {
				await BudgetItem.destroy({
					where: {
						budgetId: budget.id,
						productId: toDelete,
					},
				})
			}

			for (const i of items) {
				const existing = currentItems.find(
					(item) => item.productId === i.productId,
				)

				if (existing) {
					if (i.quantity !== undefined) {
						existing.quantity = i.quantity
						await existing.save()
					}
				} else {
					await BudgetItem.create({
						budgetId: budget.id,
						productId: i.productId,
						quantity: i.quantity ?? 1,
					})
				}
			}
		}

		res.status(200).json({
			message: "Presupuesto actualizado exitosamente",
			budget: budget,
		})
	} catch (error) {
		req.log.error("Error al actualizar presupuesto", error)
		return sendError(res, "Error al actualizar presupuesto", 500)
	}
}

// Update budget status
export const updateBudgetStatus = async (req, res) => {
	const { id } = req.params
	const { status } = req.body
	try {
		const budget = await Budget.findByPk(id)
		if (!budget) {
			return sendError(res, budgetMessages.NOT_FOUND, 404)
		}
		budget.status = status
		await budget.save()
		res.status(200).json({
			message: "Estado del presupuesto actualizado exitosamente",
		})
	} catch (error) {
		req.log.error("Error al actualizar estado del presupuesto", error)
		return sendError(res, "Error al actualizar estado del presupuesto", 500)
	}
}

// Get pdf of a budget
export const getBudgetPdf = async (req, res) => {}
