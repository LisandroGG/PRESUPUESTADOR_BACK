export const getPagination = (query, fixedLimit = 9) => {
	const page = Number(query.page) > 0 ? Number(query.page) : 1
	const limit = fixedLimit
	const offset = (page - 1) * limit

	return { page, limit, offset }
}

export const buildPagedResponse = (rows, total, page, limit) => {
	return {
		data: rows,
		page,
		limit,
		total,
		totalPages: Math.ceil(total / limit),
		hasNext: page * limit < total,
		hasPrev: page > 1,
	}
}
