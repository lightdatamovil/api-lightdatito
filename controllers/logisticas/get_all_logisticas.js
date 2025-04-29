import { executeQuery } from '../../db.js';
import Logistica from '../../models/logistica.js';

/**
 * Retrieve all logisticas (logisticas) that are not deleted.
 * @returns {Array<Logistica>} List of Logistica instances.
 */
export async function getAllLogisticas() {
    const query = 'SELECT * FROM logisticas WHERE eliminado = 0';
    const rows = await executeQuery(query);
    return rows.map(row => Logistica.fromJson(row));
}