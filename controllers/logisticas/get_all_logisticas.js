import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

/**
 * Retrieve all logística records that are not deleted.
 * @returns {Array<Object>} List of plain logística objects.
 * @throws {CustomException} On query error.
 */
export async function getAllLogisticas() {
    try {
        const sql = `
      SELECT
        l.id,
        l.did,
        l.nombre,
        l.url_imagen,

        -- Objeto PLAN
        JSON_OBJECT(
          'id',     pl.id,
          'nombre', pl.nombre,
          'color',  pl.color
        ) AS plan_json,

        -- Objeto ESTADO
        JSON_OBJECT(
          'id',     el.id,
          'nombre', el.nombre,
          'color',  el.color
        ) AS estado_json,

        l.codigo,
        l.password_soporte,
        l.cuit,
        l.email,
        l.url_sistema,

        -- Objeto PAÍS
        JSON_OBJECT(
          'id',        p.id,
          'nombre',    p.nombre,
          'codigo_iso',p.codigo_iso
        ) AS pais_json
      FROM logisticas l
      LEFT JOIN planes            pl ON l.plan_id             = pl.id
      LEFT JOIN estados_logistica el ON l.estado_logistica_id  = el.id
      LEFT JOIN paises            p  ON l.pais_id             = p.id;
    `;

        const rows = await executeQuery(sql);

        // Map y parseo de cada row
        return rows.map(row => {
            const plan = typeof row.plan_json === 'string'
                ? JSON.parse(row.plan_json)
                : row.plan_json;
            const estado = typeof row.estado_json === 'string'
                ? JSON.parse(row.estado_json)
                : row.estado_json;
            const pais = typeof row.pais_json === 'string'
                ? JSON.parse(row.pais_json)
                : row.pais_json;

            return {
                id: row.id,
                did: row.did,
                nombre: row.nombre,
                url_imagen: row.url_imagen,
                plan_id: plan,
                estado_logistica_id: estado,
                codigo: row.codigo,
                password_soporte: row.password_soporte,
                cuit: row.cuit,
                email: row.email,
                url_sistema: row.url_sistema,
                pais: pais
            };
        });
    } catch (err) {
        throw new CustomException({
            title: 'Error al obtener logísticas',
            message: err.message,
            stack: err.stack
        });
    }
}
