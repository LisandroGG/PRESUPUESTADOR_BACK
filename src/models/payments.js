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
	},
	{
		timestamps: false,
		tableName: "payments",
	},
)
