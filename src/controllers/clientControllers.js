import { Op } from "sequelize"
import { clientMessages } from "../helpers/messages.js"
import { buildPagedResponse, getPagination } from "../helpers/pagination.js"
import { sendError } from "../helpers/response.js"
import { Client } from "../models/clients.js"

// Get all clients
export const getAllClients = async (req, res) => {
	try {
		const { name, cuit } = req.query
		const { page, limit, offset } = getPagination(req.query, 12)

		const conditions = []

		if (name) {
			conditions.push({
				name: { [Op.iLike]: `%${name}%` },
			})
		}

		if (cuit) {
			conditions.push({
				cuit: { [Op.iLike]: `%${cuit}%` },
			})
		}

		const whereClause = conditions.length > 0 ? { [Op.or]: conditions } : {}

		const { count: total, rows } = await Client.findAndCountAll({
			where: whereClause,
			limit,
			offset,
			order: [["id", "DESC"]],
		})

		return res.status(200).json(buildPagedResponse(rows, total, page, limit))
	} catch (error) {
		req.log.error("Error al obtener clientes:", error)
		return sendError(res, "Error al obtener clientes", 500)
	}
}

export const getAllClientsForSelect = async (req, res) => {
	try {
		const clients = await Client.findAll({
			order: [["id", "DESC"]],
		})
		return res.status(200).json(clients)
	} catch (error) {
		req.log.error("Error al obtener clientes para select:", error)
		return sendError(res, "Error al obtener clientes para select", 500)
	}
}

// Create a new client
export const createClient = async (req, res) => {
	const { name, cuit } = req.body
	try {
		const existingClient = await Client.findOne({
			where: {
				[Op.or]: [{ name }, { cuit }],
			},
		})
		if (existingClient) {
			return sendError(res, "Nombre o CUIT ya registrados", 400)
		}
		const newClient = await Client.create({ name, cuit })
		res.status(200).json({
			message: "Cliente creado exitosamente",
			client: newClient,
		})
	} catch (error) {
		req.log.error("Error al crear cliente:", error)
		return sendError(res, "Error al crear cliente", 500)
	}
}

// Delete a client by ID
export const deleteClient = async (req, res) => {
	const { id } = req.params
	try {
		const client = await Client.findByPk(id)
		if (!client) {
			return sendError(res, clientMessages.NOT_FOUND, 404)
		}
		await client.destroy()
		res.status(200).json({ message: "Cliente eliminado exitosamente" })
	} catch (error) {
		req.log.error("Error al eliminar cliente:", error)
		return sendError(res, "Error al eliminar cliente", 500)
	}
}

// Update a client by ID
export const updateClient = async (req, res) => {
	const { id } = req.params
	const { name, cuit } = req.body

	try {
		const client = await Client.findByPk(id)
		if (!client) {
			return sendError(res, clientMessages.NOT_FOUND, 404)
		}

		const existingClient = await Client.findOne({
			where: {
				[Op.or]: [{ name }, { cuit }],
			},
		})
		if (existingClient) {
			return sendError(res, "Nombre o CUIT ya registrados", 400)
		}

		if (name) client.name = name
		if (cuit) client.cuit = cuit

		await client.save()
		res.status(200).json({
			message: "Cliente actualizado exitosamente",
			client: client,
		})
	} catch (error) {
		req.log.error("Error al actualizar cliente:", error)
		return sendError(res, "Error al actualizar cliente", 500)
	}
}
