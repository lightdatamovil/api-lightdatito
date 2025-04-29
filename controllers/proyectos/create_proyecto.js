import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function createProyecto(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createProyecto');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO proyectos (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return Proyecto.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating proyecto',
            error.message,
            error.stack
        );
    }
}