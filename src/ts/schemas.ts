/* tslint:disable */
/* eslint-disable */


/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was automatically generated by pg-to-ts v.4.1.1
 * $ pg-to-ts generate -c postgres://username:password@club-leones.cxscice4ikfm.us-east-2.rds.amazonaws.com:5432/Club de leones?ssl=true&sslrootcert=./us-east-2-bundle.pem -t administrador -t administrador_evento -t categoria -t competidor -t evento -t inscripcion -t instructor -t instructor_evento -t organizador -t organizador_evento -t resultado -t sesion -s public
 *
 */


export type Json = unknown;

// Table administrador
export interface Administrador {
  id_administrador: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string | null;
  fecha_nacimiento: Date | null;
  genero: string | null;
  email: string;
  telefono: string | null;
  contraseña: string;
  fecha_registro: Date | null;
  id_competidor: number | null;
  id_instructor: number | null;
  id_organizador: number | null;
  id_evento: number | null;
}
export interface AdministradorInput {
  id_administrador?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  fecha_nacimiento?: Date | null;
  genero?: string | null;
  email: string;
  telefono?: string | null;
  contraseña: string;
  fecha_registro?: Date | null;
  id_competidor?: number | null;
  id_instructor?: number | null;
  id_organizador?: number | null;
  id_evento?: number | null;
}
const administrador = {
  tableName: 'administrador',
  columns: ['id_administrador', 'nombre', 'apellido_paterno', 'apellido_materno', 'fecha_nacimiento', 'genero', 'email', 'telefono', 'contraseña', 'fecha_registro', 'id_competidor', 'id_instructor', 'id_organizador', 'id_evento'],
  requiredForInsert: ['nombre', 'apellido_paterno', 'email', 'contraseña'],
  primaryKey: 'id_administrador',
  foreignKeys: {
    id_competidor: { table: 'competidor', column: 'id_competidor', $type: null as unknown as Competidor },
    id_instructor: { table: 'instructor', column: 'id_instructor', $type: null as unknown as Instructor },
    id_organizador: { table: 'organizador', column: 'id_organizador', $type: null as unknown as Organizador },
  },
  $type: null as unknown as Administrador,
  $input: null as unknown as AdministradorInput
} as const;

// Table administrador_evento
export interface AdministradorEvento {
  id_administrador: number;
  id_evento: number;
}
export interface AdministradorEventoInput {
  id_administrador: number;
  id_evento: number;
}
const administrador_evento = {
  tableName: 'administrador_evento',
  columns: ['id_administrador', 'id_evento'],
  requiredForInsert: ['id_administrador', 'id_evento'],
  primaryKey: 'id_administrador',
  foreignKeys: {
    id_administrador: { table: 'administrador', column: 'id_administrador', $type: null as unknown as Administrador },
    id_evento: { table: 'evento', column: 'id_evento', $type: null as unknown as Evento },
  },
  $type: null as unknown as AdministradorEvento,
  $input: null as unknown as AdministradorEventoInput
} as const;

// Table categoria
export interface Categoria {
  id_categoria: number;
  nombre: string | null;
  edad_minima: number | null;
  edad_maxima: number | null;
  genero: string | null;
  descripcion: string | null;
}
export interface CategoriaInput {
  id_categoria?: number;
  nombre?: string | null;
  edad_minima?: number | null;
  edad_maxima?: number | null;
  genero?: string | null;
  descripcion?: string | null;
}
const categoria = {
  tableName: 'categoria',
  columns: ['id_categoria', 'nombre', 'edad_minima', 'edad_maxima', 'genero', 'descripcion'],
  requiredForInsert: [],
  primaryKey: 'id_categoria',
  foreignKeys: {},
  $type: null as unknown as Categoria,
  $input: null as unknown as CategoriaInput
} as const;

// Table competidor
export interface Competidor {
  id_competidor: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string | null;
  fecha_nacimiento: Date | null;
  genero: string | null;
  email: string;
  telefono: string | null;
  contraseña: string;
  fecha_registro: Date | null;
  id_categoria: number | null;
}
export interface CompetidorInput {
  id_competidor?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  fecha_nacimiento?: Date | null;
  genero?: string | null;
  email: string;
  telefono?: string | null;
  contraseña: string;
  fecha_registro?: Date | null;
  id_categoria?: number | null;
}
const competidor = {
  tableName: 'competidor',
  columns: ['id_competidor', 'nombre', 'apellido_paterno', 'apellido_materno', 'fecha_nacimiento', 'genero', 'email', 'telefono', 'contraseña', 'fecha_registro', 'id_categoria'],
  requiredForInsert: ['nombre', 'apellido_paterno', 'email', 'contraseña'],
  primaryKey: 'id_competidor',
  foreignKeys: { id_categoria: { table: 'categoria', column: 'id_categoria', $type: null as unknown as Categoria }, },
  $type: null as unknown as Competidor,
  $input: null as unknown as CompetidorInput
} as const;

// Table evento
export interface Evento {
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
  convocatoria: string | null;
  relevos: boolean | null;
}
export interface EventoInput {
  id_evento?: number;
  nombre_evento: string;
  tipo_evento?: string | null;
  capacidad?: number | null;
  fecha_inicio_inscripcion?: Date | null;
  fecha_fin_inscripcion?: Date | null;
  fecha_inicio?: Date | null;
  fecha_fin?: Date | null;
  horarios?: string | null;
  modalidad?: string | null;
  costo?: number | null;
  requisitos?: string | null;
  reglas?: string | null;
  descripcion?: string | null;
  estatus?: string | null;
  convocatoria?: string | null;
  relevos?: boolean | null;
}
const evento = {
  tableName: 'evento',
  columns: ['id_evento', 'nombre_evento', 'tipo_evento', 'capacidad', 'fecha_inicio_inscripcion', 'fecha_fin_inscripcion', 'fecha_inicio', 'fecha_fin', 'horarios', 'modalidad', 'costo', 'requisitos', 'reglas', 'descripcion', 'estatus', 'convocatoria', 'relevos'],
  requiredForInsert: ['nombre_evento'],
  primaryKey: 'id_evento',
  foreignKeys: {},
  $type: null as unknown as Evento,
  $input: null as unknown as EventoInput
} as const;

// Table inscripcion
export interface Inscripcion {
  id_inscripcion: number;
  fecha_inscripcion: Date | null;
  estatus_de_pago: boolean | null;
  moalidades: string | null;
  categoria: string | null;
  id_competidor: number | null;
  id_evento: number | null;
}
export interface InscripcionInput {
  id_inscripcion?: number;
  fecha_inscripcion?: Date | null;
  estatus_de_pago?: boolean | null;
  moalidades?: string | null;
  categoria?: string | null;
  id_competidor?: number | null;
  id_evento?: number | null;
}
const inscripcion = {
  tableName: 'inscripcion',
  columns: ['id_inscripcion', 'fecha_inscripcion', 'estatus_de_pago', 'moalidades', 'categoria', 'id_competidor', 'id_evento'],
  requiredForInsert: [],
  primaryKey: 'id_inscripcion',
  foreignKeys: {
    id_competidor: { table: 'competidor', column: 'id_competidor', $type: null as unknown as Competidor },
    id_evento: { table: 'evento', column: 'id_evento', $type: null as unknown as Evento },
  },
  $type: null as unknown as Inscripcion,
  $input: null as unknown as InscripcionInput
} as const;

// Table instructor
export interface Instructor {
  id_instructor: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string | null;
  fecha_nacimiento: Date | null;
  genero: string | null;
  email: string;
  telefono: string | null;
  contraseña: string;
  fecha_registro: Date | null;
  id_resultado: number | null;
}
export interface InstructorInput {
  id_instructor?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  fecha_nacimiento?: Date | null;
  genero?: string | null;
  email: string;
  telefono?: string | null;
  contraseña: string;
  fecha_registro?: Date | null;
  id_resultado?: number | null;
}
const instructor = {
  tableName: 'instructor',
  columns: ['id_instructor', 'nombre', 'apellido_paterno', 'apellido_materno', 'fecha_nacimiento', 'genero', 'email', 'telefono', 'contraseña', 'fecha_registro', 'id_resultado'],
  requiredForInsert: ['nombre', 'apellido_paterno', 'email', 'contraseña'],
  primaryKey: 'id_instructor',
  foreignKeys: { id_resultado: { table: 'resultado', column: 'id_resultado', $type: null as unknown as Resultado }, },
  $type: null as unknown as Instructor,
  $input: null as unknown as InstructorInput
} as const;

// Table instructor_evento
export interface InstructorEvento {
  id_instructor: number;
  id_evento: number;
}
export interface InstructorEventoInput {
  id_instructor: number;
  id_evento: number;
}
const instructor_evento = {
  tableName: 'instructor_evento',
  columns: ['id_instructor', 'id_evento'],
  requiredForInsert: ['id_instructor', 'id_evento'],
  primaryKey: 'id_instructor',
  foreignKeys: {
    id_instructor: { table: 'instructor', column: 'id_instructor', $type: null as unknown as Instructor },
    id_evento: { table: 'evento', column: 'id_evento', $type: null as unknown as Evento },
  },
  $type: null as unknown as InstructorEvento,
  $input: null as unknown as InstructorEventoInput
} as const;

// Table organizador
export interface Organizador {
  id_organizador: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string | null;
  fecha_nacimiento: Date | null;
  genero: string | null;
  email: string;
  telefono: string | null;
  contraseña: string;
  fecha_registro: Date | null;
  id_evento: number | null;
}
export interface OrganizadorInput {
  id_organizador?: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  fecha_nacimiento?: Date | null;
  genero?: string | null;
  email: string;
  telefono?: string | null;
  contraseña: string;
  fecha_registro?: Date | null;
  id_evento?: number | null;
}
const organizador = {
  tableName: 'organizador',
  columns: ['id_organizador', 'nombre', 'apellido_paterno', 'apellido_materno', 'fecha_nacimiento', 'genero', 'email', 'telefono', 'contraseña', 'fecha_registro', 'id_evento'],
  requiredForInsert: ['nombre', 'apellido_paterno', 'email', 'contraseña'],
  primaryKey: 'id_organizador',
  foreignKeys: {},
  $type: null as unknown as Organizador,
  $input: null as unknown as OrganizadorInput
} as const;

// Table organizador_evento
export interface OrganizadorEvento {
  id_organizador: number;
  id_evento: number;
}
export interface OrganizadorEventoInput {
  id_organizador: number;
  id_evento: number;
}
const organizador_evento = {
  tableName: 'organizador_evento',
  columns: ['id_organizador', 'id_evento'],
  requiredForInsert: ['id_organizador', 'id_evento'],
  primaryKey: 'id_organizador',
  foreignKeys: {
    id_organizador: { table: 'organizador', column: 'id_organizador', $type: null as unknown as Organizador },
    id_evento: { table: 'evento', column: 'id_evento', $type: null as unknown as Evento },
  },
  $type: null as unknown as OrganizadorEvento,
  $input: null as unknown as OrganizadorEventoInput
} as const;

// Table resultado
export interface Resultado {
  id_resultado: number;
  distancia: number | null;
  tiempo: number | null;
  posicion: number | null;
  observaciones: string | null;
  motivo_extension: string | null;
}
export interface ResultadoInput {
  id_resultado?: number;
  distancia?: number | null;
  tiempo?: number | null;
  posicion?: number | null;
  observaciones?: string | null;
  motivo_extension?: string | null;
}
const resultado = {
  tableName: 'resultado',
  columns: ['id_resultado', 'distancia', 'tiempo', 'posicion', 'observaciones', 'motivo_extension'],
  requiredForInsert: [],
  primaryKey: 'id_resultado',
  foreignKeys: {},
  $type: null as unknown as Resultado,
  $input: null as unknown as ResultadoInput
} as const;

// Table sesion
export interface Sesion {
  id_sesion: number;
  id_resultado: number | null;
  detalles: string | null;
}
export interface SesionInput {
  id_sesion?: number;
  id_resultado?: number | null;
  detalles?: string | null;
}
const sesion = {
  tableName: 'sesion',
  columns: ['id_sesion', 'id_resultado', 'detalles'],
  requiredForInsert: [],
  primaryKey: 'id_sesion',
  foreignKeys: { id_resultado: { table: 'resultado', column: 'id_resultado', $type: null as unknown as Resultado }, },
  $type: null as unknown as Sesion,
  $input: null as unknown as SesionInput
} as const;


export interface TableTypes {
  administrador: {
    select: Administrador;
    input: AdministradorInput;
  };
  administrador_evento: {
    select: AdministradorEvento;
    input: AdministradorEventoInput;
  };
  categoria: {
    select: Categoria;
    input: CategoriaInput;
  };
  competidor: {
    select: Competidor;
    input: CompetidorInput;
  };
  evento: {
    select: Evento;
    input: EventoInput;
  };
  inscripcion: {
    select: Inscripcion;
    input: InscripcionInput;
  };
  instructor: {
    select: Instructor;
    input: InstructorInput;
  };
  instructor_evento: {
    select: InstructorEvento;
    input: InstructorEventoInput;
  };
  organizador: {
    select: Organizador;
    input: OrganizadorInput;
  };
  organizador_evento: {
    select: OrganizadorEvento;
    input: OrganizadorEventoInput;
  };
  resultado: {
    select: Resultado;
    input: ResultadoInput;
  };
  sesion: {
    select: Sesion;
    input: SesionInput;
  };
}

export const tables = {
  administrador,
  administrador_evento,
  categoria,
  competidor,
  evento,
  inscripcion,
  instructor,
  instructor_evento,
  organizador,
  organizador_evento,
  resultado,
  sesion,
}
