//Creacion de componente input
//Componente Input actualizado con variables semánticas

export default function Input({ label, type = "text", className, ...props }) {
  return (
    <div className="w-[320px]">
      {/* label */}
      {label && (
        <label
          className="block mb-1 text-sm font-semibold"
          style={{
            color: "var(--semantic-text-label)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </label>
      )}

      {/* Contenedor del input */}
      <div className="relative h-12 flex items-center">
        {/* Area interactiva invisible (48px) */}
        <div
          className="absolute inset-0"
          onMouseDown={(e) => {
            e.preventDefault();
            e.currentTarget.nextSibling.focus();
          }}
        />

        {/* Input visual */}
        <input
          type={type}
          className={`
            relative
            w-full
            h-10
            rounded-lg
            border
            px-4
            focus:outline-none
            focus:ring-2
            ${className ?? ""}
          `}
          style={{
            borderColor: "var(--color-primary-300)",
            color: "var(--semantic-text-primary)",
            fontFamily: "var(--font-body)",
            backgroundColor: "white",
          }}
          {...props}
        />
      </div>
    </div>
  );
}