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
	INVALID_PRODUCTION_COST:
		"El costo de produccion debe ser numerico y mayor a 0.",
}

export const materialMessages = {
	NOT_FOUND: "Material no encontrado.",
	INVALID_COST: "El costo debe ser numerico y mayor a 0.",
	INVALID_NAME: "El nombre solo puede contener letras y espacios.",
	INVALID_PROVIDER: "El proveedor solo puede contener letras y espacios.",
	DUPLICATE_MATERIAL: "Ya existe un material con ese nombre y proveedor.",
}

export const paymentMessages = {
	NOT_FOUND: "Pago no encontrado.",
	BADGET_NOT_FOUND: "Presupuesto no encontrado.",
	INVALID_AMOUNT: "El monto debe ser numerico y mayor a 0.",
	INVALID_METHOD: "El metodo solo puede contener letras y espacios.",
	INVALID_DATE: "La fecha debe ser una fecha valida.",
}

export const budgetMessages = {
	NOT_FOUND: "Presupuesto no encontrado.",
	CLIENT_NOT_FOUND: "Cliente no encontrado.",
	INVALID_DESCRIPTION:
		"La descripción solo puede contener letras, numeros y espacios",
	INVALID_ITEMS: "La lista de items es inválida.",
	INVALID_ITEMS_QUANTITY:
		"La cantidad de los items debe ser numerica y mayor a 0.",
	PRODUCT_NOT_FOUND: "Producto no encontrado.",
	DUPLICATE_ITEM: "Hay productos duplicados en los items del presupuesto.",
	INVALID_STATUS: "El estado del presupuesto no es valido.",
}
