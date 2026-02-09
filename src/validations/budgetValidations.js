import { Budget } from "../models/budgets.js"

export const validateBadgetExists = async (id) => {
	if (!id) return false

	const badget = await Budget.findByPk(id)
	return !!badget
}

export const validateBudgetDescription = (description) => {
	if (!description) return false

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/
	return regex.test(description.trim())
}

export const validateBudgetItems = (items) => {
	if (!Array.isArray(items)) return "INVALID_ITEMS"

	for (const i of items) {
		if (
			typeof i.productId !== "number" ||
			i.productId <= 0 ||
			Number.isNaN(i.productId)
		) {
			return "INVALID_ITEMS"
		}

		if (i.quantity === undefined) {
			return "INVALID_ITEMS_QUANTITY"
		}

		if (
			typeof i.quantity !== "number" ||
			i.quantity <= 0 ||
			Number.isNaN(i.quantity)
		) {
			return "INVALID_ITEMS_QUANTITY"
		}
	}

	return true
}
