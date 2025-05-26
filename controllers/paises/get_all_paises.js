import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Pais from '../../models/pais.js';

export async function getAllPaises() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM paises'
        );
        return rows.map(r => Pais.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener paises',
            message: err.message,
            stack: err.stack
        });
    }
}
