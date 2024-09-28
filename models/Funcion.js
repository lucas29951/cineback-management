class Funcion {
    constructor(id, peliculaId, sala, fecha, hora, precio, asientos) {
      this.id = id;
      this.id_pelicula = peliculaId;
      this.fecha = fecha;
      this.hora = hora;
      this.sala = sala;
      this.precio = precio;
      this.asientos_disponibles = asientos;
    }
  }
  
  module.exports = Funcion;
  