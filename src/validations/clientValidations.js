export const validateCuit = (cuit) => {
	if (!cuit) return true

	const regex = /^\d{11}$/
	return regex.test(cuit)
}
