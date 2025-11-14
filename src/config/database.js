import dotenv from "dotenv"
import pg from "pg"
import { Sequelize } from "sequelize"

dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_URL, API_STATUS } =
	process.env

export const sequelize =
	API_STATUS === "production"
		? new Sequelize(DB_URL, {
				dialect: "postgres",
				protocol: "postgres",
				dialectModule: pg,
				logging: false,
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false,
					},
				},
			})
		: new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
				host: DB_HOST,
				dialect: "postgres",
				protocol: "postgres",
				dialectModule: pg,
				logging: false,
				dialectOptions: {},
			})

;(async (req, res) => {
	try {
		await sequelize.authenticate()
		console.log("DB CONNECTED")
		console.log("SYNC MODELS")
		await sequelize.sync({ alter: false })
		console.log("MODELTS CONNECTED")
	} catch (error) {
		req.log.error("DB CONNECT ERROR:", error)
	}
})()
