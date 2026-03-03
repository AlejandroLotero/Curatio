import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";

export default function ProductReportPage() {
  const navigate = useNavigate();

  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("todos");

  // Cargar medicamentos al montar
  useEffect(() => {
    const cargarMedicamentos = () => {
      try {
        const stored = localStorage.getItem("medicamentos");
        if (stored) {
          setMedicamentos(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error cargando medicamentos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarMedicamentos();
  }, []);

  // Filtrar medicamentos según estado
  const filteredMedicamentos = medicamentos.filter((m) => {
    if (filterStatus === "todos") return true;
    if (filterStatus === "activos") return m.status === "Activo";
    if (filterStatus === "inactivos") return m.status !== "Activo";
    if (filterStatus === "bajo-stock") return parseInt(m.stock) <= 5;
    return true;
  });

  // Calcular totales
  const total = filteredMedicamentos.length;
  const totalStock = filteredMedicamentos.reduce(
    (sum, m) => sum + (parseInt(m.stock) || 0),
    0
  );
  const totalValue = filteredMedicamentos.reduce(
    (sum, m) => sum + (parseFloat(m.salePrice) || 0) * (parseInt(m.stock) || 0),
    0
  );

  // Exportar a CSV
  const exportToCSV = () => {
    if (!filteredMedicamentos.length) {
      alert("No hay datos para exportar");
      return;
    }

    const headers = [
      "ID",
      "Nombre",
      "Forma",
      "Laboratorio",
      "Stock",
      "Precio Compra",
      "Precio Venta",
      "Estado",
    ];

    const rows = filteredMedicamentos.map((m) => [
      m.medicationId,
      m.medicationName,
      m.pharmaceuticalForm,
      m.laboratory,
      m.stock,
      m.purchasePrice,
      m.salePrice,
      m.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell || "-"}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reporte_medicamentos_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary-50)" }}
      >
        <p style={{ color: "var(--semantic-text-label)" }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "var(--color-primary-50)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ENCABEZADO */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/products")}
            className="p-2 rounded-lg hover:opacity-70 transition"
            style={{
              backgroundColor: "var(--color-gray-100)",
              color: "var(--semantic-text-primary)",
            }}
            title="Volver"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1
              className="text-4xl font-bold"
              style={{ color: "var(--semantic-text-primary)" }}
            >
              REPORTES
            </h1>
            <p style={{ color: "var(--semantic-text-label)" }}>
              Análisis y estadísticas de medicamentos
            </p>
          </div>
        </div>

        {/* FILTROS */}
        <div className="mb-6 flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            style={{
              borderColor: "var(--color-primary-300)",
              backgroundColor: "white",
            }}
          >
            <option value="todos">Todos los medicamentos</option>
            <option value="activos">Solo activos</option>
            <option value="inactivos">Solo inactivos</option>
            <option value="bajo-stock">Bajo stock (≤5)</option>
          </select>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            style={{
              backgroundColor: "var(--color-button-primary-bg)",
              color: "var(--semantic-text-button-primary)",
            }}
          >
            <Download size={18} />
            Descargar CSV
          </button>
        </div>

        {/* TARJETAS DE ESTADÍSTICAS */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total de Medicamentos"
            value={total}
            color="#767EDE"
          />
          <StatCard
            title="Stock Total"
            value={totalStock}
            color="#14AE5C"
          />
          <StatCard
            title="Valor en Inventario"
            value={`$${totalValue.toFixed(2)}`}
            color="#FFA500"
          />
        </div>

        {/* TABLA DE REPORTE */}
        {filteredMedicamentos.length === 0 ? (
          <div
            className="flex justify-center items-center h-64 rounded-lg"
            style={{
              backgroundColor: "var(--color-primary-50)",
              border: "2px dashed var(--color-primary-300)",
            }}
          >
            <p style={{ color: "var(--semantic-text-label)" }}>
              No hay datos para mostrar
            </p>
          </div>
        ) : (
          <div
            className="overflow-x-auto rounded-lg border"
            style={{ borderColor: "var(--color-primary-300)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--color-primary-100)" }}>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    ID
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    Nombre
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    Laboratorio
                  </th>
                  <th
                    className="px-6 py-3 text-right text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    Stock
                  </th>
                  <th
                    className="px-6 py-3 text-right text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    Precio Unit.
                  </th>
                  <th
                    className="px-6 py-3 text-right text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    Valor Total
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-semibold"
                    style={{ color: "var(--semantic-text-label)" }}
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicamentos.map((medicamento, index) => {
                  const valor =
                    (parseFloat(medicamento.salePrice) || 0) *
                    (parseInt(medicamento.stock) || 0);
                  return (
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
                        style={{ color: "var(--semantic-text-primary)" }}
                      >
                        {medicamento.medicationId}
                      </td>
                      <td
                        className="px-6 py-4 text-sm font-medium"
                        style={{ color: "var(--semantic-text-primary)" }}
                      >
                        {medicamento.medicationName}
                      </td>
                      <td
                        className="px-6 py-4 text-sm"
                        style={{ color: "var(--semantic-text-secondary)" }}
                      >
                        {medicamento.laboratory || "-"}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-right font-semibold"
                        style={{ color: "var(--semantic-text-primary)" }}
                      >
                        {medicamento.stock}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-right"
                        style={{ color: "var(--semantic-text-secondary)" }}
                      >
                        ${medicamento.salePrice || "0.00"}
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-right font-semibold"
                        style={{ color: "var(--color-primary-500)" }}
                      >
                        ${valor.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor:
                              medicamento.status === "Activo"
                                ? "#14AE5C"
                                : "#FF4444",
                            color: "white",
                          }}
                        >
                          {medicamento.status || "-"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para tarjeta de estadística
function StatCard({ title, value, color }) {
  return (
    <div
      className="rounded-lg p-6"
      style={{
        backgroundColor: "white",
        border: `2px solid ${color}`,
      }}
    >
      <p
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--semantic-text-label)" }}
      >
        {title}
      </p>
      <p
        className="text-3xl font-bold"
        style={{ color }}
      >
        {value}
      </p>
    </div>
  );
}
