import { useState } from "react";
import Modal from "@/shared/components/Modal";

// Componente para cargar imagenes de productos con preview y simulacion de backend
export default function FileInput({
  label = "Subir archivo",
  accept = "image/*",
  onUpload,
}) {
  // Estados para manejar el archivo, preview, loading y modal de exito
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Maneja la seleccion del archivo y genera preview si es imagen
  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    }
  };

  // Simula la carga del archivo al servidor y muestra modal de exito
  const handleUpload = async () => {
    setLoading(true);

    // Simulacion de llamada al backend
    setTimeout(() => {
      const url = `https://cdn.miapp.com/${Date.now()}-${file.name}`;
      setLoading(false);
      onUpload(url);
      
      // Muestra modal de exito por 2 segundos
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="space-y-3">
      {/* Estilos personalizados para el input de archivo */}
      <style>{`
        .product-file::-webkit-file-upload-button {
          background-color: var(--color-primarybtnbg);
          color: var(--color-primarybtntext);
          border: 1px solid var(--color-border-strong);
          padding: 8px 16px;
          margin-right: 16px;
          border-radius: 16px;
          font-weight: 500;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .product-file::-webkit-file-upload-button:hover {
          background-color: var(--color-primarybtnhoverbg);
        }
        .product-file::file-selector-button {
          background-color: var(--color-primarybtnbg);
          color: var(--color-primarybtntext);
          border: 1px solid var(--color-border-strong);
          padding: 8px 16px;
          margin-right: 16px;
          border-radius: 16px;
          font-weight: 500;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .product-file::file-selector-button:hover {
          background-color: var(--color-secondarybtnhoverbg);
        }
      `}</style>
      
      {/* Etiqueta del campo */}
      <label
        className="block text-lg font-medium text-label"
        style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </label>

      {/* Contenedor con preview de imagen e input */}
      <div className="flex gap-6 items-start">
        {/* Preview de imagen seleccionada */}
        {preview && (
          <img src={preview} className="h-32 w-32 rounded-lg object-cover flex-shrink-0" />
        )}
        
        {/* Contenedor del input y boton de envio */}
        <div className="space-y-3 flex-1">
          <div className="flex gap-2 border border-black rounded-lg p-2">
            {/* Input para seleccionar archivo */}
            <input
              type="file"
              accept={accept}
              onChange={handleChange}
              className="block flex-1 text-sm product-file"
              style={{ color: "var(--semantic-text-label)" }}
            />

            {/* Boton para subir el archivo */}
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="px-4 py-2 font-medium transition-colors disabled:opacity-50 border border-border-strong flex-shrink-0"
              style={{
                backgroundColor: "var(--color-secondarybtnbg)",
                color: "var(--color-secondarybtntext)",
                fontFamily: "var(--font-body)",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "var(--color-secondarybtnhoverbg)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "var(--color-secondarybtnbg)"}
            >
              {loading ? "Subiendo..." : "Subir"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmacion de carga exitosa */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Éxito!"
        message="Imagen subida exitosamente"
      />
    </div>
  );
}