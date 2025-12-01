import { Budget } from "../models/budgets.js";

export const validateBadgetExists = async (id) => {
    if (!id) return false

    const badget = await Budget.findByPk(id)
    return !!badget
}