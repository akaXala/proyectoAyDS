export const expresiones: Record<string, RegExp> = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    apellidoPaterno: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    apellidoMaterno: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@(gmail\.com|hotmail\.com|yahoo\.com|yahoo\.com\.mx|outlook\.com|alumno\.ipn\.mx)$/,
    telefono: /^\d{10}$/,
    contrasena: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/, // Nueva validación
  };
  
  export const mensajesError: Record<string, string> = {
    nombre: "El nombre solo puede contener letras y espacios.",
    apellidoPaterno: "El apellido paterno solo puede contener letras y espacios.",
    apellidoMaterno: "El apellido materno solo puede contener letras y espacios.",
    email: "El correo debe ser de un dominio válido (gmail.com, hotmail.com, etc.).",
    telefono: "El teléfono debe contener 10 dígitos.",
    contrasena: "La contraseña debe tener entre 8 y 26 caracteres, incluyendo al menos una letra minúscula, una mayúscula, un número y un símbolo especial.",
  };
  