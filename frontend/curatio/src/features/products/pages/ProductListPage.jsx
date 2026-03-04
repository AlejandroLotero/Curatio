import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Trash2, Edit2, Eye, Check, X } from "lucide-react";
import Toast from "../../../shared/components/Toast";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";

export default function ProductListPage() {
  const navigate = useNavigate();

  const [medicamentos, setMedicamentos] = useState([]);
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Cargar medicamentos al montar
  useEffect(() => {
    cargarMedicamentos();
  }, []);

  // Filtrar medicamentos cuando cambia el búsqueda
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = medicamentos.filter(
        (m) =>
          m.medicationId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.medicationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.laboratory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.pharmaceuticalForm?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicamentos(filtered);
    } else {
      setFilteredMedicamentos(medicamentos);
    }
  }, [searchTerm, medicamentos]);

  const cargarMedicamentos = () => {
    try {
      const stored = localStorage.getItem("medicamentos");
      if (stored) {
        const meds = JSON.parse(stored);
        setMedicamentos(meds);
        setFilteredMedicamentos(meds);
      } else {
        setMedicamentos([]);
        setFilteredMedicamentos([]);
      }
    } catch (error) {
      console.error("Error cargando medicamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (medicamento) => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar "${medicamento.medicationName}"?`
      )
    ) {
      try {
        const updated = medicamentos.filter((m) => m.id !== medicamento.id);
        localStorage.setItem("medicamentos", JSON.stringify(updated));
        setMedicamentos(updated);
        setToastMessage("Medicamento eliminado exitosamente");
        setShowToast(true);
      } catch (error) {
        console.error("Error eliminando medicamento:", error);
        setToastMessage("Error al eliminar el medicamento");
        setShowToast(true);
      }
    }
  };

  const getStockColor = (stock) => {
    const stockNum = parseInt(stock) || 0;
    if (stockNum > 10) return "var(--color-button-primary-bg)"; // Verde
    if (stockNum > 5) return "#FFA500"; // Naranja
    return "#FF4444"; // Rojo
  };

  const getStatusColor = (status) => {
    return status === "Activo" ? "#14AE5C" : "#FF4444";
  };

  return (
    <div
      className="min-h-screen p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-900 dark:to-neutral-800"
    >
      <div className="max-w-6xl mx-auto p-8 rounded-3xl shadow-xl ring-1 ring-primary-200 dark:ring-neutral-700 bg-white dark:bg-neutral-900">
        {/* ENCABEZADO */}
        <div className="mb-8">
          <h1
            className="text-subtittles font-bold mb-2"
            style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
          >
            MEDICAMENTOS
          </h1>
          <p style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
            Gestión y control de medicamentos
          </p>
        </div>

        {/* BARRA DE HERRAMIENTAS */}
        <div className="flex gap-4 mb-6 flex-wrap items-center">
          {/* Buscador */}
          <div className="relative flex-1 min-w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, ID, laboratorio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-600"
              style={{
                borderColor: "var(--color-primary-300)", fontFamily: "var(--font-body)",
                backgroundColor: "white",
              }}
            />
          </div>

          {/* Botón Crear */}
          <button
            onClick={() => navigate("/products/create")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap"
            style={{
              backgroundColor: "var(--color-secondary-700)",
              color: "white", fontFamily: "var(--font-body)",
            }}
          >
            <Plus size={20} />
            Crear Medicamento
          </button>

          {/* Botón Reportes */}
          <button
            onClick={() => navigate("/products/reports")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap"
            style={{
              backgroundColor: "var(--color-gray-800)",
              color: "var(--color-black)", fontFamily: "var(--font-body)",
            }}
          >
            📊 Reportes
          </button>
        </div>

        {/* INFO */}
        <div
          className="mb-6 p-4 rounded-lg"
          style={{
            backgroundColor: "var(--color-primary-100)",
            borderLeft: "4px solid var(--color-primary-500)",
          }}
        >
          <p style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
            Total de medicamentos:{" "}
            <strong>{filteredMedicamentos.length}</strong>
          </p>
        </div>

        {/* TABLA */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>Cargando...</p>
          </div>
        ) : filteredMedicamentos.length === 0 ? (
          <div
            className="flex justify-center items-center h-64 rounded-lg"
            style={{
              backgroundColor: "var(--color-primary-50)",
              border: "2px dashed var(--color-primary-300)",
            }}
          >
            <p style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
              {searchTerm
                ? "No se encontraron medicamentos"
                : "No hay medicamentos registrados aún"}
            </p>
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-lg border"
            style={{ borderColor: "var(--color-primary-300)", fontFamily: "var(--font-body)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--color-primary-100)" }}>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    ID
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    Nombre
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    Forma
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    Laboratorio
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    Stock
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    Estado
                  </th>
                  <th
                    className="px-6 py-3 text-center text-sm font-semibold"
                    style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicamentos.map((medicamento, index) => (
                  <tr
                    key={medicamento.id}
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? "transparent"
                          : "var(--color-primary-50)",
                      borderBottom: "1px solid var(--color-primary-200)",
                    }}
                  >
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                    >
                      {medicamento.medicationId}
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-medium"
                      style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                    >
                      {medicamento.medicationName}
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                    >
                      {medicamento.pharmaceuticalForm || "-"}
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
                    >
                      {medicamento.laboratory || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: getStockColor(medicamento.stock),
                          color: "white",
                          fontFamily: "var(--font-body)"
                        }}
                      >
                        {medicamento.stock || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition"
                        style={{
                          backgroundColor: (medicamento.status === "Activo" || !medicamento.status) ? "var(--color-secondary-700)" : "var(--color-gray-800)",
                          color: (medicamento.status === "Activo" || !medicamento.status) ? "white" : "var(--color-black)",
                          border: `none`,
                          fontFamily: "var(--font-body)"
                        }}
                      >
                        {(medicamento.status === "Activo" || !medicamento.status) ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <X size={14} strokeWidth={3} />
                        )}
                        {medicamento.status || "Activo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() =>
                            navigate(`/products/${medicamento.id}`)
                          }
                          className="p-2 rounded-lg hover:opacity-70 transition"
                          title="Ver detalles"
                          style={{
                            backgroundColor: "rgba(176, 191, 241, 0.2)",
                            color: "var(--color-primary-300)",
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/products/${medicamento.id}/edit`)
                          }
                          className="p-2 rounded-lg hover:opacity-70 transition"
                          title="Editar"
                          style={{
                            backgroundColor: "rgba(176, 191, 241, 0.2)",
                            color: "var(--color-primary-300)",
                          }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(medicamento)}
                          className="p-2 rounded-lg hover:opacity-70 transition"
                          title="Eliminar"
                          style={{
                            backgroundColor: "rgba(255, 68, 68, 0.2)",
                            color: "#FF4444",
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Toast
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}



