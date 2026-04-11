import { useEffect, useState } from "react";

/**
 * ProductFileInput
 * ----------------
 * 
 *
 * Responsabilidades:
 * - permitir seleccionar una imagen real
 * - mostrar preview local
 * - devolver el objeto File real al componente padre
 *
 * Importante:
 * - la subida real ocurre cuando se envía el formulario completo
 */
export default function ProductFileInput({
  label = "Subir archivo",
  accept = "image/*",
  onUpload,
  defaultImage = null,
}) {
  /**
   * Archivo real seleccionado.
   */
  const [file, setFile] = useState(null);

  /**
   * URL local para preview.
   */
  const [preview, setPreview] = useState(defaultImage);

  /**
   * Libera la URL temporal cuando cambia o desmonta.
   */
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /**
   * Maneja selección real del archivo.
   */
  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0] ?? null;

    if (!selectedFile) {
      setFile(null);
      setPreview(defaultImage);
      onUpload?.(null);
      return;
    }

    setFile(selectedFile);

    /**
     * Preview local solo si es imagen.
     */
    if (selectedFile.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      setPreview(defaultImage);
    }

    /**
     * Entrega el File real al padre.
     */
    onUpload?.(selectedFile);
  };

  return (
    <div className="space-y-3">
      <style>{`
        /* Estilos del botón file input: navegadores webkit */
        .product-file::-webkit-file-upload-button {
          background-color: var(--color-primarybtnbg);
          color: var(--color-primarybtntext);
          border: 1px solid var(--color-border-strong);
          padding: 6px 12px;
          margin-right: 8px;
          border-radius: 16px;
          font-weight: 500;
          font-size: 0.875rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background-color 0.3s;
          white-space: nowrap;
        }

        .product-file::-webkit-file-upload-button:hover {
          background-color: var(--color-primarybtnhoverbg);
        }

        /* Estilos del botón file input: navegadores Firefox */
        .product-file::file-selector-button {
          background-color: var(--color-primarybtnbg);
          color: var(--color-primarybtntext);
          border: 1px solid var(--color-border-strong);
          padding: 6px 12px;
          margin-right: 8px;
          border-radius: 16px;
          font-weight: 500;
          font-size: 0.875rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background-color 0.3s;
          white-space: nowrap;
        }

        .product-file::file-selector-button:hover {
          background-color: var(--color-secondarybtnhoverbg);
        }

        /* En celulares (< 640px), ajustar tamaño del botón */
        @media (max-width: 640px) {
          .product-file::-webkit-file-upload-button {
            padding: 5px 10px;
            margin-right: 6px;
            font-size: 0.75rem;
          }

          .product-file::file-selector-button {
            padding: 5px 10px;
            margin-right: 6px;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <label
        className="block text-base sm:text-lg font-medium text-label"
        style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </label>

      {/* Contenedor responsive: columna en móvil, fila en tablets+ */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-start">
        {/* Imagen preview: 96x96 móvil, 128x128 en tablets+ */}
        {preview ? (
          <img
            src={preview}
            alt="Vista previa del medicamento"
            className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg object-cover flex-shrink-0 border border-border-strong"
          />
        ) : (
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg border border-dashed border-border-strong flex items-center justify-center text-xs sm:text-sm text-gray-500 flex-shrink-0">
            Sin imagen
          </div>
        )}

        <div className="space-y-3 flex-1 w-full">
          <div className="flex gap-2 border border-black rounded-lg p-2">
            <input
              type="file"
              accept={accept}
              onChange={handleChange}
              className="block flex-1 text-xs sm:text-sm product-file overflow-hidden"
              style={{ color: "var(--semantic-text-label)" }}
            />
          </div>

          {/* Texto adaptable: xs en móvil, sm en tablets+ */}
          <p className="text-xs sm:text-sm text-gray-600 break-words">
            {file
              ? `Archivo: ${file.name}`
              : "Selecciona una imagen para el medicamento."}
          </p>
        </div>
      </div>
    </div>
  );
}