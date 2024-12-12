class Competidor {
  private id_competidor?: number;
  private nombre: string;
  private apellido_paterno: string;
  private apellido_materno: string | null;
  private fecha_nacimiento: Date | null;
  private genero: string | null;
  private email: string;
  private telefono: string | null;
  private fecha_registro?: Date | null;
  private id_categoria?: number | null;

  constructor(
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string | null,
    fecha_nacimiento: Date | null,
    genero: string | null,
    email: string,
    telefono: string | null,
    id_competidor?: number,
    fecha_registro?: Date | null,
    id_categoria?: number | null
  ) {
    this.id_competidor = id_competidor;
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.fecha_nacimiento = fecha_nacimiento;
    this.genero = genero;
    this.email = email;
    this.telefono = telefono;
    this.fecha_registro = fecha_registro;
    this.id_categoria = id_categoria;
  }

  // Métodos get y set para cada propiedad
  getIdCompetidor(): number | undefined {
    return this.id_competidor;
  }
  setIdCompetidor(id_competidor: number): void {
    this.id_competidor = id_competidor;
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

  getFechaRegistro(): Date | null | undefined {
    return this.fecha_registro;
  }
  setFechaRegistro(fecha_registro: Date | null): void {
    this.fecha_registro = fecha_registro;
  }

  getIdCategoria(): number | null | undefined {
    return this.id_categoria;
  }
  setIdCategoria(id_categoria: number | null): void {
    this.id_categoria = id_categoria;
  }
}

export default Competidor;