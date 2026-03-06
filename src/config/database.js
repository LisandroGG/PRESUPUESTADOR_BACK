import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"
import pg from "pg"
import { Sequelize } from "sequelize"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
	path: path.resolve(__dirname, "../../.env"),
})

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: "postgres",
	protocol: "postgres",
	dialectModule: pg,
	logging: false,
	dialectOptions: {},
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
