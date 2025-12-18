class Anime{
    constructor(id, titulo, genero, descripcion, episodios, fechaPub){
        this.id = id
        this.titulo = titulo
        this.genero = genero
        this.descripcion = descripcion
        this.episodios = episodios
        this.fechaPub = fechaPub
    }

    printBasico(){
        console.log(`AnimeId:${this.id}, Titulo:${this.titulo}, Genero: ${this.genero}, Descripcion: ${this.descripcion}, Episodios: ${this.episodios}, Fecha Publicacion: ${this.fechaPub}`)
    }
}