export default class Aviso {
    constructor({ id, fecha_creacion, fecha, titulo, eliminado, descripcion }) {
        this.id = id;
        this.fecha_creacion = fecha_creacion;
        this.fecha = fecha;
        this.titulo = titulo;
        this.eliminado = eliminado;
        this.descripcion = descripcion;
    }

    static fromJson(row) {
        return new Aviso({
            id: row.id,
            fecha_creacion: row.fecha_creacion,
            fecha: row.fecha,
            titulo: row.titulo,
            eliminado: row.eliminado,
            descripcion: row.descripcion
        });
    }

    toJson() {
        return {
            id: this.id,
            fecha_creacion: this.fecha_creacion,
            fecha: this.fecha,
            titulo: this.titulo,
            eliminado: this.eliminado,
        };
    }
}