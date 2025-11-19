import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Budget = sequelize.define(
    "Budget",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        timestamps: false,
        tableName: "budgets",
    },
);