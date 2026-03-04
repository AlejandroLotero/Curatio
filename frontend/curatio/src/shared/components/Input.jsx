//Creacion de componente input
//Modificacion del classname del label para que tome el 
// color de texto definido en el diseño (text-label) de 
// global.css

export default function Input({ label, type = "text", className, ...props }) {
  return (
    <div className="w-[320px]">
      {/* label */}
      {label && (
        <label
          className="block
                              mb-1
                              text-label
                              font-body
                              font-heading
                              text-mostsmall
                              "
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
          type={type}
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
          placeholder:text-label
          placeholder:text-small
          placeholder:font-body
          placeholder:font-heading
          focus:outline-none
          focus:ring-1
          focus:ring-border
          focus:border-border
          ${className ?? ""}
          `}
          {...props}
        />
      </div>
    </div>
  );
}