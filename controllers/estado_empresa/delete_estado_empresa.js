import { executeQuery } from '../../db.js';
import EstadoEmpresa from '../../models/estado_empresa.js';

/**
 * Delete an estado_empresa by ID.
 * @param {number|string} id - The ID of the estado to delete.
 * @returns {{id: number|string}} The ID of the deleted estado.
 */
export async function deleteEstadoEmpresa(id) {
    await executeQuery('DELETE FROM estados_logistica WHERE id = ?', [id]);
    return { id };
}
