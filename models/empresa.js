export default class Empresa {
    constructor({
        id,
        nombre,
        urlImagen,
        plan_id,
        estados_empresas_id,
        observaciones_empresa_id,
        pais_id,
        contraseña,
        cuit,
        email,
        url_sistema,
        fecha_alta,
        eliminado
    }) {
        this.id = id;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.plan_id = plan_id;
        this.estados_empresas_id = estados_empresas_id;
        this.observaciones_empresa_id = observaciones_empresa_id;
        this.pais_id = pais_id;
        this.contraseña = contraseña;
        this.cuit = cuit;
        this.email = email;
        this.url_sistema = url_sistema;
        this.fecha_alta = fecha_alta;
        this.eliminado = eliminado;
    }

    static fromJson(row) {
        return new Empresa({
            id: row.id,
            nombre: row.nombre,
            urlImagen: row.urlImagen,
            plan_id: row.plan_id,
            estados_empresas_id: row.estados_empresas_id,
            observaciones_empresa_id: row.observaciones_empresa_id,
            pais_id: row.pais_id,
            contraseña: row.contraseña,
            cuit: row.cuit,
            email: row.email,
            url_sistema: row.url_sistema,
            fecha_alta: row.fecha_alta,
            eliminado: row.eliminado
        });
    }

    toJson() {
        return {
            id: this.id,
            nombre: this.nombre,
            urlImagen: this.urlImagen,
            plan_id: this.plan_id,
            estados_empresas_id: this.estados_empresas_id,
            observaciones_empresa_id: this.observaciones_empresa_id,
            pais_id: this.pais_id,
            contraseña: this.contraseña,
            cuit: this.cuit,
            email: this.email,
            url_sistema: this.url_sistema,
            fecha_alta: this.fecha_alta,
            eliminado: this.eliminado
        };
    }
}