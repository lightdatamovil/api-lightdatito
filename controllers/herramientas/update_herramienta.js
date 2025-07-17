import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function updateHerramienta(req) {
    const id = req.params.id;
    const { nombre, modulo_principal } = req.body;
    const query = `UPDATE herramientas SET nombre = ?, modulo_principal = ? WHERE id = ? AND eliminado = 0`;
    const result = await executeQuery(query, [nombre, modulo_principal, id]);

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Herramienta no encontrada',
            message: `No existe una herramienta activa con id: ${id}`,
            status: Status.notFound
        });
    }
}

