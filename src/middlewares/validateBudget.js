import { budgetMessages } from "../helpers/messages.js"
import { sendError } from "../helpers/response.js"
import {
	validateBudgetDescription,
	validateBudgetItems,
} from "../validations/budgetValidations.js"
import { validateClientExists } from "../validations/clientValidations.js"
import { validateProductExists } from "../validations/productValidations.js"

export const validateBudget = async (req, res, next) => {
	const { description, clientId, items, status } = req.body

	const isCreate = req.method === "POST"

	// DESCRIPTION
	if (isCreate || description !== undefined) {
		if (!validateBudgetDescription(description)) {
			return sendError(res, budgetMessages.INVALID_DESCRIPTION, 400)
		}
	}

	// CLIENT ID

	if (isCreate || clientId !== undefined) {
		const clientExists = await validateClientExists(clientId)
		if (!clientExists) {
			return sendError(res, budgetMessages.CLIENT_NOT_FOUND, 404)
		}
	}

	// ITEMS

	if (isCreate || items !== undefined) {
		const itemsValidation = validateBudgetItems(items)

		if (itemsValidation !== true) {
			if (itemsValidation === "DUPLICATE") {
				return sendError(res, budgetMessages.DUPLICATE_ITEM, 400)
			}

			if (itemsValidation === "INVALID_ITEMS_QUANTITY") {
				return sendError(res, budgetMessages.INVALID_ITEMS_QUANTITY, 400)
			}

			return sendError(res, budgetMessages.INVALID_ITEMS, 400)
		}

		for (const item of items) {
			const productExist = await validateProductExists(item.productId)
			if (!productExist) {
				return sendError(res, budgetMessages.PRODUCT_NOT_FOUND, 404)
			}
		}
	}

	if (status !== undefined) {
		const validStatuses = ["pending", "approved", "paid"]
		if (!validStatuses.includes(status)) {
			return sendError(res, budgetMessages.INVALID_STATUS, 400)
		}
	}

	next()
}
