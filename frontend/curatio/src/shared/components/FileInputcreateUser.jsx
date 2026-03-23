// //Importacion de useState y useRef para manejar el estado y la referencia del input de tipo file
// //La referencia es para poder manipular el input de tipo file
// import { useState, useRef } from "react";


// export default function FileInput({
//   label = "Subir archivo",
//   accept = "image/*",
//   onUpload,
//   /*Se agregan prodiedades que habilitan la imagen por defecto y el tamaño de la preview*/
//   defaultImage = null,
//   previewSize = 128,
// }) {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;

//     setFile(f);
//     if (f.type.startsWith("image/")) {
//       setPreview(URL.createObjectURL(f));
//     }
//   };

//   const handleUpload = async () => {
//     setLoading(true);

//     // 🔹 Simulación backend
//     setTimeout(() => {
//       const url = `https://cdn.miapp.com/${Date.now()}-${file.name}`;
//       setLoading(false);
//       //Se llama a la funcion onUpload para que se guarde la imagen en la base de datos
//       onUpload?.(url);
//     }, 1200);
//   };
// //Se muestra la imagen de la preview o la imagen por defecto
//   const showPreview = preview ?? defaultImage;
//   //Se define el tamaño de la preview
//   const sizeStyle = { width: `${previewSize}px`, height: `${previewSize}px` };

//   return (
//     //Contenedor del file input y la preview centrada
//     <div className="space-y-3 flex flex-col items-center w-full gap-4">
//       <label
//       //Se ajusta el label para que se vea centrado
//         className="block text-mostsmall font-body font-heading text-label w-full text-center"
//       >
//         {label}
//       </label>


//       {/* Input oculto + botón "Elegir archivo" y mensaje debajo */}
//       <div className="flex flex-col items-center w-full gap-6">
//         <input
//           ref={inputRef}
//           type="file"
//           accept={accept}
//           onChange={handleChange}
//           className="sr-only" //Se oculta el input de tipo file
//           id="file-input-profile" //Se le asigna un id al input de tipo file
//           aria-describedby="file-status" //Se le asigna un id al p que muestra el nombre del archivo
//         />

//         <button
//           type="button" //Se le asigna un tipo button al boton
//           onClick={() => inputRef.current?.click()} //Se llama a la funcion handleChange para que se muestre el input de tipo file
//           className="relative inline-flex items-center justify-center rounded-4xl transition-colors cursor-pointer border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label hover:border-1 h-9 px-4 py-2"
//         >
//           Elegir archivo
//         </button>
       
//       </div>

//       {/* //Se muestra la imagen de la preview o la imagen por defecto se ajusta rounded para que se vea mas cuadrado*/}
//       {showPreview && (
//         <img
//           src={showPreview}
//           alt="Vista previa"
//           className="rounded-xl object-cover"
//           style={sizeStyle}
//         />
//       )}

//       <button
//       //Se muestra el boton de subir con los estilos de los botones
//         type="button"
//         onClick={handleUpload}
//         disabled={!file || loading}
//         //Se ajusta el boton de subir con los estilos de los botones
//         className="relative inline-flex items-center justify-center rounded-4xl transition-colors cursor-pointer border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label hover:border-1 h-9 px-3 disabled:opacity-50 before:absolute before:content-[''] before:-inset-y-[7px] before:-inset-x-[2px]"
//       >
//         {loading ? "Subiendo..." : "Subir"}
//       </button>
//     </div>
//   );
// }

// Hooks de React para estado y referencia del input file
import { useRef, useState } from "react";

/**
 * FileInputcreateUser
 * -------------------
 * Input real de archivo para foto de usuario.
 *
 * Responsabilidades:
 * - Permitir seleccionar una imagen real
 * - Mostrar preview local
 * - Entregar el objeto File al componente padre
 *
 * Importante:
 * - Ya NO simula una subida
 * - La subida real ocurre cuando se envía el wizard completo
 */
export default function FileInput({
  label = "Subir archivo",
  accept = "image/*",
  onFileChange,
  defaultImage = null,
  previewSize = 128,
}) {
  // Archivo real seleccionado
  const [preview, setPreview] = useState(null);

  // Referencia al input oculto
  const inputRef = useRef(null);

  /**
   * Maneja selección de archivo real.
   */
  const handleChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    // Genera preview local si es imagen
    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }

    // Entrega el File real al padre
    onFileChange?.(file);
  };

  // Imagen mostrada: preview local o imagen por defecto
  const visibleImage = preview ?? defaultImage;

  // Tamaño del preview
  const sizeStyle = {
    width: `${previewSize}px`,
    height: `${previewSize}px`,
  };

  return (
    <div className="space-y-3 flex flex-col items-center w-full gap-4">
      {/* Label */}
      <label className="block text-mostsmall font-body font-heading text-label w-full text-center">
        {label}
      </label>

      {/* Input real oculto */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
      />

      {/* Botón visual para abrir selector */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          relative inline-flex items-center justify-center
          rounded-4xl transition-colors cursor-pointer
          border border-border-strong
          bg-primarybtnbg text-primarybtntext
          font-body font-heading text-small
          hover:bg-primarybtnhoverbg hover:text-label hover:border-1
          h-9 px-4 py-2
        "
      >
        Elegir archivo
      </button>

      {/* Preview */}
      {visibleImage && (
        <img
          src={visibleImage}
          alt="Vista previa"
          className="rounded-xl object-cover"
          style={sizeStyle}
        />
      )}
    </div>
  );
}