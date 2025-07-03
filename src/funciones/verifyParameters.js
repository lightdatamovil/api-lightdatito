// src/funciones/verifyParameters.js

import { logCyan, logRed } from './logsCustom.js';

/**
 * Verifica que existan parámetros URL y campos en el body.
 * @param {import('express').Request} req
 * @param {string[]} requiredParams – Lista de keys que deben estar en req.params
 * @param {string[]} requiredBodyFields – Lista de keys que deben estar en req.body
 * @returns {string[]} – Array con los nombres de parámetros faltantes
 */
export function verifyAll(req, requiredParams = [], requiredBodyFields = []) {
    if (req.body == {}) {
        logRed(`Body vacio`);
    }
    const missing = [];
    logCyan(`${requiredParams}`);
    requiredParams.forEach(param => {
        if (!req.params || req.params[param] === undefined) {
            logCyan('1');
            missing.push(param);
        }
    });

    requiredBodyFields.forEach(field => {
        if (!req.body || req.body[field] === undefined) {
            logCyan('2');
            missing.push(field);
        }

    });
    if (missing.length) {
        logRed(`Faltan los siguientes parámetros: ${missing.join(', ')}`);
    }

    return missing;
}
