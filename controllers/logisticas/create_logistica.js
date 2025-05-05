import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Create a new logistica (logistica) and return the full inserted record.
 * Uses RETURNING * to fetch the inserted row in one statement.
 * @param {Object} data - Fields and values for the new logistica.
 * @returns {Logistica} The created Logistica instance.
 */

export async function createLogistica(
    did,
    nombre,
    url_imagen,
    plan_id,
    estado_logistica_id,
    codigo,
    contrasena_soporte,
    cuit,
    email,
    url_sistema,
    pais_id
) {
    try {
        // 1) Validar claves foráneas
        const [plan] = await executeQuery(
            'SELECT id FROM plan WHERE id = ?',
            [plan_id]
        );
        if (!plan) {
            throw new CustomException({
                title: 'Plan inválido',
                message: `No existe un plan con id=${plan_id}`
            });
        }

        const [estado] = await executeQuery(
            'SELECT id FROM estados_logistica WHERE id = ?',
            [estado_logistica_id]
        );
        if (!estado) {
            throw new CustomException({
                title: 'EstadoLogistica inválido',
                message: `No existe un estado_logistica con id=${estado_logistica_id}`
            });
        }

        const [pais] = await executeQuery(
            'SELECT id FROM paises WHERE id = ?',
            [pais_id]
        );
        if (!pais) {
            throw new CustomException({
                title: 'País inválido',
                message: `No existe un país con id=${pais_id}`
            });
        }

        // 2) Insertar en logisticas
        const result = await executeQuery(
            `INSERT INTO logisticas
           (did, nombre, url_imagen, plan_id, estado_logistica_id,
            codigo, contraseña_soporte, cuit, email, url_sistema, pais_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                did,
                nombre,
                url_imagen,
                plan_id,
                estado_logistica_id,
                codigo,
                contrasena_soporte,
                cuit,
                email,
                url_sistema,
                pais_id
            ]
        );

        // 3) Obtener el ID generado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear logística',
                message: 'No se obtuvo el ID del registro insertado'
            });
        }

        // 4) Recuperar y devolver el registro completo
        const [row] = await executeQuery(
            'SELECT * FROM logisticas WHERE id = ?',
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear logística',
                message: `No se pudo recuperar la logística con id=${newId}`
            });
        }

        return Logistica.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear logística',
            message: err.message,
            stack: err.stack
        });
    }
}