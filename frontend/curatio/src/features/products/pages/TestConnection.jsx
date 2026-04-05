import { useState, useEffect } from "react";
import { fetchProducts } from "@/features/products/services/productService";

export function TestConnection() {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setStatus("loading");
    setError(null);
    setData(null);

    try {
      const result = await fetchProducts({ page: 1, pageSize: 5 });
      setData(result);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">🔌 Prueba de Conexión Backend</h2>

      <button
        onClick={testConnection}
        disabled={status === "loading"}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {status === "loading" ? "Conectando..." : "Probar Conexión"}
      </button>

      {status === "success" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-700 font-semibold">✅ Conexión exitosa</p>
          <pre className="mt-2 bg-white p-2 rounded text-xs overflow-auto max-h-64">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 font-semibold">❌ Error en la conexión</p>
          <pre className="mt-2 bg-white p-2 rounded text-xs overflow-auto max-h-64">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
