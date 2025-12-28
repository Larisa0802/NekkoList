export class Favourites{
    // cambiar progreso por rating en db

    constructor({usuario_id, anime_id, fecha_agregado, rating, animeData}){
        this.usuario_id = usuario_id
        this.anime_id = anime_id
        this.fecha_agregado = fecha_agregado
        this.rating = rating
        this.animeData = animeData
    }

    printBasico(){
        console.log(`UserId:${this.usuario_id}, AnimeId:${this.anime_id}, Agregado En: ${this.fecha_agregado}, Rating: ${this.rating}, AnimeData: ${this.animeData}`)
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

    getRating() {
        return this.rating
    }

    setRating(rating) {
        this.rating = rating
    }

    getAnimeData() {
        return this.animeData
    }

    setAnimeData(animeData) {
        this.animeData = animeData
    }

    
}