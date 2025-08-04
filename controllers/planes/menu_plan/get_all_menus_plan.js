import { executeQuery } from '../../../db.js';
import CustomException from "../../../models/custom_exception.js";
import { Status } from "../../../models/status.js";


export async function getAllMenuPlanes() {
  const rows = await executeQuery(
    `SELECT 
           mp.id AS menu_plan_id,
           me.id AS menu_id,
           me.nombre AS menu_nombre,
           pl.id AS plan_id,
           pl.nombre AS plan_nombre
         FROM menu_plan mp
         JOIN menus me ON mp.menu_id = me.id AND me.eliminado = 0
         JOIN planes pl ON mp.plan_id = pl.id AND pl.eliminado = 0
         WHERE mp.eliminado = 0`,
    [],
    true
  );

  if (!rows || rows.length === 0) {
    throw new CustomException({
      title: 'Sin asociaciones menú–plan',
      message: 'No se encontraron relaciones entre menús y planes',
      status: Status.noContent
    });
  }

  return rows;
}
