export default class Plan {
    constructor({ id, nombre, color, eliminado }) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        return new Plan({
            id: row.id,
            nombre: row.nombre,
            color: row.color,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, color: this.color, eliminado: this.eliminado };
    }
}