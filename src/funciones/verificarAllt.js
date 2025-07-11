import CustomException from "../../models/custom_exception.js";
import { logRed } from "./logsCustom.js";

export function verificarTodo(req, res, requiredParams = [], requiredBodyFields = []) {
    const camposQueFaltan = [];

    requiredParams.forEach(param => {
        if (!req.params || req.params[param] === undefined) {
            camposQueFaltan.push(param);
        }
    });

    requiredBodyFields.forEach(field => {
        if (!req.body || req.body[field] === undefined) {
            camposQueFaltan.push(field);
        }
    });

    if (req.method == 'POST') {
        if (camposQueFaltan.length > 0) {
            const ex = new CustomException({
                title: 'Faltan campos',
                message: `Faltan campos: ${camposQueFaltan.join(', ')}`
            });
            logRed(`Error 400 ${req.method} ${req.originalUrl}: ${ex.toJsonString()}`);
            res.status(400).json(ex.toJsonString());
            return false;
        }
    }

    const camposDesconocidos = Object.keys(req.body).filter(
        field => !requiredBodyFields.includes(field)
    );

    if (camposDesconocidos.length > 0) {
        const ex = new CustomException({
            title: 'Campos inválidos',
            message: `No se permiten estos campos: ${camposDesconocidos.join(', ')}`
        });
        res.status(400).json(ex.toJSON());
        return false;
    }

    return true;
}
