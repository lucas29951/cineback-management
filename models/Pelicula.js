
class Pelicula {
    constructor(id, titulo, descripcion, director, duracion, genero, clasificacion, poster) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.director = director;
      this.duracion = duracion;
      this.genero = genero;
      this.clasificacion = clasificacion;
      this.poster_url = poster;
    }
  }
  
  module.exports = Pelicula;
  