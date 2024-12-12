export class Evento {
  id_evento: number;
  nombre_evento: string;
  tipo_evento: string | null;
  capacidad: number | null;
  fecha_inicio_inscripcion: Date | null;
  fecha_fin_inscripcion: Date | null;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  modalidad: string | null;
  costo: number | null;
  requisitos: string | null;
  reglas: string | null;
  descripcion: string | null;
  estatus: string | null;
  imagen: string | null;

  constructor(data: {
    id_evento?: number;
    nombre_evento: string;
    tipo_evento?: string | null;
    capacidad?: number | null;
    fecha_inicio_inscripcion?: Date | null;
    fecha_fin_inscripcion?: Date | null;
    fecha_inicio?: Date | null;
    fecha_fin?: Date | null;
    hora_inicio?: string | null;
    hora_fin?: string | null;
    modalidad?: string | null;
    costo?: number | null;
    requisitos?: string | null;
    reglas?: string | null;
    descripcion?: string | null;
    estatus?: string | null;
    imagen?: string | null;
  }) {
    this.id_evento = data.id_evento ?? 0;
    this.nombre_evento = data.nombre_evento;
    this.tipo_evento = data.tipo_evento ?? null;
    this.capacidad = data.capacidad ?? null;
    this.fecha_inicio_inscripcion = data.fecha_inicio_inscripcion ?? null;
    this.fecha_fin_inscripcion = data.fecha_fin_inscripcion ?? null;
    this.fecha_inicio = data.fecha_inicio ?? null;
    this.fecha_fin = data.fecha_fin ?? null;
    this.hora_inicio = data.hora_inicio ?? null;
    this.hora_fin = data.hora_fin ?? null;
    this.modalidad = data.modalidad ?? null;
    this.costo = data.costo ?? null;
    this.requisitos = data.requisitos ?? null;
    this.reglas = data.reglas ?? null;
    this.descripcion = data.descripcion ?? null;
    this.estatus = data.estatus ?? null;
    this.imagen = data.imagen ?? null;
  }

  get getIdEvento(): number {
    return this.id_evento;
  }

  get getNombreEvento(): string {
    return this.nombre_evento;
  }

  get getTipoEvento(): string | null {
    return this.tipo_evento;
  }

  get getCapacidad(): number | null {
    return this.capacidad;
  }

  get getFechaInicioInscripcion(): string {
    return this.fecha_inicio_inscripcion
      ? this.fecha_inicio_inscripcion.toLocaleDateString()
      : 'No especificada';
  }

  get getFechaFinInscripcion(): string {
    return this.fecha_fin_inscripcion
      ? this.fecha_fin_inscripcion.toLocaleDateString()
      : 'No especificada';
  }

  get getFechaInicio(): string {
    return this.fecha_inicio
      ? this.fecha_inicio.toLocaleDateString()
      : 'No especificada';
  }

  get getFechaFin(): string {
    return this.fecha_fin
      ? this.fecha_fin.toLocaleDateString()
      : 'No especificada';
  }

  get getHoraInicio(): string | null {
    return this.hora_inicio;
  }

  get getHoraFin(): string | null {
    return this.hora_fin;
  }

  get getModalidad(): string | null {
    return this.modalidad;
  }

  get getCosto(): string {
    return this.costo && this.costo > 0 ? `${this.costo} MXN` : 'Gratis';
  }

  get getRequisitos(): string | null {
    return this.requisitos;
  }

  get getReglas(): string | null {
    return this.reglas;
  }

  get getDescripcion(): string {
    return this.descripcion ?? 'No hay descripción disponible.';
  }

  get getEstatus(): string | null {
    return this.estatus;
  }

  get getImagen(): string {
    return this.imagen ?? 'https://via.placeholder.com/150';
  }
}
