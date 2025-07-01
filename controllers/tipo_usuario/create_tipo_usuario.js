// services/tipoUsuarioService.js
import { executeQuery } from '../../db.js';
import CustomException      from '../../models/custom_exception.js';
import TipoUsuario         from '../../models/tipo_usuario.js';

export async function createTipoUsuario(nombre) {
  try {

    //verificar s ya existe usuario
    const [{ count }] = await executeQuery(
        `SELECT COUNT(*) AS count FROM tipo_usuario WHERE nombre = ?`,
        [nombre].trim().toLowerCase(),
        true, 0
    );
    if (count > 0) {
        throw new CustomException({
        title:   'Tipo de usuario duplicado',
        message: `Ya existe un tipo_usuario con nombre "${nombre}"`,
        status:  400
    });
    }
    // 1) Inserto y cojo insertId:
    const result = await executeQuery(
      `INSERT INTO tipo_usuario (nombre) VALUES (?)`,
      [nombre],
      true,      // logs
      0          // pool por defecto

    );
    // 'result' es un OkPacket: { affectedRows, insertId, warningStatus, ... }
    const idNuevo = result.insertId;

    // 2) Traigo la fila recién creada:
    const rows = await executeQuery(
      `SELECT * FROM tipo_usuario WHERE id = ?`,
      [idNuevo],
      true,
      0
    );
    if (!rows.length) {
      throw new Error(`No se encontró tipo_usuario con id ${idNuevo}`);
    }

    // 3) Convierto y devuelvo
    return TipoUsuario.fromJson(rows[0]);
  } catch (error) {
    throw new CustomException({
        title: 'Error creating tipo_usuario',
        message:  error.message,
        stack:  error.stack
    });
  }
}
