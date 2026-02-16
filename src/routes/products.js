import { Router } from "express"
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getAllProductsForSelect,
	getProductById,
	searchProducts,
	updateProduct,
} from "../controllers/productControllers.js"
import { authUser } from "../middlewares/authUser.js"
import { validateProduct } from "../middlewares/validateProduct.js"

export const productsRouter = Router()

productsRouter.get("/", authUser, getAllProducts)
productsRouter.get("/select", authUser, getAllProductsForSelect)
productsRouter.post("/", authUser, validateProduct, createProduct)
productsRouter.put("/:id", authUser, validateProduct, updateProduct)
productsRouter.get("/detail/:id", authUser, getProductById)
productsRouter.delete("/:id", authUser, deleteProduct)
productsRouter.get("/search", authUser, searchProducts)
