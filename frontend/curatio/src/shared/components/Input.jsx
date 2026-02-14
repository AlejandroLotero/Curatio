//Creacion de componente input

export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="w-[320px]">
      {/*label */}
      {label && (
        <label
          className="block text-[8px]
                              mb-1
                              text-gray-600"
        >
          {label}
        </label>
      )}

      {/*Contenerdor del input */}

      <div
      
      className="
      relative
      h-12
      flex
      items-center
      "
      
      >




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

        {/* Input visual*/}

        <input
          type={type}
          className="
          relative
          w-full
          h-10
          rounded-md
          border
          border-black
          px-4
          text-base

          focus:outline-none
          focus:ring-1

          focus:ring-green-800
          focus:border-green-800
          
          "
          {...props}
        />
      </div>
    </div>
  );
}
