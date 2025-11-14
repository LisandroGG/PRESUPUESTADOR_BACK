import { Router } from "express"
import {
	loginUser,
	logoutUser,
	refreshAccessToken,
} from "../controllers/userControllers.js"

export const usersRouter = Router()

usersRouter.post("/login", loginUser)
usersRouter.post("/refresh-token", refreshAccessToken)
usersRouter.post("/logout", logoutUser)
