import { Router } from "express"
import {
	createMaterial,
	deleteMaterial,
	getAllMaterials,
	getAllMaterialsForSelect,
	searchMaterials,
	updateMaterial,
} from "../controllers/materialControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validateMaterial } from "../middlewares/validateMaterial.js"

export const materialsRouter = Router()

materialsRouter.get("/", authUser, getAllMaterials)
materialsRouter.get("/select", authUser, getAllMaterialsForSelect)
materialsRouter.post("/", authUser, validateMaterial, createMaterial)
materialsRouter.put("/:id", authUser, validateMaterial, updateMaterial)
materialsRouter.delete("/:id", authUser, deleteMaterial)
materialsRouter.get("/search", authUser, searchMaterials)
