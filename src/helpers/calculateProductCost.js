import { Material } from "../models/materials.js"
import { ProductMaterial } from "../models/productMaterials.js"
import { Product } from "../models/products.js"

export const calculateProductCost = async (productId) => {
	if (!productId) return 0

	const product = await Product.findByPk(productId)
	if (!product) return 0

	const productMaterials = await ProductMaterial.findAll({
		where: { productId },
		include: { model: Material, as: "material" },
	})

	const materialsCost = productMaterials.reduce((t, pm) => {
		return t + pm.quantity * Number(pm.material?.cost || 0)
	}, 0)

	const total = Number(product.productionCost || 0) + materialsCost

	return Number(total)
}
