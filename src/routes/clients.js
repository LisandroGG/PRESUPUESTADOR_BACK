import { Router } from "express"
import {
	createClient,
	deleteClient,
	getAllClients,
	getAllClientsForSelect,
	updateClient,
} from "../controllers/clientControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validateClient } from "../middlewares/validateClient.js"

export const clientsRouter = Router()

clientsRouter.get("/", authUser, getAllClients)
clientsRouter.get("/select", authUser, getAllClientsForSelect)
clientsRouter.post("/", authUser, validateClient, createClient)
clientsRouter.delete("/:id", authUser, deleteClient)
clientsRouter.put("/:id", authUser, validateClient, updateClient)
