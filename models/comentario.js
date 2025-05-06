export default class Comentario {
    constructor({ id, fecha_creacion, fecha_comienzo, contenido, eliminado }) {
        this.id = id;
        this.fecha_creacion = fecha_creacion;
        this.fecha_comienzo = fecha_comienzo;
        this.contenido = contenido;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        return new Comentario({
            id: row.id,
            fecha_creacion: row.fecha_creacion,
            fecha_comienzo: row.fecha_comienzo,
            contenido: row.contenido,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return {
            id: this.id,
            fecha_creacion: this.fecha_creacion,
            fecha_comienzo: this.fecha_comienzo,
            contenido: this.contenido,
            eliminado: this.eliminado,
        };
    }
}