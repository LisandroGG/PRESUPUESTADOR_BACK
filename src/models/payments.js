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
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		}
	},
	{
		timestamps: false,
		tableName: "payments",
	},
)
