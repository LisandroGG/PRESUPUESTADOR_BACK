import fs from "node:fs"
import path from "node:path"

let cachedLogo = null

export function getLogoBase64() {
	if (cachedLogo) return cachedLogo

	const filePath = path.resolve("src/assets/vacariLogo.jpeg")
	const file = fs.readFileSync(filePath)
	cachedLogo = `data:image/jpeg;base64,${file.toString("base64")}`

	return cachedLogo
}
