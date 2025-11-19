import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const BudgetItem = sequelize.define(
	"BudgetItem",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		budgetId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
	},
	{
		timestamps: false,
		tableName: "budget_items",
	},
)
