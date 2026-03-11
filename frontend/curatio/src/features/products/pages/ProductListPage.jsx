import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Trash2, Edit2, Eye, Check, X } from "lucide-react";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import bgAll from "@/assets/images/bgAll.jpg";
import formasFarmaceuticas from "@/data/selects/formasFarmaceuticas.json";
import laboratorios from "@/data/selects/laboratorios.json";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";

export default function ProductListPage() {
  const navigate = useNavigate();

  // Mappers para convertir IDs a labels
  const getFormaLabel = (id) => {
    if (!id) return "-";
    const forma = formasFarmaceuticas.find((f) => f.id === Number(id));
    return forma ? forma.label : "-";
  };

  const getLaboratorioLabel = (id) => {
    if (!id) return "-";
    const lab = laboratorios.find((l) => l.id === Number(id));
    return lab ? lab.label : "-";
  };

  const [medicamentos, setMedicamentos] = useState([]);
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [medicamentoToDelete, setMedicamentoToDelete] = useState(null);

  // Cargar medicamentos al montar
  useEffect(() => {
    cargarMedicamentos();
  }, []);

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
    setMedicamentoToDelete(medicamento);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (medicamentoToDelete) {
      try {
        const updated = medicamentos.filter((m) => m.id != medicamentoToDelete.id);
        localStorage.setItem("medicamentos", JSON.stringify(updated));
        setMedicamentos(updated);
        setFilteredMedicamentos(updated);
        setIsDeleteModalOpen(false);
        setMedicamentoToDelete(null);
      } catch (error) {
        console.error("Error eliminando medicamento:", error);
      }
    }
  };

  const getStockColor = (stock) => {
    const stockNum = parseInt(stock) || 0;
    if (stockNum > 10) return "#14AE5C"; // Verde
    if (stockNum > 5) return "#FFA500"; // Naranja
    return "#FF4444"; // Rojo
  };

  const getStatusColor = (status) => {
    return status === "Activo" ? "#14AE5C" : "#FF4444";
  };

  return (
    <div className="relative min-h-screen w-full" style={{
      backgroundImage: `url(${bgAll})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="absolute inset-0 bg-white/20"></div>
      <div className="relative flex items-center justify-start min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto p-8 rounded-3xl shadow-xl ring-1 bg-white/70 dark:bg-neutral-900/20" style={{ borderColor: "var(--color-primary-200)" }}>
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
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 placeholder:text-gray-600 transition cursor-text"
              style={{
                borderColor: "var(--color-primary-300)",
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--color-primary-50)",
                caretColor: focused ? "var(--color-black)" : "transparent",
                color: "var(--color-black)",
              }}
            />
          </div>

          {/* Botón Crear */}
          <button
            onClick={() => navigate("/products/create")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap border-2"
            style={{
              backgroundColor: "var(--color-primarybtnbg)",
              color: "var(--color-primarybtntext)",
              borderColor: "var(--color-border-strong)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Plus size={20} />
            Crear Medicamento
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
                {filteredMedicamentos.length === 0 ? (
                  <tr style={{ backgroundColor: "transparent", borderBottom: "1px solid var(--color-primary-200)" }}>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>-</td>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>-</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>-</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>-</td>
                    <td className="px-6 py-4 text-sm"><span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}>-</span></td>
                    <td className="px-6 py-4 text-sm"><span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}>-</span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button disabled className="p-2 rounded-lg opacity-40" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}><Eye size={16} /></button>
                        {/* <button disabled className="p-2 rounded-lg opacity-40" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}><Edit2 size={16} /></button>
                        <button disabled className="p-2 rounded-lg opacity-40" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}><Trash2 size={16} /></button> */}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMedicamentos.map((medicamento, index) => {
                    return (
                      <tr
                        key={medicamento.id}
                        style={{
                          backgroundColor: index % 2 === 0 ? "transparent" : "var(--color-primary-50)",
                          borderBottom: "1px solid var(--color-primary-200)",
                        }}
                      >
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
                          {medicamento.visualId}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
                          {medicamento.nombre}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
                          {getFormaLabel(medicamento.formaFarmaceutica)}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
                          {getLaboratorioLabel(medicamento.laboratorio)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: getStockColor(medicamento.stock), color: "white", fontFamily: "var(--font-body)" }}>
                            {medicamento.stock || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition" style={{ backgroundColor: (medicamento.estado === "Activo" || !medicamento.estado) ? "var(--color-button-primary-bg)" : "var(--color-gray-800)", color: (medicamento.estado === "Activo" || !medicamento.estado) ? "black" : "var(--color-black)", border: `none`, fontFamily: "var(--font-body)" }}>
                            {(medicamento.estado === "Activo" || !medicamento.estado) ? (
                              <Check size={14} strokeWidth={3} />
                            ) : (
                              <X size={14} strokeWidth={3} />
                            )}
                            {medicamento.estado || "Activo"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => navigate(`/products/${medicamento.id}`)} className="p-2 rounded-lg hover:opacity-70 transition" title="Ver detalles" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}>
                              <Eye size={16} />
                            </button>
                            {/* <button onClick={() => navigate(`/products/${medicamento.id}/edit`)} className="p-2 rounded-lg hover:opacity-70 transition" title="Editar" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(medicamento)} className="p-2 rounded-lg hover:opacity-70 transition" title="Eliminar" style={{ backgroundColor: "transparent", color: "var(--color-black)" }}>
                              <Trash2 size={16} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setMedicamentoToDelete(null);
          }}
          title="Confirmar eliminación"
          message={`¿Estás seguro de eliminar "${medicamentoToDelete?.nombre}"?`}
        >
          <div className="flex gap-4 justify-center">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setMedicamentoToDelete(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={confirmDelete}
            >
              Eliminar
            </Button>
          </div>
        </Modal>
      </div>
      </div>
    </div>

  );
}
