// src/funciones/verifyParameters.js

/**
 * Verifica que existan parámetros URL y campos en el body.
 * @param {import('express').Request} req
 * @param {string[]} requiredParams – Lista de keys que deben estar en req.params
 * @param {string[]} requiredBodyFields – Lista de keys que deben estar en req.body
 * @returns {string[]} – Array con los nombres de parámetros faltantes
 */
export function verifyAll(req, requiredParams = [], requiredBodyFields = []) {
    const missing = [];

    // Parámetros en la URL
    requiredParams.forEach((param) => {
        if (!req.params || !(param in req.params)) {
            missing.push(param);
        }
    });

    // Campos en el body
    requiredBodyFields.forEach((field) => {
        if (!req.body || !(field in req.body)) {
            missing.push(field);
        }
    });

    return missing;
}
