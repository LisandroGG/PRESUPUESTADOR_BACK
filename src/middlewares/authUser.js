import jwt from "jsonwebtoken"
import { userMessages } from "../helpers/messages.js"
import { sendError } from "../helpers/response.js"

export const authUser = (req, res, next) => {
	const token = req.cookies.token

	if (!token) {
		return sendError(res, userMessages.NOT_FOUND_TOKEN, 401)
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
		req.user = decoded
		next()
	} catch (error) {
		return sendError(res, userMessages.INVALID_TOKEN, 401)
	}
}
