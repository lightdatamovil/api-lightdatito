import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Retrieve a single logística by ID.
 * @param {number|string} id - The ID of the logística to fetch.
 * @returns {Object} The plain logística object.
 * @throws {CustomException} If not found or on query error.
 */
export async function getLogisticaById(req) {
  const { id } = req.params;
  try {
    const sql = `
        SELECT
        l.id,
        l.did,
        l.nombre,
        l.url_imagen,
        l.codigo,
        l.password_soporte,
        l.cuit,
        l.email,
        l.url_sistema,

        JSON_OBJECT(
          'id',     pl.id,
          'nombre', pl.nombre,
          'color',  pl.color
        ) AS plan_json,

        JSON_OBJECT(
          'id',     el.id,
          'nombre', el.nombre,
          'color',  el.color
        ) AS estado_json,

        JSON_OBJECT(
          'id',        p.id,
          'nombre',    p.nombre,
          'codigo_iso',p.codigo_iso
        ) AS pais_json,

        (
          SELECT CONCAT(
            '[',
            IFNULL(
              GROUP_CONCAT(
                JSON_QUOTE(hn.nombre_anterior)
                ORDER BY hn.fecha_cambio
                SEPARATOR ','
              ),
              ''
            ),
            ']'
          )
          FROM historial_nombres_logistica hn
          WHERE hn.logisticas_id = l.id
        ) AS historial_nombres_json
      FROM logisticas l
      LEFT JOIN planes            pl ON l.plan_id             = pl.id
      LEFT JOIN estados_logistica el ON l.estado_logistica_id  = el.id
      LEFT JOIN paises            p  ON l.pais_id             = p.id
      WHERE l.id = ?
      LIMIT 1
        `;

    const rows = await executeQuery(sql, [id]);

    if (rows.length === 0) {
      throw new CustomException({
        title: 'Logística no encontrada',
        message: `No existe una logística con id=${id}`,
        status: Status.notFound
      });
    }

    const row = rows[0];

    const plan = JSON.parse(row.plan_json);
    const estado = JSON.parse(row.estado_json);
    const pais = JSON.parse(row.pais_json);
    const historial_nombres = JSON.parse(row.historial_nombres_json);

    const logistica = {
      id: row.id,
      did: row.did,
      nombre: row.nombre,
      historial_nombres: historial_nombres,
      url_imagen: row.url_imagen,
      plan: plan,
      estado_logistica: estado,
      codigo: row.codigo,
      password_soporte: row.password_soporte,
      cuit: row.cuit,
      email: row.email,
      url_sistema: row.url_sistema,
      pais: pais
    };

    return logistica;
  } catch (err) {
    if (err instanceof CustomException) {
      throw err;
    }
    throw new CustomException({
      title: 'Error al obtener logística',
      message: err.message,
      stack: err.stack
    });
  }
}
