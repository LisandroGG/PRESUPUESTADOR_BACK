import { Product } from "../models/products.js"

export const validateProductExists = async (id) => {
	if (!id) return false

	const product = await Product.findByPk(id)
	return !!product
}

export const validateProductName = (name) => {
	if (!name) return false

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/
	return regex.test(name.trim())
}

export const validateProductDescription = (description) => {
	if (!description) return false

	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/
	return regex.test(description.trim())
}

export const validateProductMaterials = (materials) => {
	if (!Array.isArray(materials)) return "INVALID_MATERIALS"

	for (const m of materials) {
		if (
			typeof m.materialId !== "number" ||
			m.materialId <= 0 ||
			Number.isNaN(m.materialId)
		) {
			return "INVALID_MATERIALS"
		}

		if (m.quantity === undefined) {
			return "INVALID_MATERIAL_QUANTITY"
		}

		if (
			typeof m.quantity !== "number" ||
			m.quantity <= 0 ||
			Number.isNaN(m.quantity)
		) {
			return "INVALID_MATERIAL_QUANTITY"
		}
	}

	return true
}
