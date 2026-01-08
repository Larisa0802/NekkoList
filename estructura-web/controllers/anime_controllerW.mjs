const API_URL = "http://localhost:3000";

class AnimeController {
  async updateAnime(req, res) {
    const user = req.cookies.datosUsuario;

    if (!user || user.admin !== true) {
      return res.send("No eres admin");
    }

    const { id, titulo, genero, episodios, descripcion } = req.body;
    if (!titulo || !genero || !descripcion) {
      return res.status(400).send("Faltan datos obligatorios");
    }
    if (episodios && isNaN(episodios)) {
      return res.status(400).send("Episodios debe ser un número");
    }

    console.log(episodios)

    try {
      const consulta = await fetch("http://localhost:3000/updateAnime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            id: parseInt(id),
            titulo,
            genero,
            episodios: episodios ? episodios : null,
            descripcion
          },
        }),
      });

      console.log("STATUS:", consulta.status);
      console.log("BODY:", await consulta.text());

      if (consulta.ok) {
        console.log("anime actualizado");
        res.redirect("/catalog");
      } else {
        res.status(500).send("Error al actualizar el anime");
      }
    } catch (error) {
      console.log("Error en la peticion");
      res.status(500).send("Error al conectar con la API");
    }
  }
}

export default new AnimeController();
