import { Op } from "sequelize"
import { productMessages } from "../helpers/messages.js"
import { buildPagedResponse, getPagination } from "../helpers/pagination.js"
import { sendError } from "../helpers/response.js"
import { Material } from "../models/materials.js"
import { ProductMaterial } from "../models/productMaterials.js"
import { Product } from "../models/products.js"

// Get all products
export const getAllProducts = async (req, res) => {
	try {
		const { name } = req.query
		const { page, limit, offset } = getPagination(req.query, 9)

		const conditions = []

		if (name) {
			conditions.push({
				name: { [Op.iLike]: `%${name}%` },
			})
		}

		const whereClause = conditions.length > 0 ? { [Op.or]: conditions } : {}

		const { count: total, rows } = await Product.findAndCountAll({
			where: whereClause,
			limit,
			offset,
			order: [["id", "DESC"]],
		})
		res.status(200).json(buildPagedResponse(rows, total, page, limit))
	} catch (error) {
		req.log.error("Error al obtener productos", error)
		return sendError(res, "Error al obtener productos", 500)
	}
}

export const getAllProductsForSelect = async (req, res) => {
	try {
		const products = await Product.findAll({
			order: [["id", "DESC"]],
		})
		return res.status(200).json(products)
	} catch (error) {
		req.log.error("Error al obtener productos para select:", error)
		return sendError(res, "Error al obtener productos para select", 500)
	}
}

// Get a product by id

export const getProductById = async (req, res) => {
	const { id } = req.params
	try {
		const product = await Product.findByPk(id, {
			include: [
				{
					model: ProductMaterial,
					as: "productMaterials",
					include: [
						{
							model: Material,
							as: "material",
						},
					],
				},
			],
		})

		if (!product) {
			return sendError(res, productMessages.NOT_FOUND, 404)
		}
		const totalMaterialsCost = product.productMaterials.reduce(
			(total, pm) => total + pm.quantity * Number(pm.material.cost),
			0,
		)

		res.status(200).json({
			...product.toJSON(),
			totalMaterialsCost: Number(totalMaterialsCost.toFixed(2)),
		})
	} catch (error) {
		req.log.error("Error al obtener producto", error)
		return sendError(res, "Error al obtener producto", 500)
	}
}

// Create a new product

export const createProduct = async (req, res) => {
	const { name, description } = req.body

	try {
		const existingProduct = await Product.findOne({
			where: { name },
		})
		if (existingProduct) {
			return sendError(req, productMessages.DUPLICATE_PRODUCT, 400)
		}
		const newProduct = await Product.create({
			name,
			description,
		})

		res.status(200).json({
			message: "Producto create exisotamente",
			product: newProduct,
		})
	} catch (error) {
		req.log.error("Error al crear producto:", error)
		return sendError(res, "Error al crear producto", 500)
	}
}

// Delete a product by ID
export const deleteProduct = async (req, res) => {
	const { id } = req.params
	try {
		const product = await Product.findByPk(id)
		if (!product) {
			return sendError(res, productMessages.NOT_FOUND, 404)
		}
		await ProductMaterial.destroy({ where: { productId: id } })
		await product.destroy()
		res.status(200).json({
			message: "Producto eliminado exitosamente",
		})
	} catch (error) {
		req.log.error("Error al eliminar producto:", error)
		return sendError(res, "Error al eliminar producto", 500)
	}
}

// Update a product by ID
export const updateProduct = async (req, res) => {
	const { id } = req.params
	const { name, description, materials, productionCost } = req.body

	try {
		const product = await Product.findByPk(id, {
			include: [
				{
					model: ProductMaterial,
					as: "productMaterials",
				},
			],
		})

		if (!product) {
			return sendError(res, productMessages.NOT_FOUND, 404)
		}

		if (name) product.name = name
		if (description) product.description = description
		await product.save()

		if (materials && Array.isArray(materials)) {
			const currentIds = product.productMaterials.map((pm) => pm.materialId)
			const newIds = materials.map((m) => m.materialId)

			const toDelete = currentIds.filter((id) => !newIds.includes(id))
			if (toDelete.length > 0) {
				await ProductMaterial.destroy({
					where: {
						productId: product.id,
						materialId: toDelete,
					},
				})
			}
			for (const m of materials) {
				const existing = product.productMaterials.find(
					(pm) => pm.materialId === m.materialId,
				)
				if (existing) {
					existing.quantity = m.quantity
					await existing.save()
				} else {
					await ProductMaterial.create({
						productId: product.id,
						materialId: m.materialId,
						quantity: m.quantity,
					})
				}
			}
		}
		if (productionCost !== undefined) {
			product.productionCost = productionCost
			await product.save()
		}
		res.status(200).json({
			message: "Producto actualizado exitosamente",
			product: product,
		})
	} catch (error) {
		req.log.error("Error al actualizar producto:", error)
		return sendError(res, "Error al actualizar producto", 500)
	}
}
