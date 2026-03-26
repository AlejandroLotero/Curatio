// Componente reutilizable de tipo Checkbox controlado
export default function Checkbox({
  id,            // Identificador único del input (necesario para accesibilidad)
  name,          // Nombre del campo (útil para formularios)
  label,         // Texto visible asociado al checkbox
  checked = false, // Estado controlado del checkbox (true/false)
  onChange,      // Función que maneja el cambio de estado
  disabled = false, // Indica si el checkbox está deshabilitado
  className = "",   // Clases adicionales para personalización
}) {
  return (
    // Label envolvente para mejorar la accesibilidad y permitir clic en todo el bloque
    <label
      htmlFor={id} // Vincula el label con el input mediante el id
      className={`
        flex items-center gap-2 text-sm cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}
      `}
    >
      {/* Input checkbox controlado */}
      <input
        id={id}             // Debe coincidir con htmlFor del label
        name={name}         // Nombre del campo
        type="checkbox"     // Tipo de input
        checked={checked}   // Valor controlado desde el estado externo
        disabled={disabled} // Deshabilita la interacción si es true
        onChange={onChange} // Evento de cambio
        className="accent-primary w-4 h-4" // Estilos (Tailwind)
      />


      {/* Texto del checkbox */}
      <span>{label}</span>
    </label>
  );
}
