import { BudgetItem } from "./budgetItems.js"
import { Budget } from "./budgets.js"
import { Client } from "./clients.js"
import { Material } from "./materials.js"
import { Payment } from "./payments.js"
import { ProductMaterial } from "./productMaterials.js"
import { Product } from "./products.js"

// CLIENT / BUDGET
Client.hasMany(Budget, { foreignKey: "clientId", as: "budgets" })
Budget.belongsTo(Client, { foreignKey: "clientId", as: "client" })

// BUDGET / PAYMENT
Budget.hasMany(Payment, { foreignKey: "budgetId", as: "payments" })
Payment.belongsTo(Budget, { foreignKey: "budgetId", as: "budget" })

// BUDGET / BUDGET ITEM
Budget.hasMany(BudgetItem, { foreignKey: "budgetId", as: "items" })
BudgetItem.belongsTo(Budget, { foreignKey: "budgetId", as: "budget" })

// BUDGET ITEM / PRODUCT
BudgetItem.belongsTo(Product, { foreignKey: "productId", as: "product" })
Product.hasMany(BudgetItem, { foreignKey: "productId", as: "budgetItems" })

// PRODUCT / MATERIAL
Product.belongsToMany(Material, {
	through: ProductMaterial,
	foreignKey: "productId",
	as: "materials",
})
Material.belongsToMany(Product, {
	through: ProductMaterial,
	foreignKey: "materialId",
	as: "products",
})

Product.hasMany(ProductMaterial, {
	foreignKey: "productId",
	as: "productMaterials",
})
Material.hasMany(ProductMaterial, {
	foreignKey: "materialId",
	as: "product",
})
ProductMaterial.belongsTo(Product, {
	foreignKey: "productId",
	as: "materialProducts",
})
ProductMaterial.belongsTo(Material, {
	foreignKey: "materialId",
	as: "material",
})

export {
	Client,
	Budget,
	BudgetItem,
	Product,
	Material,
	ProductMaterial,
	Payment,
}
