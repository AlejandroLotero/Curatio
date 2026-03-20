//Creacion de componente input
//Modificacion del classname del label para que tome el 
// color de texto definido en el diseño (text-label) de 
// global.css

import { Eye, EyeClosed } from "lucide-react";
//wrapperClassName: para agregar clases al contenedor del input
export default function Input({ label, type = "text", error, className, wrapperClassName, showPassword, onTogglePassword, ...props }) {
  return (
    <div className={wrapperClassName ?? "w-[320px]"}>
      {/* label */}
      {label && (
        <label
          className={`        block
                              mb-1
                              text-label
                              font-body
                              font-heading
                              text-mostsmall
                              ${error ? "text-red-600" : "text-label"}`}

                              
        >
          {label}
        </label>
      )}

      {/* Contenedor del input */}
      <div
      className="
      relative
      h-12
      flex
      items-center
      " >

        {/* Area interactiva invisible (48px) */}
        <div
          className="
            absolute
            inset-0
          "
          onMouseDown = {(e) => {
          e.preventDefault();
          e.currentTarget.nextSibling.focus();
        
        }}
      
        />

        {/* Input visual */}
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`
          relative
          w-full
          h-10
          rounded-md
          border
          border-border-strong
          px-4
          text-label
          font-body
          font-heading
          text-small
          placeholder:text-placeholder
          placeholder:text-small
          placeholder:font-body
          placeholder:font-heading
          focus:outline-none
          focus:ring-1
          focus:ring-border
          focus:border-border
          hover:bg-surface/50
          cursor-pointer
          ${type === "password" && onTogglePassword ? "pr-12" : ""}
          ${className ?? ""}
          ${error ? "text-red-600" : "border-border-strong"}
          `}
          {...props}
        />

        {/* Eye / EyeClosed para type="password" */}
        {type === "password" && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-transparent text-placeholder transition hover:text-label focus:outline-none"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeClosed className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
          </button>
        )}
      </div>
      {error && <p className="text-mostsmall text-red-600 mt-1">{error}</p>}
    </div>
  );
}