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
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "budgets",
	},
)
