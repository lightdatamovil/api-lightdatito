import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function createObservacionLogistica(nombre) {
    try {
        const query = `INSERT INTO observaciones_logistica (nombre) VALUES (?) RETURNING *`;
        const rows = await executeQuery(query, [nombre]);
        return ObservacionLogistica.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating observacion_logistica',
            error.message,
            error.stack
        );
    }
}