import { Budget } from "../models/budgets.js"
import { Client } from "../models/clients.js"
import { Product } from "../models/products.js"

export const getDashboardStats = async (req, res) => {
	try {
		const totalClients = await Client.count()
		const totalProducts = await Product.count()
		const pendingBudgets = await Budget.count({
			where: { status: "pending" },
		})
		const approvedBudgets = await Budget.count({
			where: { status: "approved" },
		})

		res.json({
			totalClients,
			totalProducts,
			pendingBudgets,
			approvedBudgets,
		})
	} catch (error) {
		req.log.error("Error al obtener estadisticas", error)
		return sendError(res, "Error al obtener estadisticas", 500)
	}
}
