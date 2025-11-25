import { clientMessages } from "../helpers/messages.js"
import { sendError } from "../helpers/response.js"
import {
	validateClientName,
	validateCuit,
} from "../validations/clientValidations.js"

export const validateClient = (req, res, next) => {
	const { name, cuit } = req.body

	// NAME OR CUIT
	if (!name && !cuit) {
		return sendError(res, clientMessages.REQUIRED_FIELD, 400)
	}

	// NAME
	if (name && !validateClientName(name)) {
		return sendError(res, clientMessages.INVALID_NAME, 400)
	}

	// CUIT
	if (cuit && !validateCuit(cuit)) {
		return sendError(res, clientMessages.INVALID_CUIT, 400)
	}

	next()
}
