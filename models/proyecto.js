export default class Proyecto {
    constructor({ id, nombre }) {
        this.id = id;
        this.nombre = nombre;
    }

    static fromJson(row) {
        return new Proyecto({
            id: row.id,
            nombre: row.nombre
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre };
    }
}
