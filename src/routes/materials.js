import { Router } from "express"
import {
	createMaterial,
	deleteMaterial,
	getAllMaterials,
	getAllMaterialsForSelect,
	updateMaterial,
} from "../controllers/materialControllers.js"
import { validateMaterial } from "../middlewares/validateMaterial.js"

export const materialsRouter = Router()

materialsRouter.get("/", getAllMaterials)
materialsRouter.get("/select", getAllMaterialsForSelect)
materialsRouter.post("/", validateMaterial, createMaterial)
materialsRouter.put("/:id", validateMaterial, updateMaterial)
materialsRouter.delete("/:id", deleteMaterial)
