import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Material = sequelize.define(
    "Material",
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
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    },
    {
        timestamps: false,
        tableName: "materials",
    },
);