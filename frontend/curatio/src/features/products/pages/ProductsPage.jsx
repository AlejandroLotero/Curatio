import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { useEffect, useMemo, useState } from "react";
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

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
      <form
        className="
          w-full max-w-full lg:max-w-5xl
          min-w-0
          px-4 py-8 sm:px-6 sm:py-12
          grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6
          bg-white/70 dark:bg-neutral-900/20
          backdrop-blur-md
          shadow-xl
          ring-1
          rounded-2xl sm:rounded-3xl
        "
      >
        <h2
          className="
            text-center
            text-base sm:text-lg md:text-subtittles
            font-bold
            text-label
            col-span-full
            mb-2 sm:mb-4
            break-words
          "
        >
          GESTIÓN DE MEDICAMENTOS
        </h2>

        {/* Columna izquierda */}
        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Input
            label="ID del Medicamento (visual)"
            placeholder="ID Medicamento (visual)"
            name="visualId"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Nombre"
            placeholder="Digite el nombre del medicamento"
            name="nombre"
            wrapperClassName="w-full min-w-0"
          />
          <Select
            label="Forma Farmacéutica"
            name="formaFarmaceutica"
            options={formasFarmaceuticas}
            placeholder="Forma Farmacéutica"
            wrapperClassName="w-full min-w-0"
            onChange={handleFormaChange}
          />
          <Select
            label="Presentación"
            name="presentacion"
            options={presentacionesOptions}
            placeholder="Presentación"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Concentración"
            placeholder="Concentración del medicamento"
            name="concentracion"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Descripción"
            placeholder="Añade una descripción"
            name="descripcion"
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
          />
          <Select
            label="Laboratorio"
            name="laboratorio"
            options={laboratorios}
            placeholder="Laboratorio"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Lote"
            placeholder="Digite el lote del medicamento"
            name="lote"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Fecha de Fabricación"
            placeholder="AAAA-MM-DD"
            name="fechaFabricacion"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Fecha de Vencimiento"
            placeholder="AAAA-MM-DD"
            name="fechaVencimiento"
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
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Precio de Compra"
            placeholder="Text"
            name="precioCompra"
            type="number"
            wrapperClassName="w-full min-w-0"
          />
          <Input
            label="Precio de Venta"
            placeholder="Text"
            name="precioVenta"
            type="number"
            wrapperClassName="w-full min-w-0"
          />
          <Select
            label="Proveedor"
            name="proveedor"
            options={[]}
            placeholder="Proveedor"
            wrapperClassName="w-full min-w-0"
          />
          <Select
            label="Estado"
            name="estado"
            options={estadosMedicamento}
            placeholder="Estado"
            wrapperClassName="w-full min-w-0"
          />
        </div>

        {/* Fila inferior: descripción ya va en columna izquierda, aquí botones */}
        <div className="col-span-full flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full mx-auto mt-6 min-w-0">
          <Button variant="secondary" size="sm" type="button">
            Volver
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Registrar Medicamento
          </Button>
        </div>
      </form>
    </div>
  );
}

