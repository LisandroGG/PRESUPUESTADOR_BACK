import { Op } from "sequelize"
import { materialMessages } from "../helpers/messages.js"
import { sendError } from "../helpers/response.js"
import { Material } from "../models/materials.js"

// Get all materials

export const getAllMaterials = async (req, res) => {
	try {
		const materials = await Material.findAll()
		return res.status(200).json(materials)
	} catch (error) {
		req.log.error("Error al obtener materiales:")
		return sendError(res, "Error al obtener materiales", 500)
	}
}

// Create a new material
export const createMaterial = async (req, res) => {
	const { name, provider, cost } = req.body

	try {
		const existingMaterial = await Material.findOne({
			where: { name, provider },
		})
		if (existingMaterial) {
			return sendError(res, materialMessages.DUPLICATE_MATERIAL, 400)
		}
		const newMaterial = await Material.create({ name, provider, cost })
		res.status(200).json({
			message: "Material creado exitosamente",
			material: newMaterial,
		})
	} catch (error) {
		req.log.error("Error al crear material:", error)
		return sendError(res, "Error al crear material", 500)
	}
}

// Delete a material by ID
export const deleteMaterial = async (req, res) => {
	const { id } = req.params
	try {
		const material = await Material.findByPk(id)
		if (!material) {
			return sendError(res, materialMessages.NOT_FOUND, 404)
		}
		await material.destroy()
		res.status(200).json({
			message: "Material eliminado exitosamente",
		})
	} catch (error) {
		req.log.error("Error al eliminar material:", error)
		return sendError(res, "Error al eliminar material", 500)
	}
}

// Update a material by ID
export const updateMaterial = async (req, res) => {
	const { id } = req.params
	const { name, provider, cost } = req.body
	try {
		const material = await Material.findByPk(id)
		if (!material) {
			return sendError(res, materialMessages.NOT_FOUND, 404)
		}

		if (name) material.name = name
		if (provider) material.provider = provider
		if (cost) material.cost = cost
		await material.save()
		res.status(200).json({
			message: "Material actualizado exitosamente",
			material: material,
		})
	} catch (error) {
		req.log.error("Error al actualizar material:", error)
		return sendError(res, "Error al actualizar material", 500)
	}
}

// Search materials by name or provider
export const searchMaterials = async (req, res) => {
	const { name, provider } = req.query
	try {
		const conditions = []
		if (name) {
			conditions.push({
				name: { [Op.iLike]: `%${name}%` },
			})
		}
		if (provider) {
			conditions.push({
				provider: { [Op.iLike]: `%${provider}%` },
			})
		}

		const whereClause = conditions.length > 0 ? { [Op.and]: conditions } : {}

		const materials = await Material.findAll({
			where: whereClause,
		})
		res.status(200).json({
			message: "Materiales encontrados",
			materials: materials,
		})
	} catch (error) {
		req.log.error("Error al buscar materiales:", error)
		return sendError(res, "Error al buscar materiales", 500)
	}
}
