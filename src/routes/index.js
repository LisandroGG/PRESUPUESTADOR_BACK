import { Router } from "express"
import { budgetsRouter } from "./budgets.js"
import { clientsRouter } from "./clients.js"
import { materialsRouter } from "./materials.js"
import { paymentsRouter } from "./payments.js"
import { productsRouter } from "./products.js"
import { statsRouter } from "./stats.js"

export const mainRouter = Router()

mainRouter.get("/", (req, res) => {
	res.send("Server Working")
})

mainRouter.use("/materials", materialsRouter)
mainRouter.use("/products", productsRouter)
mainRouter.use("/clients", clientsRouter)
mainRouter.use("/budgets", budgetsRouter)
mainRouter.use("/payments", paymentsRouter)
mainRouter.use("/stats", statsRouter)
