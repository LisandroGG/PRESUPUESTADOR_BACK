import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const Payment = sequelize.define(
	"Payment",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		method: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		tableName: "payments",
	},
)
