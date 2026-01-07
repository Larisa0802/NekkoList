const API_URL = "http://localhost:3000"

class AnimeController{
    async updateAnime(req, res){
        if(!req.session.user || req.session.user.admin !== true){
        return res.redirect("/accessDenied");
    }

    const { id, titulo, genero, episodios, descripcion } = req.body;
    if (!titulo || !genero || !descripcion) {
        return res.status(400).send("Faltan datos obligatorios");
    }
    if (episodios && isNaN(episodios)) {
        return res.status(400).send("Episodios debe ser un número");
    }

    try{
        const consulta = await fetch("http://localhost:3000/updateAnime",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: parseInt(id),
                titulo: titulo,
                genero: genero,
                episodios: episodios ? parseInt(episodios) : null,
                descripcion: descripcion,
                fecha_pub: new Date().toISOString().split('T')[0],
                imagen: ""
        })
    })

    if(consulta.ok){
        console.log("anime actualizado")
        res.redirect("/catalog")
    }else{
            res.status(500).send("Error al actualizar el anime");
    }
    }catch(error){
        console.log("Error en la peticion")
        res.status(500).send("Error al conectar con la API")
    }

    }
}

export default new AnimeController();