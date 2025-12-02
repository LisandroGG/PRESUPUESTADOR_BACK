export const validatePaymentMethod = (method) => {
	if (!method) return false

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
	return regex.test(method.trim())
}

export const validatePaymentAmount = (amount) => {
	if (amount === null || amount === undefined) return false

	const value = parseFloat(amount)

	return !Number.isNaN(value) && value > 0
}

export const validatePaymentDate = (date) => {
	if (!date) return false

	const regex = /^\d{4}-\d{2}-\d{2}$/
	if (!regex.test(date)) return false

	const parsed = new Date(date)
	if (Number.isNaN(parsed.getTime())) return false

	const [year, month, day] = date.split("-").map(Number)
	if (
		parsed.getUTCFullYear() !== year ||
		parsed.getUTCMonth() + 1 !== month ||
		parsed.getUTCDate() !== day
	) {
		return false
	}

	return true
}
