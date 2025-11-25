import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { userMessages } from "../helpers/messages.js"
import { comparePassword } from "../helpers/password.js"
import { sendError } from "../helpers/response.js"

dotenv.config()

const { ADMIN_USER, ADMIN_PASSWORD, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } =
	process.env

const isProduction = process.env.API_STATUS === "production"

export const loginUser = async (req, res) => {
	try {
		const { user, password } = req.body
		if (user !== ADMIN_USER) {
			return sendError(res, userMessages.INVALID_CREDENTIALS, 401)
		}

		const isPasswordValid = await comparePassword(password, ADMIN_PASSWORD)
		if (!isPasswordValid) {
			return sendError(res, userMessages.INVALID_CREDENTIALS, 401)
		}

		const payload = {
			user: ADMIN_USER,
		}

		const accessToken = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "2h" })

		const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
			expiresIn: "30d",
		})

		res.cookie("token", accessToken, {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
			maxAge: 2 * 60 * 60 * 1000,
		})

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		})

		res.status(200).json({
			message: "Sesion iniciada!",
			user: ADMIN_USER,
		})
	} catch (error) {
		req.log.error("Error en loginUser:", error)
		return sendError(res, "Error al iniciar sesion, intente nuevamente", 500)
	}
}

export const refreshAccessToken = (req, res) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return sendError(res, userMessages.NOT_FOUND_TOKEN, 401)
	}

	try {
		const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY)

		const newAccessToken = jwt.sign({ user: decoded.user }, JWT_SECRET_KEY, {
			expiresIn: "2h",
		})

		res.cookie("token", newAccessToken, {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
			maxAge: 2 * 60 * 60 * 1000,
		})

		res.status(200).json({
			message: "Token de acceso actualizado",
			user: decoded.user,
		})
	} catch (error) {
		return sendError(res, userMessages.INVALID_TOKEN, 401)
	}
}

export const logoutUser = (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
		})
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "none" : "lax",
		})
		res.status(200).json({ message: "Sesion cerrada correctamente!" })
	} catch (error) {
		req.log.error("Error en logoutUser:", error)
		return sendError(res, "Error al cerrar sesion, intenta nuevamente", 500)
	}
}

export const getSession = (req, res) => {
	try {
		const token = req.cookies.token

		if (!token) {
			return sendError(res, userMessages.NOT_AUTH, 401)
		}

		const decoded = jwt.verify(token, JWT_SECRET_KEY)

		res.status(200).json({
			message: "Sesión válida",
			user: decoded.user,
		})
	} catch (error) {
		req.log.error("Error en getSession:", error)
		return sendError(res, userMessages.NOT_AUTH, 401)
	}
}
