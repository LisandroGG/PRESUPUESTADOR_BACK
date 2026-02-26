import { DataTypes } from "sequelize"
import { sequelize } from "../config/database.js"

export const Client = sequelize.define(
	"Client",
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
		cuit: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		timestamps: false,
		tableName: "clients",
	},
)
