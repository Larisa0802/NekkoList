import axios from "axios";

class AnimeController {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  // LISTAR ANIMES
  listar = async (req, res) => {
    try {
      //Envia un GET a la API y espera respuesta
      const respuesta = await this.client.get("/getAllAnimes");
      const animes = respuesta.data; //Respuesta de la api

      //Renderizado en la página de catalogo con la información de la variable animes
      res.render("completes/catalog", {
        title: "Catalogo",
        animes,
        user: req.cookies["datosUsuario"] || null,
      });
    } catch (error) {
      console.error("Error al obtener animes:", error.message);

      res.render("completes/catalog", {
        title: "Catálogo",
        animes: [],
        error: "No se pudo cargar el catálogo",
        user: req.cookies["datosUsuario"] || null,
      });
    }
  };

  // DETALLE DE UN ANIME
  detalle = async (req, res) => {
    const { id } = req.params;
    try {
      const respuesta = await this.client.get(`/getAnimeById/${id}`);
      const anime = respuesta.data[0];
      const char = await this.client.get(`/getAllCharacters/${id}`);
      console.log("RESPUESTA RAW DE LA API:", char.data);
      console.log("ANIME:", anime)
      
      res.render("completes/masInfo", {
        title: anime.titulo,
        anime: anime,
        char: char.data,
        user: req.cookies["datosUsuario"] || null,
      });
    } catch (error) {
      res.status(404).send("Error al cargar")
    }
  };
}

export default new AnimeController();
