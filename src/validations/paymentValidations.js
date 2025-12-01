export const validatePaymentMethod = (method) => {
    if(!method) return false

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
	return regex.test(method.trim())
}

export const validatePaymentAmount = (amount) => {
    if (amount === null || amount === undefined) return false

    const value = parseFloat(amount)

	return !Number.isNaN(value) && value > 0
}

export const validatePaymentDate = (date) => {
    if (!date) return false;

    // Validar formato exacto YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;

    // Validar que sea una fecha real (ej: no 2025-02-30)
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return false;

    // Validar que no cambie el día al parsear (evita 2025-02-31)
    const [year, month, day] = date.split("-").map(Number);
    if (
        parsed.getUTCFullYear() !== year ||
        parsed.getUTCMonth() + 1 !== month ||
        parsed.getUTCDate() !== day
    ) {
        return false;
    }

    return true;
}
