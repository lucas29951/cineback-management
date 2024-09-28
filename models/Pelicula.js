
class Pelicula {
    constructor(id, titulo, descripcion, duracion, director, genero, calificacion, poster) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.director = director;
      this.duracion = duracion;
      this.genero = genero;
      this.calificacion = calificacion;
      this.poster_url = poster;
    }
  }
  
  module.exports = Pelicula;
  