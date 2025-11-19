import { Client } from "./clients.js";
import { Budget } from "./budgets.js";
import { BudgetItem } from "./budgetItems.js";
import { Product } from "./products.js";
import { Material } from "./materials.js";
import { ProductMaterial } from "./productMaterials.js";
import { Payment } from "./payments.js";

// CLIENT / BUDGET
Client.hasMany(Budget, { foreignKey: "clientId" });
Budget.belongsTo(Client, { foreignKey: "clientId" });

// BUDGET / PAYMENT
Budget.hasMany(Payment, { foreignKey: "budgetId" });
Payment.belongsTo(Budget, { foreignKey: "budgetId" });

// BUDGET / BUDGET ITEM
Budget.hasMany(BudgetItem, { foreignKey: "budgetId" });
BudgetItem.belongsTo(Budget, { foreignKey: "budgetId" });

// BUDGET ITEM / PRODUCT
BudgetItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(BudgetItem, { foreignKey: "productId" });

// PRODUCT / MATERIAL
Product.belongsToMany(Material, {
  through: ProductMaterial,
  foreignKey: "productId",
});
Material.belongsToMany(Product, {
  through: ProductMaterial,
  foreignKey: "materialId",
});

Product.hasMany(ProductMaterial, { foreignKey: "productId" });
Material.hasMany(ProductMaterial, { foreignKey: "materialId" });
ProductMaterial.belongsTo(Product, { foreignKey: "productId" });
ProductMaterial.belongsTo(Material, { foreignKey: "materialId" });

export {
  Client,
  Budget,
  BudgetItem,
  Product,
  Material,
  ProductMaterial,
  Payment,
};