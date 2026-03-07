import { useState } from "react";


export default function FileInput({
  label = "Subir archivo",
  accept = "image/*",
  onUpload,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
    }, 1200);
  };

  return (
    <div className="space-y-3">
      <label
        className="block text-sm font-medium text-gray-600"
      >
        {label}
      </label>

      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="block w-full text-sm text-gray-600 
          file:mr-4 file:rounded-lg file:border-0 
          file:bg-indigo-600 file:px-4 file:py-2 
          file:text-white"
      />

      {preview && (
        <img src={preview} className="h-32 w-32 rounded-full object-cover" />
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white 
          disabled:opacity-50 hover:bg-indigo-800"
      >
        {loading ? "Subiendo..." : "Subir"}
      </button>
    </div>
  );
}
