import { sendError } from "../helpers/response.js";
import { materialMessages } from "../helpers/messages.js";
import { 
    validateMaterialCost, 
    validateMaterialName, 
    validateMaterialProvider 
} from "../validations/materialValidations.js";

export const validateMaterial = (req, res, next) => {
    const { name, provider, cost } = req.body;

    const isCreate = req.method === "POST";

    // NAME
    if (isCreate || name !== undefined) {
        if (!validateMaterialName(name)) {
            return sendError(res, materialMessages.INVALID_NAME, 400);
        }
    }

    // PROVIDER
    if (isCreate || provider !== undefined) {
        if (!validateMaterialProvider(provider)) {
            return sendError(res, materialMessages.INVALID_PROVIDER, 400);
        }
    }

    // COST
    if (isCreate || cost !== undefined) {
        if (!validateMaterialCost(cost)) {
            return sendError(res, materialMessages.INVALID_COST, 400);
        }
    }

    next();
};