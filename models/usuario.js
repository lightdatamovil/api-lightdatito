export default class Usuario {
    constructor({
        id,
        nombre,
        url_imagen,
        rol,
        roles_id,
        eliminado,
        tipo_usuario_id,
        email
    }) {
        this.id = id;
        this.nombre = nombre;
        this.url_imagen = url_imagen;
        this.rol = rol;
        this.roles_id = roles_id;
        this.eliminado = eliminado;
        this.tipo_usuario_id = tipo_usuario_id;
        this.email = email;
    }

    static fromJson(row) {
        return new Usuario({
            id: row.id,
            nombre: row.nombre,
            url_imagen: row.url_imagen,
            rol: row.rol,
            roles_id: row.roles_id,
            eliminado: row.eliminado,
            tipo_usuario_id: row.tipo_usuario_id,
            email: row.email
        });
    }

    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            url_imagen: this.url_imagen,
            rol: this.rol,
            roles_id: this.roles_id,
            eliminado: this.eliminado,
            tipo_usuario_id: this.tipo_usuario_id,
            email: this.email
        };
    }
}
