import { paymentMessages } from "../helpers/messages.js";
import { sendError } from "../helpers/response.js";
import { 
    validatePaymentMethod,
    validatePaymentAmount,
    validatePaymentDate
} from "../validations/paymentValidations.js";
import { validateBadgetExists } from "../validations/budgetValidations.js";

export const validatePayment = async(req, res, next) => {
    const { method, amount, date, badgetId } = req.body;

    const isCreate = req.method === "POST";

    // METHOD
    if (isCreate || method !== undefined) {
        if (!validatePaymentMethod(method)) {
            return sendError(res, paymentMessages.INVALID_METHOD, 400);
        }
    }

    // AMOUNT
    if (isCreate || amount !== undefined) {
        if (!validatePaymentAmount(amount)) {
            return sendError(res, paymentMessages.INVALID_AMOUNT, 400);
        }
    }

    if (isCreate || date !== undefined) {
        if (!validatePaymentDate(date)) {
            return sendError(res, paymentMessages.INVALID_DATE, 400);
        }
    }

    // BADGET ID

    if (isCreate || badgetId !== undefined) {
        const badgetExists = await validateBadgetExists(badgetId);
        if (!badgetExists) {
            return sendError(res, paymentMessages.BADGET_NOT_FOUND, 404);
        }
    }

    next();
}