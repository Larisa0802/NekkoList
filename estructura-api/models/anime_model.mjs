export class Anime{
    constructor({id, titulo, genero, descripcion, episodios, fecha_pub, imagen}){
        this.id = id
        this.titulo = titulo
        //genero se crea mediante una fusion de varios strings separados por comas se podrian hacer un split en front para que sean distintos campos por si se quieren mostrar por separado
        this.genero = genero
        this.descripcion = descripcion
        this.episodios = episodios
        this.fecha_pub = fecha_pub
        this.imagen = imagen
    }

    printBasico(){
        console.log(`AnimeId:${this.id}, Titulo:${this.titulo}, Genero: ${this.genero}, Descripcion: ${this.descripcion}, Episodios: ${this.episodios}, Fecha Publicacion: ${this.fecha_pub}, Imagen: ${this.imagen}`)
    }

    

    getId() {
        return this.id
    }

    setId(id) {
        this.id = id
    }

    getTitulo() {
        return this.titulo
    }

    setTitulo(titulo) {
        this.titulo = titulo
    }

    getGenero() {
        return this.genero
    }

    setGenero(genero) {
        this.genero = genero
    }

    getDescripcion() {
        return this.descripcion
    }

    setDescripcion(descripcion) {
        this.descripcion = descripcion
    }

    getEpisodios() {
        return this.episodios
    }

    setEpisodios(episodios) {
        this.episodios = episodios
    }

    getFechaPub() {
        return this.fecha_pub
    }

    setFechaPub(fecha_pub) {
        this.fecha_pub = fecha_pub
    }

    getImagen() {
        return this.imagen
    }

    setImagen(imagen) {
        this.imagen = imagen
    }
}