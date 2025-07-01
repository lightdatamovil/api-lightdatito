


// src/funciones/hash.js
import crypto from 'crypto';

/**
 * Hashea cualquier texto usando SHA-256 y devuelve el hash en hexadecimal.
 * @param {string} text — la cadena de entrada
 * @returns {string} — el hash SHA-256 en hex
 */
export function hash256(text) {
  return crypto
    .createHash('sha256')
    .update(text, 'utf8')
    .digest('hex');
}
