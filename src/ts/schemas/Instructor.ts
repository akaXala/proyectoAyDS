class Instructor {
    private id_instructor?: number;
    private nombre: string;
    private apellido_paterno: string;
    private apellido_materno: string | null;
    private fecha_nacimiento: Date | null;
    private genero: string | null;
    private email: string;
    private telefono: string | null;
    private contraseña: string;
    private fecha_registro?: Date | null;
    private id_resultado?: number | null;
  
    constructor(
      nombre: string,
      apellido_paterno: string,
      apellido_materno: string | null,
      fecha_nacimiento: Date | null,
      genero: string | null,
      email: string,
      telefono: string | null,
      contraseña: string,
      id_instructor?: number,
      fecha_registro?: Date | null,
      id_resultado?: number | null
    ) {
      this.id_instructor = id_instructor;
      this.nombre = nombre;
      this.apellido_paterno = apellido_paterno;
      this.apellido_materno = apellido_materno;
      this.fecha_nacimiento = fecha_nacimiento;
      this.genero = genero;
      this.email = email;
      this.telefono = telefono;
      this.contraseña = contraseña;
      this.fecha_registro = fecha_registro;
      this.id_resultado = id_resultado;
    }
  
    getIdInstructor(): number | undefined {
      return this.id_instructor;
    }
    setIdInstructor(id_instructor: number): void {
      this.id_instructor = id_instructor;
    }
  
    getNombre(): string {
      return this.nombre;
    }
    setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  
    getApellidoPaterno(): string {
      return this.apellido_paterno;
    }
    setApellidoPaterno(apellido_paterno: string): void {
      this.apellido_paterno = apellido_paterno;
    }
  
    getApellidoMaterno(): string | null {
      return this.apellido_materno;
    }
    setApellidoMaterno(apellido_materno: string | null): void {
      this.apellido_materno = apellido_materno;
    }
  
    getFechaNacimiento(): Date | null {
      return this.fecha_nacimiento;
    }
    setFechaNacimiento(fecha_nacimiento: Date | null): void {
      this.fecha_nacimiento = fecha_nacimiento;
    }
  
    getGenero(): string | null {
      return this.genero;
    }
    setGenero(genero: string | null): void {
      this.genero = genero;
    }
  
    getEmail(): string {
      return this.email;
    }
    setEmail(email: string): void {
      this.email = email;
    }
  
    getTelefono(): string | null {
      return this.telefono;
    }
    setTelefono(telefono: string | null): void {
      this.telefono = telefono;
    }
  
    getContraseña(): string {
      return this.contraseña;
    }
    setContraseña(contraseña: string): void {
      this.contraseña = contraseña;
    }
  
    getFechaRegistro(): Date | null | undefined {
      return this.fecha_registro;
    }
    setFechaRegistro(fecha_registro: Date | null): void {
      this.fecha_registro = fecha_registro;
    }
  
    getIdResultado(): number | null | undefined {
      return this.id_resultado;
    }
    setIdResultado(id_resultado: number | null): void {
      this.id_resultado = id_resultado;
    }
  }
  
  export default Instructor;
  