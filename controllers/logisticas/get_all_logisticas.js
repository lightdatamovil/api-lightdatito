import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Retrieve all logisticas (logisticas) that are not deleted.
 * @returns {Array<Logistica>} List of Logistica instances.
 */
export async function getAllLogisticas() {
    try {
        const query = 'SELECT * FROM logisticas WHERE eliminado = 0';
        const rows = await executeQuery(query);
        return rows.map(row => Logistica.fromJson(row));
    } catch (error) {
        throw new CustomException(
            'Error retrieving logisticas',
            error.message,
            error.stack
        );
    }
}