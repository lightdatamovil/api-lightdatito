import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createHerramienta(req) {
    const { nombre, modulo_principal } = req.body;
    const nombreLower = nombre.trim().toLowerCase();

    //verifico existe modulo
    const moduloExiste = await executeQuery(`SELECT id FROM modulos WHERE id = ? AND eliminado = 0 LIMIT 1`, [modulo_principal]);
    if (moduloExiste.length === 0) {
        throw new CustomException({
            title: 'Módulo no encontrado',
            message: `No existe un módulo con id: ${modulo_principal}`,
            status: Status.notFound
        });
    }

    // Verificar si ya existe herramienta
    const existing = await executeQuery(`SELECT id FROM herramientas WHERE LOWER(nombre) = ? and eliminado = 0 LIMIT 1`, [nombreLower]
    );
    if (existing.length > 0) {
        throw new CustomException({
            title: 'Herramienta duplicada',
            message: `Ya existe una herramienta con nombre: "${nombre}"`,
            status: Status.conflict
        });
    }

    const result = await executeQuery(`INSERT INTO herramientas (nombre, modulo_principal) VALUES (?, ?)`, [nombreLower, modulo_principal], true
    );
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear herramienta',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }
    return newId;
}
