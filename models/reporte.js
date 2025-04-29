export default class Reporte {
    constructor({ id, titulo, descripcion, fecha_creacion, fecha_comienzo, fecha_limite, tipo_reporte_id, observador, proyecto_id, logistica_id, eliminado }) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha_creacion = fecha_creacion;
        this.fecha_comienzo = fecha_comienzo;
        this.fecha_limite = fecha_limite;
        this.tipo_reporte_id = tipo_reporte_id;
        this.observador = observador;
        this.proyecto_id = proyecto_id;
        this.logistica_id = logistica_id;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        return new Reporte({
            id: row.id,
            titulo: row.titulo,
            descripcion: row.descripcion,
            fecha_creacion: row.fecha_creacion,
            fecha_comienzo: row.fecha_comienzo,
            fecha_limite: row.fecha_limite,
            tipo_reporte_id: row.tipo_reporte_id,
            observador: row.observador,
            proyecto_id: row.proyecto_id,
            logistica_id: row.logistica_id,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return {
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            fecha_creacion: this.fecha_creacion,
            fecha_comienzo: this.fecha_comienzo,
            fecha_limite: this.fecha_limite,
            tipo_reporte_id: this.tipo_reporte_id,
            observador: this.observador,
            proyecto_id: this.proyecto_id,
            logistica_id: this.logistica_id,
            eliminado: this.eliminado
        };
    }
}