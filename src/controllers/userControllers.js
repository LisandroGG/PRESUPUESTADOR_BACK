import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { comparePassword } from "../helpers/password.js"

dotenv.config()

const { ADMIN_USER, ADMIN_PASSWORD, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } =
	process.env

const isProduction = process.env.API_STATUS === "production"

export const loginUser = async (req, res) => {
	try {
		const { user, password } = req.body
		if (user !== ADMIN_USER) {
			return res.status(401).json({ message: "Credenciales Incorrectas" })
		}

		const isPasswordValid = await comparePassword(password, ADMIN_PASSWORD)
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Credenciales Incorrectas" })
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

		return res.status(200).json({
			message: "Sesion iniciada!",
			user: ADMIN_USER,
		})
	} catch (error) {
		req.log.error("Error en loginUser:", error)
		return res
			.status(500)
			.json({ message: "Error al iniciar sesion, intente nuevamente" })
	}
}

export const refreshAccessToken = (req, res) => {
	const refreshToken = req.cookies.refreshToken

	if (!refreshToken) {
		return res
			.status(401)
			.json({ message: "No se proporciono el token de actualizacion" })
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

		return res
			.status(200)
			.json({ message: "Token de acceso actualizado", user: decoded.user })
	} catch (error) {
		return res
			.status(403)
			.json({ message: "Token de actualizacion invalido o expirado" })
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
		res
			.status(500)
			.json({ message: "Error al cerrar sesion, intente nuevamente" })
	}
}

export const getSession = (req, res) => {
	try {
		const token = req.cookies.token

		if (!token) {
			return res.status(401).json({ message: "No autenticado" })
		}

		const decoded = jwt.verify(token, JWT_SECRET_KEY)

		return res.status(200).json({
			message: "Sesión válida",
			user: decoded.user,
		})
	} catch (error) {
		req.log.error("Error en getSession:", error)
		return res.status(401).json({ message: "No autenticado" })
	}
}
