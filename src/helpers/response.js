export const sendError = (res, message, status) => {
	return res.status(status).json({
		success: false,
		message,
	})
}
