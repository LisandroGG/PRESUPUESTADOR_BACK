import { productMessages } from "../helpers/messages.js"
import { sendError } from "../helpers/response.js"

import {
	validateProductDescription,
	validateProductMaterials,
	validateProductName,
} from "../validations/productValidations.js"

export const validateProduct = (req, res, next) => {
	const { name, description, materials } = req.body

	const isCreate = req.method === "POST"

	// NAME
	if (isCreate || name !== undefined) {
		if (!validateProductName(name)) {
			return sendError(res, productMessages.INVALID_NAME, 400)
		}
	}

	// DESCRIPTION
	if (isCreate || description !== undefined) {
		if (!validateProductDescription(description)) {
			return sendError(res, productMessages.INVALID_DESCRIPTION, 400)
		}
	}

	// MATERIALS
	if (materials !== undefined) {
		const validation = validateProductMaterials(materials)

		if (validation !== true) {
			return sendError(res, productMessages[validation], 400)
		}
	}

	next()
}
