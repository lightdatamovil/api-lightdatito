import CustomException from '../../models/custom_exception.js';
import { logCyan, logRed } from './logsCustom.js';


/**
 * Envía la respuesta de error apropiada y loguea, según el tipo de excepción.
 * @param {Request}  req  – para saber método y URL
 * @param {Response} res  – para enviar la respuesta
 * @param {Error}    err  – la excepción capturada
 */
export function handleError(req, res, err) {
    logCyan(`Error en POST /api/uasdasdassuarios: ${err.message}`);
    if (err instanceof CustomException) {
        // 400 Bad Request para nuestras CustomException
        logRed(`Error ${err.status} ${req.method} ${req.originalUrl}:${err.toJsonString()}`);
        return res.status(err.status).json(err.toJSON());
    }
    // 500 Internal Server Error para TODO lo demás
    const fatal = new CustomException({
        title: 'Internal Server Error',
        message: err.message,
        stack: err.stack,
        status: 500
    });
    logRed(`Error ${fatal.status} ${req.method} ${req.originalUrl}:${fatal.toJsonString()}`);
    return res.status(fatal.status).json(fatal.toJSON());
}