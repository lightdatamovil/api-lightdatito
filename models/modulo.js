export default class Modulo {
    constructor({ id, nombre, color }) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
    }

    static fromJson(row) {
        return new Modulo({
            id: row.id,
            nombre: row.nombre,
            color: row.color
        });
    }

    toJson() {
        return { id: this.id, nombre: this.nombre, color: this.color };
    }
}
//pueede tener menos atributos que en la tabla? como no tener menu o otra cosa mas??
