// controllers/tipo_particularidad/create_tipo_particularidad.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Crea un nuevo tipo de particularidad y devuelve el registro insertado.
 * @param {{ nombre: string, descripcion?: string }} data
 */
export async function createTipoParticularidad({ nombre, descripcion }) {
    try {
        // Evitar duplicados por nombre
        const [{ count }] = await executeQuery(
            'SELECT COUNT(*) AS count FROM tipo_particularidad WHERE LOWER(nombre) = LOWER(?) AND eliminado = 0',
            [nombre], true, 0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Tipo de particularidad duplicada',
                message: `Ya existe un tipo de particularidad con nombre '${nombre}'`,
                status: Status.conflict
            });
        }

        // Inserción
        const result = await executeQuery(
            'INSERT INTO tipo_particularidad (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion || null], true
        );

        // Devolver recién creado
        const [row] = await executeQuery(
            'SELECT * FROM tipo_particularidad WHERE id = ? AND eliminado = 0 limit 1',
            [result.insertId], true, 0
        );
        return row;
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error creando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
