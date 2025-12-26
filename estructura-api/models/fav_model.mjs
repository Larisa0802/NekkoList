export class Favourites{
    constructor({usuario_id, anime_id, fecha_agregado, progreso}){
        this.usuario_id = usuario_id
        this.anime_id = anime_id
        this.fecha_agregado = fecha_agregado
        this.progreso = progreso
    }

    printBasico(){
        console.log(`UserId:${this.usuario_id}, AnimeId:${this.anime_id}, Agregado En: ${this.fecha_agregado}, Progreso: ${this.progreso}`)
    }

    getUsuarioId() {
        return this.usuario_id
    }

    setUsuarioId(usuario_id) {
        this.usuario_id = usuario_id
    }

    getAnimeId() {
        return this.anime_id
    }

    setAnimeId(anime_id) {
        this.anime_id = anime_id
    }

    getFechaAgregado() {
        return this.fecha_agregado
    }

    setFechaAgregado(fecha_agregado) {
        this.fecha_agregado = fecha_agregado
    }

    getProgreso() {
        return this.progreso
    }

    setProgreso(progreso) {
        this.progreso = progreso
    }

    
}