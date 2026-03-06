import { Router } from "express"
import {
	createClient,
	deleteClient,
	getAllClients,
	getAllClientsForSelect,
	updateClient,
} from "../controllers/clientControllers.js"
import { validateClient } from "../middlewares/validateClient.js"

export const clientsRouter = Router()

clientsRouter.get("/",  getAllClients)
clientsRouter.get("/select", getAllClientsForSelect)
clientsRouter.post("/", validateClient, createClient)
clientsRouter.delete("/:id", deleteClient)
clientsRouter.put("/:id", validateClient, updateClient)
