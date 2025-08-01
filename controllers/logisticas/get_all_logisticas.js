import { executeQuery } from '../../db.js';

export async function getAllLogisticas() {
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
    `;

  const rows = await executeQuery(sql);

  return rows.map(row => {
    const plan = JSON.parse(row.plan_json);
    const estado = JSON.parse(row.estado_json);
    const pais = JSON.parse(row.pais_json);
    const historial_nombres = JSON.parse(row.historial_nombres_json);

    return {
      id: row.id,
      did: row.did,
      nombre: row.nombre,
      historial_nombres: historial_nombres,
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
}
