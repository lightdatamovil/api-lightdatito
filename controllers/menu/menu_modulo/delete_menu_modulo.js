import executeQuery from '../../../src/db/executeQuery.js';
import CustomException from '../../../models/custom_exception.js';

export async function deleteMenuModulo(menuId, moduloId) {
    // 1) Verificar existencia y vínculo
    const [existing] = await executeQuery(
        `SELECT id
       FROM modulos
      WHERE id = ? 
        AND menu_id = ?
        AND eliminado = 0`,
        [moduloId, menuId]
    );
    if (!existing) {
        throw new CustomException({
            title: 'Módulo no encontrado',
            message: `No existe un módulo con id=${moduloId} para el menú id=${menuId}`,
            status: 404
        });
    }

    // 2) Soft-delete
    await executeQuery(
        `UPDATE modulos
        SET eliminado = 1,
            fecha_eliminado = NOW()
      WHERE id = ?`,
        [moduloId]
    );

    return { id: moduloId };
}
