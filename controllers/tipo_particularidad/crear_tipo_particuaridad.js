// controllers/tipo_particularidad/create_tipo_particularidad.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Crea un nuevo tipo de particularidad y devuelve el registro insertado.
 * @param {{ nombre: string, descripcion?: string }} data
 */
export async function createTipoParticularidad({ body }) {
    const { nombre, descripcion } = body;
    try {
        // Evitar duplicados por nombre
        const [{ verify }] = await executeQuery(
            'SELECT id FROM tipo_particularidad WHERE LOWER(nombre) = LOWER(?) AND eliminado = 0 LIMIT 1',
            [nombre],
        );
        if (verify) {
            throw new CustomException({
                title: 'Tipo de particularidad duplicada',
                message: `Ya existe un tipo de particularidad con nombre '${nombre}'`,
                status: Status.conflict
            });
        }

        const result = await executeQuery(
            'INSERT INTO tipo_particularidad (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Error al crear tipo_particularidad',
                message: `No se pudo crear el tipo de particularidad con nombre '${nombre}'`,
                status: Status.internalServerError
            });
        }
        return { id: result.insertId };


    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error creando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
