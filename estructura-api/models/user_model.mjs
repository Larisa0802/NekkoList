class User{
    constructor(uid, email, fechaRegistro){
        this.id = uid
        this.nombre = email
        this.root = false
        this.fechaRegistro = fechaRegistro
    }

    printBasico(){
        console.log(`UserId:${this.id}, Nombre:${this.nombre}, Fecha Registro: ${this.fechRegistro}, Admin: ${this.root}`)
    }
}