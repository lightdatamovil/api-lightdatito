import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Update an existing logistica by ID.
 * @param {number|string} id - The ID of the logistica to update.
 * @param {Object} data - Fields and values to update.
 * @returns {Logistica|null} The updated Logistica instance, or null if not found.
 */
// export async function updateLogistica({array}) {
//     try {
//         for 
//         const fields = Object.keys(data);
//         const values = Object.values(data);
//         if (fields.length === 0) {
//             throw new CustomException('No data provided for updateLogistica');
//         }
//         const setClause = fields.map(field => `${field} = ?`).join(', ');
//         const query = `UPDATE logisticas SET ${setClause} WHERE id = ?`;
//         await executeQuery(query, [...values, id]);
//         return getLogisticaById(id);
//     } catch (error) {
//         throw new CustomException(
//             'Error updating logistica',
//             error.message,
//             error.stack
//         );
//     }
// }

export async function updateLogistica(id, data) {
    try {
        // 1) Filtrar y validar campos a actualizar (ignoramos si viene data.id)
        const fields = Object.keys(data).filter(key => key !== 'id');
        if (!fields.length) {
            throw new CustomException('No hay parámetros para modificar logistica');
        }

        // 2) Construir SET clause y array de valores
        const setClause = fields.map(key => `${key} = ?`).join(', ');
        const values = fields.map(key => data[key]);

        // 3) Ejecutar UPDATE
        const sql = `UPDATE logisticas SET ${setClause} WHERE id = ?`;
        await executeQuery(sql, [...values, id], true);

        // 4) Devolver el registro actualizado
        const [row] = await executeQuery(
            'SELECT * FROM logisticas WHERE id = ?',
            [id],
            true
        );
        return row;

    } catch (err) {
        throw new CustomException(
            'Error en updateLogistica',
            err.message,
            err.stack
        );
    }
}
