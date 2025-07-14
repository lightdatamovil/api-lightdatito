export default class Usuario {
    constructor({ id, nombre, url_imagen, tipo_usuario_id, email, fecha_creacion, eliminado }) {
        this.id = id;
        this.nombre = nombre;
        this.url_imagen = url_imagen;
        this.tipo_usuario_id = tipo_usuario_id;
        this.email = email;
        this.fecha_creacion = fecha_creacion;
        this.eliminado = eliminado;
    }

    /**
     * Map a DB row to a Usuario instance.
     * @param {Object} row - DB result row
     * @returns {Usuario}
     */
    static fromJson(row) {

        return new Usuario({
            id: row.id,
            nombre: row.nombre,
            url_imagen: row.url_imagen,
            tipo_usuario_id: row.tipo_usuario_id,
            email: row.email,
            fecha_creacion: row.fecha_creacion,
            eliminado: row.eliminado
        });
    }

    /**
     * Convert this instance to a plain object for JSON responses.
     * @returns {Object}
     */
    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            url_imagen: this.url_imagen,
            tipo_usuario_id: this.tipo_usuario_id,
            email: this.email,
            fecha_creacion: this.fecha_creacion,
            eliminado: this.eliminado
        };
    }
}
