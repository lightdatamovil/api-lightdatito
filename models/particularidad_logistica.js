export default class ParticularidadLogistica {
    constructor({ id, nombre, eliminado }) {
        this.id = id;
        this.nombre = nombre;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        return new ParticularidadLogistica({
            id: row.id,
            nombre: row.nombre,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, eliminado: this.eliminado };
    }
}