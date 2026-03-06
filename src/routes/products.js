import { Router } from "express"
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getAllProductsForSelect,
	getProductById,
	updateProduct,
} from "../controllers/productControllers.js"
import { validateProduct } from "../middlewares/validateProduct.js"

export const productsRouter = Router()

productsRouter.get("/", getAllProducts)
productsRouter.get("/select", getAllProductsForSelect)
productsRouter.post("/", validateProduct, createProduct)
productsRouter.put("/:id", validateProduct, updateProduct)
productsRouter.get("/detail/:id", getProductById)
productsRouter.delete("/:id", deleteProduct)
