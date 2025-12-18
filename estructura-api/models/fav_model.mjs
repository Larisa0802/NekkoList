class Favourites{
    constructor(userId, animeId, fechaAgregado, progreso){
        this.userId = userId
        this.animeId = animeId
        this.fechaAgregado = fechaAgregado
        this.progreso = progreso
    }

    printBasico(){
        console.log(`UserId:${this.userId}, AnimeId:${this.animeId}, Agregado En: ${this.fechaAgregado}, Progreso: ${this.progreso}`)
    }
}