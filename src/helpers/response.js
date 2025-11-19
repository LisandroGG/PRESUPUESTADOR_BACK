export const sendError = (res, message, status) => {
	return res.status(status).json({
		sucess: false,
		message,
	})
}
