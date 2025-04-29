export default class EstadoLogistica {
    constructor({ id, nombre, color, eliminado }) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
    }

    static fromJson(row) {
        return new EstadoLogistica({
            id: row.id,
            nombre: row.nombre,
            color: row.color
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, color: this.color };
    }
}