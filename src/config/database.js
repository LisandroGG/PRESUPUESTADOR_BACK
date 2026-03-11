import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import pg from "pg"
import { Sequelize } from "sequelize"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
	path: path.resolve(__dirname, "../../.env"),
})

const storagePath = path.resolve(__dirname, "../../database/database.sqlite")

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: storagePath,
	logging: false,
})

;(async () => {
	try {
		await sequelize.authenticate()
		console.log("DB CONNECTED")
		console.log("SYNC MODELS")
		await sequelize.sync({ alter: false })
		console.log("MODELTS CONNECTED")
	} catch (error) {
		console.log("DB CONNECT ERROR:", error)
	}
})()
