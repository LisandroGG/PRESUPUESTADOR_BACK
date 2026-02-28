import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const Budget = sequelize.define(
	"Budget",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "pending",
			options: ["pending", "approved", "paid"],
		},
		totalAmount: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true,
		},
	},
	{
		timestamps: false,
		tableName: "budgets",
	},
)
