import { Router } from "express"
import {
	createClient,
	deleteClient,
	getAllClients,
	searchClients,
	updateClient,
} from "../controllers/clientControllers.js"
import { authUser } from "../middlewares/authUser.js"

export const clientsRouter = Router()

clientsRouter.get("/", authUser, getAllClients)
clientsRouter.get("/search", authUser, searchClients)
clientsRouter.post("/", authUser, createClient)
clientsRouter.delete("/:id", authUser, deleteClient)
clientsRouter.put("/:id", authUser, updateClient)
