class Usuario {
    constructor(id, nombre, email, password, rol) {
      this.id = id;
      this.nombre = nombre;
      this.email = email;
      this.password = password;
      this.rol_id = rol;
    }
  }
  
  module.exports = Usuario;
  