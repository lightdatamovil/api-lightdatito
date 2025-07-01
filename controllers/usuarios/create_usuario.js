import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Usuario from '../../models/usuario.js';
import { hash256 } from '../../src/funciones/hash.js';


/**
 * Create a new usuario and return the full inserted record.
 * @param {Object} data - nombre, url_imagen, tipo_usuario_id, email, etc.
 * @returns {Usuario}
 */
export async function createUsuario(nombre,email,password,urlImagen,tipoUsuarioId) {
    try {
        const [{ count }] = await executeQuery(
                `SELECT COUNT(*) AS count FROM usuarios WHERE nombre = ? OR email = ?`, [nombre, email],
                true, 0
            );
            if (count > 0) {
                throw new CustomException({
                title:   'usuario duplicado',
                message: `Ya existe un usuario con nombre"${nombre}" o email "${email}"`,
                status:  400
            });
            }
        
        const contra_hash = hash256(password);
        const query = `INSERT INTO usuarios (nombre, email, password, url_imagen, tipo_usuario_id) VALUES (?,?,?,?,?)`;
        const result = await executeQuery(query, [nombre,email,contra_hash,urlImagen,tipoUsuarioId],true);
        //select de la fila recien creada
        const idNuevo = result.insertId;
        const rows = await executeQuery(
            `SELECT * FROM usuarios WHERE id = ?`,
            [idNuevo],
            true,
            0
            ); 
            
            if (!rows.length) {
                throw new Error(`No se encontró usuario con id ${idNuevo}`);
            }

        return Usuario.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException({
           title: 'Error creating usuario',
        message:   error.message,
          stack:  error.stack
        }
        );
    }
}