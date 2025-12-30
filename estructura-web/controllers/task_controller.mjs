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
      const respuesta = await this.client.get(`/getAnimesById/${id}`);
      const anime = respuesta.data;

      res.render("completes/detalle", {
        title: anime.titulo,
        anime,
        user: req.cookies["datosUsuario"] || null,
      });
    } catch (error) {
      res.status(404).render("completes/not_found", {
        title: "Anime no encontrado",
        user: req.cookies["datosUsuario"] || null,
      });
    }
  };
}

export default new AnimeController();
