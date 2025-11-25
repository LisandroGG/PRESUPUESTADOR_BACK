export const validateMaterialName = (name) => {
	if (!name) return false

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/
	return regex.test(name.trim())
}

export const validateMaterialProvider = (provider) => {
	if (!provider) return false

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/
	return regex.test(provider.trim())
}

export const validateMaterialCost = (cost) => {
	if (cost === null || cost === undefined) return false

	const value = parseFloat(cost)

	return !Number.isNaN(value) && value > 0
}
