export class Characters{
    // cambiar progreso por rating en db

    constructor({id, anime_id, name, role,voice_actor,character_img}){
        this.id = id
        this.anime_id = anime_id
        this.name = name
        this.role = role
        this.voice_actor = voice_actor
        this.character_img = character_img
    }

    printBasico(){
        console.log(`PersonajeId:${this.id}, AnimeId:${this.anime_id}, Rol: ${this.role}, Nombre: ${this.name}, Actor de voz: ${this.voice_actor}, Imagen: ${this.character_img}`)
    }

    getId() {
        return this.id
    }

    setId(id) {
        this.id = id
    }

    getAnimeId() {
        return this.anime_id
    }

    setAnimeId(anime_id) {
        this.anime_id = anime_id
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    getRole() {
        return this.role
    }

    setRole(role) {
        this.role = role
    }

    getVoiceActor() {
        return this.voice_actor
    }

    setVoiceActor(voice_actor) {
        this.voice_actor = voice_actor
    }

    getCharacterImg() {
        return this.character_img
    }

    setCharacterImg(character_img) {
        this.character_img = character_img
    }

    
}