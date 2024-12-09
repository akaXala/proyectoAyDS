export class Evento {
    id_evento: number;
    nombre_evento: string;
    tipo_evento: string | null;
    capacidad: number | null;
    fecha_inicio_inscripcion: Date | null;
    fecha_fin_inscripcion: Date | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    horarios: string | null;
    modalidad: string | null;
    costo: number | null;
    requisitos: string | null;
    reglas: string | null;
    descripcion: string | null;
    estatus: string | null;
  
    constructor(data: {
      id_evento?: number;
      nombre_evento: string;
      tipo_evento: string | null;
      capacidad: number | null;
      fecha_inicio_inscripcion: Date | null;
      fecha_fin_inscripcion: Date | null;
      fecha_inicio: Date | null;
      fecha_fin: Date | null;
      horarios: string | null;
      modalidad: string | null;
      costo: number | null;
      requisitos: string | null;
      reglas: string | null;
      descripcion: string | null;
      estatus: string | null;
    }) {
      this.id_evento = data.id_evento ?? 0;
      this.nombre_evento = data.nombre_evento;
      this.tipo_evento = data.tipo_evento ?? null;
      this.capacidad = data.capacidad ?? null;
      this.fecha_inicio_inscripcion = data.fecha_inicio_inscripcion ?? null;
      this.fecha_fin_inscripcion = data.fecha_fin_inscripcion ?? null;
      this.fecha_inicio = data.fecha_inicio ?? null;
      this.fecha_fin = data.fecha_fin ?? null;
      this.horarios = data.horarios ?? null;
      this.modalidad = data.modalidad ?? null;
      this.costo = data.costo ?? null;
      this.requisitos = data.requisitos ?? null;
      this.reglas = data.reglas ?? null;
      this.descripcion = data.descripcion ?? null;
      this.estatus = data.estatus ?? null;
    }
  
    // Métodos opcionales para la clase
    actualizar(data: Partial<Omit<Evento, 'id_evento'>>) {
      Object.assign(this, data);
    }
  
    obtenerDescripcion(): string {
      return this.descripcion ?? 'No hay descripción disponible.';
    }
  }
  