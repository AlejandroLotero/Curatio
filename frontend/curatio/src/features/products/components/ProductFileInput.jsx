import { useState } from "react";
import Modal from "@/shared/components/Modal";


export default function FileInput({
  label = "Subir archivo",
  accept = "image/*",
  onUpload,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    // 🔹 Simulación backend
    setTimeout(() => {
      const url = `https://cdn.miapp.com/${Date.now()}-${file.name}`;
      setLoading(false);
      onUpload(url);
      
      // Mostrar modal de éxito
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    }, 1200);
  };

  return (
    <div className="space-y-3">
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
      
      <label
        className="block text-lg font-medium text-label"
        style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </label>

      <div className="flex gap-6 items-start">
        {preview && (
          <img src={preview} className="h-32 w-32 rounded-lg object-cover flex-shrink-0" />
        )}
        
        <div className="space-y-3 flex-1">
          <div className="flex gap-2 border border-black rounded-lg p-2">
            <input
              type="file"
              accept={accept}
              onChange={handleChange}
              className="block flex-1 text-sm product-file"
              style={{ color: "var(--semantic-text-label)" }}
            />

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

      {/* Modal de éxito */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Éxito!"
        message="Imagen subida exitosamente"
      />
    </div>
  );
}