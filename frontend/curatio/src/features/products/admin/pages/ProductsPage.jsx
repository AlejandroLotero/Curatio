import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";
import ProductFileInput from "@/features/products/components/ProductFileInput";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import {
  getFormasFarmaceuticas,
  getPresentacionesByForma,
  getViasAdministracion,
  getLaboratorios,
  getEstadosMedicamento,
  getProveedoresActivos,
} from "../../services/selectServices";

import { ProductSchema } from "../../schemas/ProductSchemas";
import { createMedication } from "@/lib/http/medications";
import { adaptMedicationPayloadFromForm } from "@/lib/adapters/medicationAdapter";

function mapBackendErrorsToUiFields(backendFields = {}) {
  const fieldMap = {
    nombre: "nombre",
    forma: "formaFarmaceutica",
    presentacion: "presentacion",
    concentracion: "concentracion",
    descripcion: "descripcion",
    via_administracion: "viaAdministracion",
    laboratorio: "laboratorio",
    lote: "lote",
    fecha_fabricacion: "fechaFabricacion",
    fecha_vencimiento: "fechaVencimiento",
    stock: "stock",
    precio_compra: "precioCompra",
    precio_venta: "precioVenta",
    proveedor: "proveedor",
    estado: "estado",
    __all__: "general",
  };

  const normalized = {};

  Object.entries(backendFields).forEach(([key, value]) => {
    const uiKey = fieldMap[key] ?? key;
    normalized[uiKey] = Array.isArray(value) ? value[0] : String(value);
  });

  return normalized;
}

export default function ProductsPage() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const formRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const [formasFarmaceuticas, setFormasFarmaceuticas] = useState([]);
  const [viasAdministracion, setViasAdministracion] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [estadosMedicamento, setEstadosMedicamento] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [presentacionesOptions, setPresentacionesOptions] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const [formas, vias, labs, estados, proveedoresActivos] =
          await Promise.all([
            getFormasFarmaceuticas(),
            getViasAdministracion(),
            getLaboratorios(),
            getEstadosMedicamento(),
            getProveedoresActivos(),
          ]);

        setFormasFarmaceuticas(formas);
        setViasAdministracion(vias);
        setLaboratorios(labs);
        setEstadosMedicamento(estados);
        setProveedores(proveedoresActivos);
      } catch (error) {
        console.error("Error loading medication catalogs:", error);
        setGeneralError("No se pudieron cargar los catálogos del formulario.");
      }
    };

    loadCatalogs();
  }, []);

  const handleFormaChange = async (e) => {
    const formaId = e.target.value;

    const presentationSelect = formRef.current?.querySelector(
      'select[name="presentacion"]'
    );
    if (presentationSelect) {
      presentationSelect.value = "";
    }

    if (!formaId) {
      setPresentacionesOptions([]);
      return;
    }

    try {
      const options = await getPresentacionesByForma(formaId);
      setPresentacionesOptions(options);
    } catch (error) {
      console.error("Error loading presentations:", error);
      setPresentacionesOptions([]);
      setGeneralError("No se pudieron cargar las presentaciones.");
    }
  };

  const handleButtonSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const result = ProductSchema.safeParse(payload);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      setGeneralError("");
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(false);
      return;
    }

    try {
      setIsSubmitting(true);
      setGeneralError("");

      const apiPayload = adaptMedicationPayloadFromForm(payload);
      await createMedication(apiPayload);

      setErrors({});
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);

      formRef.current?.reset();
      setPresentacionesOptions([]);
    } catch (error) {
      console.error("Error creating medication:", error);

      const backendFields = error?.error?.fields ?? {};
      const normalizedErrors = mapBackendErrorsToUiFields(backendFields);

      setErrors(normalizedErrors);
      setGeneralError(
        error?.error?.message || "No se pudo registrar el medicamento."
      );
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSave = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
      <form
        ref={formRef}
        className="
          w-full max-w-full lg:max-w-5xl
          min-w-0
          px-4 py-8 sm:px-6 sm:py-12
          grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6
          bg-white/30
          backdrop-blur-md
          shadow-xl
          ring-1
          rounded-2xl sm:rounded-3xl
        "
        onSubmit={handleButtonSubmit}
      >
        <h2
          className="
            text-center
            text-3xl
            font-bold
            text-label
            col-span-full
            mb-2 sm:mb-4
            wrap-break-word
          "
          style={{ fontFamily: "var(--font-body)" }}
        >
          GESTIÓN DE PRODUCTOS
        </h2>

        {generalError ? (
          <div className="col-span-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
            {generalError}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Input
            label="Nombre"
            placeholder="Digite el nombre del medicamento"
            name="nombre"
            wrapperClassName="w-full min-w-0"
            error={errors.nombre}
          />

          <Select
            label="Forma Farmacéutica"
            name="formaFarmaceutica"
            options={formasFarmaceuticas}
            placeholder="Forma Farmacéutica"
            wrapperClassName="w-full min-w-0"
            onChange={handleFormaChange}
            error={errors.formaFarmaceutica}
          />

          <Select
            label="Presentación"
            name="presentacion"
            options={presentacionesOptions}
            placeholder="Presentación"
            wrapperClassName="w-full min-w-0"
            error={errors.presentacion}
          />

          <Input
            label="Concentración"
            placeholder="Concentración del medicamento"
            name="concentracion"
            wrapperClassName="w-full min-w-0"
            error={errors.concentracion}
          />

          <Input
            label="Descripción"
            placeholder="Añade una descripción"
            name="descripcion"
            wrapperClassName="w-full min-w-0"
            error={errors.descripcion}
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Select
            label="Vía de Administración"
            name="viaAdministracion"
            options={viasAdministracion}
            placeholder="Vía de Administración"
            wrapperClassName="w-full min-w-0"
            error={errors.viaAdministracion}
          />

          <Select
            label="Laboratorio"
            name="laboratorio"
            options={laboratorios}
            placeholder="Laboratorio"
            wrapperClassName="w-full min-w-0"
            error={errors.laboratorio}
          />

          <Input
            label="Lote"
            placeholder="Digite el lote del medicamento"
            name="lote"
            wrapperClassName="w-full min-w-0"
            error={errors.lote}
          />

          <Input
            label="Fecha de Fabricación"
            placeholder="AAAA-MM-DD"
            name="fechaFabricacion"
            type="date"
            wrapperClassName="w-full min-w-0"
            error={errors.fechaFabricacion}
          />

          <Input
            label="Fecha de Vencimiento"
            placeholder="AAAA-MM-DD"
            name="fechaVencimiento"
            type="date"
            wrapperClassName="w-full min-w-0"
            error={errors.fechaVencimiento}
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-full mx-auto min-w-0">
          <Input
            label="Stock"
            placeholder="0"
            name="stock"
            type="number"
            wrapperClassName="w-full min-w-0"
            error={errors.stock}
          />

          <Input
            label="Precio de Compra"
            placeholder="0"
            name="precioCompra"
            type="number"
            wrapperClassName="w-full min-w-0"
            error={errors.precioCompra}
          />

          <Input
            label="Precio de Venta"
            placeholder="0"
            name="precioVenta"
            type="number"
            wrapperClassName="w-full min-w-0"
            error={errors.precioVenta}
          />

          <Select
            label="Proveedor"
            name="proveedor"
            options={proveedores}
            placeholder="Proveedor"
            wrapperClassName="w-full min-w-0"
            error={errors.proveedor}
          />

          <Select
            label="Estado"
            name="estado"
            options={estadosMedicamento}
            placeholder="Estado"
            wrapperClassName="w-full min-w-0"
            error={errors.estado}
          />
        </div>

        <div className="col-span-full flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full mx-auto mt-6 min-w-0">
          <Link to="/products/listar">
            <Button variant="secondary" size="sm" type="button">
              Volver
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(true)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrar Producto"}
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar registro"
        message="¿Está seguro que desea registrar el medicamento con los datos ingresados?"
      >
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleConfirmSave}
            disabled={isSubmitting}
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Medicamento registrado"
        message="El medicamento se ha registrado correctamente."
      >
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/products/listar"
            className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
          >
            Ir al listado
          </Link>
        </div>
      </Modal>
    </div>
  );
}