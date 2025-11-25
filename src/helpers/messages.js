export const userMessages = {
	INVALID_CREDENTIALS: "Credenciales incorrectas",
	INVALID_TOKEN: "Token inválido o expirado.",
	NOT_FOUND_TOKEN: "Token no encontrado. Acceso denegado.",
	NOT_AUTH: "No autenticado.",
}

export const clientMessages = {
	NOT_FOUND: "Cliente no encontrado.",
	REQUIRED_FIELD: "Debes ingresar almenos un dato",
	INVALID_CUIT: "El CUIT debe tener 11 digitos",
	INVALID_NAME: "El nombre solo puede contener letras y espacios.",
}

export const productMessages = {
	NOT_FOUND: "Producto no encontrado.",
	INVALID_NAME: "El nombre solo puede contener letras y espacios.",
	INVALID_DESCRIPTION:
		"La descripción solo puede contener letras, numeros y espacios",
	INVALID_MATERIALS: "La lista de materiales es inválida",
	INVALID_MATERIAL_QUANTITY: "El material debe incluir su cantidad",
	DUPLICATE_PRODUCT: "Ya existe un producto con ese nombre",
}

export const materialMessages = {
	NOT_FOUND: "Material no encontrado.",
	INVALID_COST: "El costo debe ser numerico y mayor a 0.",
	INVALID_NAME: "El nombre solo puede contener letras y espacios.",
	INVALID_PROVIDER: "El proveedor solo puede contener letras y espacios.",
	DUPLICATE_MATERIAL: "Ya existe un material con ese nombre y proveedor.",
}
