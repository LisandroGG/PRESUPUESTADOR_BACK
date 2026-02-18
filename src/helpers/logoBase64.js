import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let cachedLogo = null

export function getLogoBase64() {
	if (cachedLogo) return cachedLogo

	try {
		const filePath = path.join(__dirname, "../assets/vacariLogo.jpeg")
		const file = fs.readFileSync(filePath)

		cachedLogo = `data:image/jpeg;base64,${file.toString("base64")}`
		return cachedLogo
	} catch (err) {
		console.error("Error cargando logo:", err.message)
		return ""
	}
}
