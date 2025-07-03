import CustomException from "../../models/custom_exception.js";
import { logRed } from "./logsCustom.js";
import { verifyAll } from "./verifyParameters.js";

export function verificarTodo(req, res, requiredParams = [], requiredBodyFields = []) {
    // 1) Verifico id
    const missingParams = verifyAll(req, requiredParams, requiredBodyFields);
    if (missingParams.length) {
        const ex = new CustomException({
            title: 'Faltan campos',
            message: `Faltan campos: ${missingParams.join(', ')}`
        });
        logRed(`Error 400 ${req.method} ${req.originalUrl}: ${ex.toJsonString()}`);
        res.status(400).json(ex.toJsonString());
        return false;
    }

    // 2) Verifico body no vacío
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
            const ex = new CustomException({
                title: 'Faltan datos',
                message: 'El cuerpo de la petición está vacío'
            });
            logRed(`Error 400 ${req.method} ${req.originalUrl}: ${ex.toJsonString()}`);
            res.status(400).json(ex.toJsonString());
            return false;
        }
    }

    return true;
}
