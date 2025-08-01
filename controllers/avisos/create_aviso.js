import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";

export async function createAviso(req) {
    const { titulo, descripcion, fecha, usuarioId } = req.body;

    // 1) Verificar que el usuario exista y no esté eliminado
    const userCheck = await executeQuery(`SELECT 1 FROM usuarios WHERE id = ? AND eliminado = 0 LIMIT 1`,
        [usuarioId],
    );
    if (!userCheck || userCheck.length === 0) {
        throw new CustomException({
            title: 'Usuario no encontrado',
            message: `No existe un usuario activo con id: ${usuarioId}`,
            status: Status.notFound
        });
    }


    // 3) Insertar el Aviso
    const result = await executeQuery(`INSERT INTO Avisos (fecha, titulo, descripcion, fecha_creacion, usuario_id) VALUES (?, ?, ?, NOW(), ?)`, [fecha, titulo, descripcion, usuarioId]);
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear Aviso',
            message: 'No se obtuvo el ID del Aviso insertado',
            status: Status.internalServerError
        });
    }

    return newId;

}
