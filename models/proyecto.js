export default class Proyecto {
    constructor({ id, nombre, fecha_inicio, fecha_finalizado }) {
        this.id = id;
        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.fecha_finalizado = fecha_finalizado;
    }

    static fromJson(row) {
        return new Proyecto({
            id: row.id,
            nombre: row.nombre,
            fecha_inicio: row.fecha_inicio,
            fecha_finalizado: row.fecha_finalizado,
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, fecha_inicio: this.fecha_inicio, fecha_finalizado: this.fecha_finalizado };
    }
}
