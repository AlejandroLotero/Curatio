import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import bgAll from "@/assets/images/bgAll.jpg";
import "../../../styles/tokens.css";
import "../../../styles/semantic.css";
import {
  getFormasFarmaceuticas,
  getPresentacionesEspeciales,
  getPresentacionesGaseosas,
  getPresentacionesLiquidas,
  getPresentacionesSemisolidas,
  getPresentacionesSolidas,
  getViasAdministracion,
  getLaboratorios,
  getEstadosMedicamento,
} from "../services/selectServices";

export default function ProductsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(isEditing);

  const formRef = useRef(null);
  const [formasFarmaceuticas, setFormasFarmaceuticas] = useState([]);
  const [viasAdministracion, setViasAdministracion] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [estadosMedicamento, setEstadosMedicamento] = useState([]);

  const [presentacionesEspeciales, setPresentacionesEspeciales] = useState([]);
  const [presentacionesGaseosas, setPresentacionesGaseosas] = useState([]);
  const [presentacionesLiquidas, setPresentacionesLiquidas] = useState([]);
  const [presentacionesSemisolidas, setPresentacionesSemisolidas] = useState([]);
  const [presentacionesSolidas, setPresentacionesSolidas] = useState([]);

  const [selectedFormaId, setSelectedFormaId] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");

  // Cargar datos de selects y medicamento si es edición
  useEffect(() => {
    getFormasFarmaceuticas().then(setFormasFarmaceuticas);
    getViasAdministracion().then(setViasAdministracion);
    getLaboratorios().then(setLaboratorios);
    getEstadosMedicamento().then(setEstadosMedicamento);

    getPresentacionesEspeciales().then(setPresentacionesEspeciales);
    getPresentacionesGaseosas().then(setPresentacionesGaseosas);
    getPresentacionesLiquidas().then(setPresentacionesLiquidas);
    getPresentacionesSemisolidas().then(setPresentacionesSemisolidas);
    getPresentacionesSolidas().then(setPresentacionesSolidas);
  }, []);

  // Cargar medicamento si es edición
  useEffect(() => {
    if (isEditing) {
      try {
        const stored = localStorage.getItem("medicamentos");
        if (stored) {
          const medicamentos = JSON.parse(stored);
          const med = medicamentos.find((m) => m.id === parseInt(id));
          if (med) {
            setMedicamento(med);
            setSelectedFormaId(med.formaFarmaceuticaId || "");
            setSelectedEstado(med.estado || "");
          }
        }
      } catch (error) {
        console.error("Error cargando medicamento:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [id, isEditing]);

  const presentacionesOptions = useMemo(() => {
    switch (Number(selectedFormaId)) {
      case 1:
        return presentacionesEspeciales;
      case 2:
        return presentacionesLiquidas;
      case 3:
        return presentacionesGaseosas;
      case 4:
        return presentacionesSemisolidas;
      case 5:
        return presentacionesSolidas;
      default:
        return [];
    }
  }, [
    selectedFormaId,
    presentacionesEspeciales,
    presentacionesGaseosas,
    presentacionesLiquidas,
    presentacionesSemisolidas,
    presentacionesSolidas,
  ]);

  const handleFormaChange = (e) => {
    setSelectedFormaId(e.target.value);
  };

  const handleEstadoChange = (e) => {
    const estadoId = e.target.value;
    const estado = estadosMedicamento.find(e => e.id == estadoId);
    setSelectedEstado(estado?.label || estadoId);
  };

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(formRef.current);
      
      const data = {
        visualId: formData.get("visualId"),
        nombre: formData.get("nombre"),
        formaFarmaceutica: formData.get("formaFarmaceutica"),
        formaFarmaceuticaId: selectedFormaId,
        presentacion: formData.get("presentacion"),
        concentracion: formData.get("concentracion"),
        descripcion: formData.get("descripcion"),
        viaAdministracion: formData.get("viaAdministracion"),
        laboratorio: formData.get("laboratorio"),
        lote: formData.get("lote"),
        fechaFabricacion: formData.get("fechaFabricacion"),
        fechaVencimiento: formData.get("fechaVencimiento"),
        stock: formData.get("stock"),
        precioCompra: formData.get("precioCompra"),
        precioVenta: formData.get("precioVenta"),
        proveedor: formData.get("proveedor"),
        estado: selectedEstado || formData.get("estado") || "Activo",
      };

      if (isEditing) {
        // Actualizar
        const stored = localStorage.getItem("medicamentos");
        if (stored) {
          const medicamentos = JSON.parse(stored);
          const updated = medicamentos.map((m) =>
            m.id === parseInt(id) ? { ...m, ...data, updatedAt: new Date().toISOString() } : m
          );
          localStorage.setItem("medicamentos", JSON.stringify(updated));
        }
      } else {
        // Crear
        const newMedicamento = {
          ...data,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };

        const stored = localStorage.getItem("medicamentos");
        const medicamentos = stored ? JSON.parse(stored) : [];
        const updated = [...medicamentos, newMedicamento];
        localStorage.setItem("medicamentos", JSON.stringify(updated));
      }

      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);

      setTimeout(() => {
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error("Error guardando medicamento:", error);
      alert("Error al guardar el medicamento");
    }
  };

  const handleConfirmSave = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="relative min-h-screen w-full" style={{
      backgroundImage: `url(${bgAll})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="absolute inset-0 bg-white/20"></div>
      <div className="relative flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
      {loading ? (
        <p style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>Cargando...</p>
      ) : (
        <form
          ref={formRef}
          className="w-full max-w-full lg:max-w-5xl min-w-0 px-4 py-8 sm:px-6 sm:py-12 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 bg-white/70 dark:bg-neutral-900/20 backdrop-blur-md shadow-xl ring-1 rounded-2xl sm:rounded-3xl"
          onSubmit={handleButtonSubmit}
          style={{
            borderColor: "var(--color-primary-200)"
          }}
        >
        <h2
          className="
            text-center
            text-base sm:text-lg md:text-subtittles
            font-bold
            text-label
            col-span-full
            mb-2 sm:mb-4
            wrap-break-word
          "
          style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
        >
          {isEditing ? "EDITAR MEDICAMENTO" : "CREAR MEDICAMENTO"}
        </h2>

        {/* Columna izquierda */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Input
            label="ID del Medicamento (visual)"
            placeholder="ID Medicamento (visual)"
            name="visualId"
            defaultValue={medicamento?.visualId || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Nombre"
            placeholder="Digite el nombre del medicamento"
            name="nombre"
            defaultValue={medicamento?.nombre || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Select
            label="Forma Farmacéutica"
            name="formaFarmaceutica"
            options={formasFarmaceuticas}
            placeholder="Forma Farmacéutica"
            wrapperClassName="w-full min-w-0"
            onChange={handleFormaChange}
            defaultValue={medicamento?.formaFarmaceuticaId || ""}
          />
          <Select
            label="Presentación"
            name="presentacion"
            options={presentacionesOptions}
            placeholder="Presentación"
            wrapperClassName="w-full min-w-0"
            defaultValue={medicamento?.presentacion || ""}
          />
          <Input
            label="Concentración"
            placeholder="Concentración del medicamento"
            name="concentracion"
            defaultValue={medicamento?.concentracion || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Descripción"
            placeholder="Añade una descripción"
            name="descripcion"
            defaultValue={medicamento?.descripcion || ""}
            wrapperClassName="w-full min-w-0"
          />
        </div>

        {/* Columna central */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Select
            label="Vía de Administración"
            name="viaAdministracion"
            options={viasAdministracion}
            placeholder="Vía de Administración"
            wrapperClassName="w-full min-w-0"
            defaultValue={medicamento?.viaAdministracion || ""}
          />
          <Select
            label="Laboratorio"
            name="laboratorio"
            options={laboratorios}
            placeholder="Laboratorio"
            wrapperClassName="w-full min-w-0"
            defaultValue={medicamento?.laboratorio || ""}
          />
          <Input
            label="Lote"
            placeholder="Digite el lote del medicamento"
            name="lote"
            defaultValue={medicamento?.lote || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Fecha de Fabricación"
            placeholder="AAAA-MM-DD"
            name="fechaFabricacion"
            defaultValue={medicamento?.fechaFabricacion || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Fecha de Vencimiento"
            placeholder="AAAA-MM-DD"
            name="fechaVencimiento"
            defaultValue={medicamento?.fechaVencimiento || ""}
            wrapperClassName="w-full min-w-0"
          />
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Input
            label="Stock"
            placeholder="Text"
            name="stock"
            type="number"
            defaultValue={medicamento?.stock || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Precio de Compra"
            placeholder="Text"
            name="precioCompra"
            type="number"
            defaultValue={medicamento?.precioCompra || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Precio de Venta"
            placeholder="Text"
            name="precioVenta"
            type="number"
            defaultValue={medicamento?.precioVenta || ""}
            wrapperClassName="w-full min-w-0"
          />
          <Select
            label="Proveedor"
            name="proveedor"
            options={[]}
            placeholder="Proveedor"
            wrapperClassName="w-full min-w-0"
            defaultValue={medicamento?.proveedor || ""}
          />
          <Select
            label="Estado"
            name="estado"
            options={estadosMedicamento}
            placeholder="Estado"
            wrapperClassName="w-full min-w-0"
            value={(() => {
              if (selectedEstado) {
                const estado = estadosMedicamento.find(e => e.label === selectedEstado);
                return estado?.id || "";
              }
              if (medicamento?.estado) {
                const estado = estadosMedicamento.find(e => e.label === medicamento.estado);
                return estado?.id || "";
              }
              return "";
            })()}
            onChange={handleEstadoChange}
          />
        </div>

        {/* Fila inferior: descripción ya va en columna izquierda, aquí botones */}
        <div className="col-span-full flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full mx-auto mt-6 min-w-0">
          <Link to="/products">
            <Button variant="secondary" size="sm" type="button">
              Volver
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            {isEditing ? "Actualizar Medicamento" : "Registrar Medicamento"}
          </Button>
        </div>
      </form>
      )}

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={isEditing ? "Confirmar actualización" : "Confirmar registro"}
        message={isEditing ? "¿Está seguro que desea actualizar el medicamento con los datos ingresados?" : "¿Está seguro que desea registrar el medicamento con los datos ingresados?"}
      >
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleConfirmSave}
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      {/* Modal de éxito */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title={isEditing ? "Medicamento actualizado" : "Medicamento registrado"}
        message={isEditing ? "El medicamento se ha actualizado correctamente." : "El medicamento se ha registrado correctamente."}
      >
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/products"
            className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
          >
            Ver medicamentos
          </Link>
        </div>
      </Modal>
      </div>
    </div>
  );
}

