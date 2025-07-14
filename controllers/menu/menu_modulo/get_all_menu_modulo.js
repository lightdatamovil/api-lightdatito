import { executeQuery } from '../../../db.js';

export async function getAllMenuModulo() {
    // Devuelve todos los módulos activos (no eliminados)
    return await executeQuery(
        `SELECT id, nombre, menu_id, fecha_creacion
       FROM modulos
      WHERE eliminado = 0`
    );
}