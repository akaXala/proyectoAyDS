import Swal, { SweetAlertIcon } from "sweetalert2";

// Función reutilizable para mostrar un modal de confirmación
export async function ConfirmAlert(
  titulo: string, // Título del modal
  texto: string, // Texto adicional del modal
  textoBotonConfirmar?: string, // Texto opcional para el botón de confirmar
  textoBotonCancelar?: string, // Texto opcional para el botón de cancelar
  icono?: SweetAlertIcon // Icono opcional ('success', 'error', 'warning', 'info', 'question')
): Promise<boolean> {
  const result = await Swal.fire({
    title: titulo,
    text: texto,
    icon: icono || "warning", // Icono predeterminado: "warning"
    showCancelButton: true,
    confirmButtonColor: "#3085d6", // Color del botón de confirmar
    cancelButtonColor: "#d33", // Color del botón de cancelar
    confirmButtonText: textoBotonConfirmar || "Sí, confirmar", // Texto predeterminado
    cancelButtonText: textoBotonCancelar || "Cancelar", // Texto predeterminado
  });

  return result.isConfirmed; // Devuelve true si el usuario confirma, false si cancela.
}
