import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const Product = sequelize.define(
	"Product",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		productionCost: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		timestamps: false,
		tableName: "products",
	},
)
