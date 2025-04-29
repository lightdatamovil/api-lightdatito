import { executeQuery } from '../../db.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Delete an estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to delete.
 * @returns {{id: number|string}} The ID of the deleted estado.
 */
export async function deleteEstadoLogistica(id) {
    await executeQuery('DELETE FROM estados_logistica WHERE id = ?', [id]);
    return { id };
}
