import { useState } from "react";

// Componente select para cambiar el estado de un medicamento con manejo de loading
export default function MedicationStatusSelect({
  value = "",
  options = [],
  onChange,
  disabled = false,
}) {
  // Estado para controlar si se está guardando el cambio en el servidor
  const [isSaving, setIsSaving] = useState(false);

  // Maneja el cambio de valor y ejecuta el callback con manejo de errores
  const handleChange = async (e) => {
    const nextValue = e.target.value;

    try {
      setIsSaving(true);
      await onChange?.(nextValue);
    } catch (error) {
      console.error("Error updating medication status:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // Select para seleccionar el estado del medicamento con deshabilitacion durante guardado
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled || isSaving}
      className="
        min-w-[140px]
        rounded-md
        border
        border-border-strong
        bg-white/80
        px-2
        py-1
        text-black
        text-sm
        focus:outline-none
        focus:ring-1
        focus:ring-border
        disabled:opacity-60
      "
    >
      {/* Opcion placeholder deshabilitada */}
      <option value="" disabled>
        Estado
      </option>
      {/* Renderiza las opciones recibidas como props */}
      {options.map((option) => (
        <option key={option.id} value={String(option.id)}>
          {option.label}
        </option>
      ))}
    </select>
  );
}