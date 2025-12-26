export class User{
    constructor({id, nombre, fecha_registro, admin}){
        this.id = id
        this.nombre = nombre
        this.fecha_registro = fecha_registro
        this.admin = admin
    }

    printBasico(){
        console.log(`UserId:${this.id}, Nombre:${this.nombre}, Fecha Registro: ${this.fecha_registro}, Admin: ${this.admin}`)
    }

    getId() {
        return this.id
    }

    setId(id) {
        this.id = id
    }

    getNombre() {
        return this.nombre
    }

    setNombre(nombre) {
        this.nombre = nombre
    }

    getFechaRegistro() {
        return this.fecha_registro
    }

    setFechaRegistro(fecha_registro) {
        this.fecha_registro = fecha_registro
    }

    getAdmin() {
        return this.admin
    }

    setAdmin(admin) {
        this.admin = admin
    }
}