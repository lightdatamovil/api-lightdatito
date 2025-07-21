// src/controllers/auth/login.js
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import { hash256 } from '../../src/funciones/hash.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

export async function login(email, password) {

    // 1) busca al usuario y su hash
    const [userRow] = await executeQuery(
        'SELECT id, nombre, email, password FROM usuarios WHERE email = ? AND eliminado = 0 LIMIT 1',
        [email],
        true
    );
    if (!userRow) {
        throw new CustomException({
            title: 'Credenciales inválidas',
            message: 'El usuario no existe o ha sido eliminado',
            status: Status.notFound
        });
    }

    //console.log('→ loginUser:', { email, password, userRow });

    // 2) Compara hash SHA-256
    const incomingHash = hash256(password);
    //console.log('→ incomingHash:', incomingHash, 'storedHash:', userRow.password);
    if (incomingHash !== userRow.password) {
        throw new CustomException({
            title: 'Credenciales inválidas',
            message: 'Contraseña incorrecta',
            status: Status.unauthorized
        });
    }

    // 3) Genera JWT
    const token = jwt.sign({ sub: userRow.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // 2) Hashear la contraseña que envía el cliente


    // 4) Devuelve token + datos de usuario (sin el hash)
    const { id, nombre, email: mail } = userRow;
    return {
        id: id, token, nombre, email: mail,
    };
}