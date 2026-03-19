// Hook para manejo de estado local en componentes funcionales
import { useState, useMemo } from "react";


// Configuración de campos disponibles para el reporte
import { productReportFields } from "../config/productReportFields";


// Caso de uso que orquesta la generación del reporte
import { generateProductReport } from "../services/generateProductReport";


// Componentes UI reutilizables (design system)
import { Button, Input, Select } from "@/shared/components";
import Checkbox from "@/shared/components/Checkbox";

// Fuente de datos
import { products } from "@/data/product/products";


// Componente modal para configuración de reportes de productos
export default function ProductReportConfigModal({ isOpen, onClose }) {


  // Estado del formato de salida
  const [format, setFormat] = useState("pdf");


  // Estado del alcance del reporte
  const [scope, setScope] = useState("all");


  // Estado para filtro por laboratorio
  const [laboratoryFilter, setLaboratoryFilter] = useState("");


  // Estado de campos seleccionados (inicialización lazy)
  const [selectedFields, setSelectedFields] = useState(() =>
    productReportFields.filter((f) => f.default) // Solo campos marcados por defecto
  );


  // Obtener laboratorios únicos
  const laboratories = useMemo(() => {
    const labs = [...new Set(products.map(p => p.laboratory))];
    return labs.map((lab) => ({ label: lab, value: lab }));
  }, []);


  // Control de render: si el modal no está abierto, no se monta en el DOM
  if (!isOpen) return null;


  // Handler para activar/desactivar campos del reporte
  const handleFieldToggle = (field) => {


    // Verifica si el campo ya está seleccionado
    const exists = selectedFields.find((f) => f.key === field.key);


    if (exists) {
      // Elimina el campo si ya existe
      setSelectedFields(
        selectedFields.filter((f) => f.key !== field.key)
      );
    } else {
      // Agrega el campo si no existe
      setSelectedFields([
        ...selectedFields,
        field
      ]);
    }
  };


  // Handler principal para generar el reporte
  const handleGenerateReport = () => {


    // Invoca el caso de uso con la configuración actual
    generateProductReport({
      format,
      selectedFields,
      scope,
      laboratoryFilter,
    });


    // Cierra el modal después de generar el reporte
    onClose();
  };


  return (
    // Overlay del modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">


      {/* Contenedor del modal */}
      <div className="bg-white/50 backdrop-blur-sm outline-none focus:ring-1 rounded-lg p-6 w-[400px] text-left text-label">


        {/* Título */}
        <h2 className="mb-6 text-xl font-semibold text-label">
          Generar reporte de medicamentos
        </h2>


        {/* Selección de formato */}
        <div className="mb-4">
          <Select
            label="Formato del reporte"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
          />
        </div>


        {/* Selección de campos */}
        <div className="mb-4">
          <p className="mb-2 font-medium">Campos del reporte</p>


          {/* Grid de checkboxes */}
          <div className="grid grid-cols-2 gap-2">
            {productReportFields.map((field) => {


              // Determina si el campo está seleccionado
              const checked = selectedFields.some(
                (f) => f.key === field.key
              );


              return (
                <Checkbox
                  key={field.key}         // Key única para renderizado
                  id={field.key}          // Id accesible
                  name={field.key}        // Nombre del campo
                  label={field.label}     // Texto visible
                  checked={checked}       // Estado controlado
                  onChange={() => handleFieldToggle(field)} // Toggle
                />
              );
            })}
          </div>
        </div>


        {/* Selección de alcance */}
        <div className="mb-4">
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            options={[
              { label: "Todos los medicamentos", value: "all" },
              { label: "Filtrar por laboratorio", value: "laboratory" },
            ]}
          />
        </div>


        {/* Campo condicional para filtro por laboratorio */}
        {scope === "laboratory" && (
          <div className="mb-4">
            <Select
              label="Laboratorio"
              value={laboratoryFilter}
              onChange={(e) => setLaboratoryFilter(e.target.value)}
              options={laboratories}
            />
          </div>
        )}


        {/* Acciones del modal */}
        <div className="flex justify-end gap-2 mt-6">


          {/* Botón cancelar */}
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>


          {/* Botón generar reporte */}
          <Button variant="primary" onClick={handleGenerateReport}>
            Generar reporte
          </Button>


        </div>
      </div>
    </div>
  );
}
