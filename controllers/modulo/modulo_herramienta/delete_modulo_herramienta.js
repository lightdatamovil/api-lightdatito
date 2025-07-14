import { executeQuery } from '../../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function deleteModuloHerramienta(moduloId, herramientaId) {
    // 1) Verificar que la relación exista y esté activa
    const [existing] = await executeQuery(
        `SELECT id 
       FROM modulo_herramienta 
      WHERE modulo_id = ? 
        AND herramienta_id = ? 
        AND eliminado = 0`,
        [moduloId, herramientaId]
    );
    if (!existing) {
        throw new CustomException({
            title: 'Relación no encontrada',
            message: `No existe la herramienta id=${herramientaId} en el módulo id=${moduloId}`,
            status: 404
        });
    }

    // 2) Soft-delete
    await executeQuery(
        `UPDATE modulo_herramienta
        SET eliminado = 1,
            fecha_eliminado = NOW()
      WHERE id = ?`,
        [existing.id]
    );

    return { id: existing.id };
}
