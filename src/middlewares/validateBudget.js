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

	if (items !== undefined) {
		const itemsValidation = validateBudgetItems(items)

		if (itemsValidation !== true) {
			return sendError(res, budgetMessages[itemsValidation], 400)
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
