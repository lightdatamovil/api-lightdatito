import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Retrieve all logisticas (logisticas) that are not deleted.
 * @returns {Array<Logistica>} List of Logistica instances.
 */
export async function getAllLogisticas() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM logisticas'
        );
        return rows.map(row => Logistica.fromJson(row));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener logísticas',
            message: err.message,
            stack: err.stack
        });
    }
}