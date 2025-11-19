import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const ProductMaterial = sequelize.define(
	"ProductMaterial",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		materialId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "product_materials",
	},
)
