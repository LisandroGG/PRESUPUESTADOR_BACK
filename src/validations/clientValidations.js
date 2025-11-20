export const validateCuit = (cuit) => {
	if (!cuit) return true

	const regex = /^\d{11}$/
	return regex.test(cuit)
}

export const validateClientName = (name) => {
    if (!name) return true;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(name.trim());
};
