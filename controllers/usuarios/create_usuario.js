import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import Usuario from '../../models/usuario.js';
import { hash256 } from '../../src/funciones/hash.js';


/**
 * Create a new usuario and return the full inserted record.
 * @param {Object} data - nombre, url_imagen, tipo_usuario_id, email, etc.
 * @returns {Usuario}
 */
export async function createUsuario(req) {
    const { nombre, email, password, url_imagen } = req.body;

    const id = await executeQuery(
        `SELECT id FROM usuarios WHERE LOWER(email) = LOWER(?)`, (email),
    );
    if (id.length === 1) {
        throw new CustomException({
            title: 'usuario duplicado',
            message: `Ya existe un usuario con email ${email}`,
            status: Status.conflict
        });
    }

    const contra_hash = hash256(password);
    const query = `INSERT INTO usuarios (nombre, email, password, url_imagen) VALUES (?,?,?,?)`;
    const result = await executeQuery(query, [nombre, email.toLowerCase(), contra_hash, url_imagen], true);
    //select de la fila recien creada
    const idNuevo = result.insertId;
    const rows = await executeQuery(`SELECT * FROM usuarios WHERE id = ?`, [idNuevo], true, 0);
    if (!rows.length) {
        throw new Error(`No se encontró usuario con id ${idNuevo}`);
    }


    // //insertar puesto en puesto_usuario
    // await executeQuery(
    //     `INSERT INTO puestos_usuario (usuario_id, puesto_id) VALUES (?, ?)`,
    //     [idNuevo, tipoPuestoId], true
    // );

    return Usuario.fromJson(rows[0]);

}