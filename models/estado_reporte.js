export default class Estadoticket {
    constructor({ id, nombre, color }) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
    }

    static fromJson(row) {
        return new Estadoticket({
            id: row.id,
            nombre: row.nombre,
            color: row.color
        });
    }

    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            color: this.color
        };
    }
}