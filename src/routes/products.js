import { Router } from "express"
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	searchProducts,
	updateProduct,
} from "../controllers/productControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validateProduct } from "../middlewares/validateProduct.js"

export const productsRouter = Router()

productsRouter.get("/", authUser, getAllProducts)
productsRouter.post("/", authUser, validateProduct, createProduct)
productsRouter.put("/:id", authUser, validateProduct, updateProduct)
productsRouter.delete("/:id", authUser, deleteProduct)
productsRouter.get("/search", authUser, searchProducts)
