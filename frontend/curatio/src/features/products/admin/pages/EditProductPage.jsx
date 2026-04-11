// import { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// // import { ArrowLeft } from "lucide-react";
// import Button from "@/shared/components/Button";
// import Modal from "@/shared/components/Modal";
// import ProductFileInput from "@/features/products/components/ProductFileInput";
// import { listProducts } from "@/data/product/listProducts";
// import "../../../../styles/tokens.css";
// import "../../../../styles/semantic.css";

// export default function EditProductPage() {
//   // Obtiene el ID del producto desde la URL
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Estados del componente
//   const [medicamento, setMedicamento] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [imageUrl, setImageUrl] = useState(null);

//   // Carga el medicamento cuando cambia el ID
//   useEffect(() => {
//     cargarMedicamento();
//   }, [id]);

//   // Busca el medicamento en la lista por ID y carga sus datos en el formulario
//   const cargarMedicamento = () => {
//     try {
//       const med = listProducts.find((m) => m.id == id);
//       if (med) {
//         setMedicamento(med);
//         setFormData(med);
//       } else {
//         setMedicamento(null);
//       }
//     } catch (error) {
//       console.error("Error cargando medicamento:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Actualiza los datos del formulario cuando el usuario modifica un campo
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Guarda la URL de la imagen cargada en el estado
//   const handleImageUpload = (url) => {
//     setImageUrl(url);
//     setFormData({
//       ...formData,
//       image: url,
//     });
//   };

//   // Procesa la confirmacion de edicion del producto
//   const handleConfirmEdit = () => {
//     console.log("Producto actualizado:", formData);//     setIsConfirmModalOpen(false);
//     // Aquí irá la lógica de API para guardar cambios
//     setTimeout(() => {
//       navigate("/products/listar");
//     }, 500);
//   };

//   // Componente reutilizable para renderizar campos editables del formulario
//   const EditField = ({ label, value, name, type = "text" }) => (
//     <div className="flex flex-col gap-2">
//       <label className="text-sm font-semibold text-label" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value || ""}
//         onChange={handleInputChange}
//         className="p-3 rounded-lg bg-white/80 text-label border border-gray-300"
//         style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
//       />
//     </div>
//   );

//   // Muestra pantalla de carga mientras se obtienen los datos
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-label">Cargando...</p>
//       </div>
//     );
//   }

//   // Muestra mensaje si el producto no existe
//   if (!medicamento) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <p className="text-label mb-4">Producto no encontrado</p>
//           <Link to="/products/listar">
//             <Button variant="primary" size="sm">
//               Volver a productos
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
//       {/* Contenedor interno: tarjeta semitransparente con formulario */}
//       <div
//           className="
//             w-full max-w-5xl
//             min-w-0
//             px-4 py-8 sm:px-6 sm:py-12
//             flex flex-col gap-6
//             bg-white/30
//             backdrop-blur-md
//             border
//             rounded-lg
//             shadow-xl
//             ring-1
//           "
//           style={{
//             borderColor: "var(--color-primary-200)",
//           }}
//         >
//           <h2
//             className="
//               text-center
//               text-4xl
//               font-bold
//               text-label
//               wrap-break-word
//             "
//             style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
//           >
//             EDITAR PRODUCTO
//           </h2>
//           {/* Grilla responsiva: 1 col móvil, 2 cols tablet, 3 cols desktop */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <EditField label="ID" name="id" value={formData.id} />
//             <EditField label="Medicamento" name="nameproduct" value={formData.nameproduct} />
//             <EditField label="Forma Farmacéutica" name="formaFarmaceutica" value={formData.formaFarmaceutica} />
//             <EditField label="Presentación" name="presentacion" value={formData.presentacion} />
//             <EditField label="Concentración" name="concentration" value={formData.concentration} />
//             <EditField label="Descripción" name="descripcion" value={formData.descripcion} />
//             <EditField label="Vía de Administración" name="administration_guide" value={formData.administration_guide} />
//             <EditField label="Laboratorio" name="laboratory" value={formData.laboratory} />
//             <EditField label="Lote" name="lote" value={formData.lote} />
//             <EditField label="Fecha de Fabricación" name="fechaFabricacion" value={formData.fechaFabricacion} />
//             <EditField label="Fecha de Vencimiento" name="fechaVencimiento" value={formData.fechaVencimiento} />
//             <EditField label="Stock" name="stock" value={formData.stock} type="number" />
//             <EditField label="Precio de Compra" name="precioCompra" value={formData.precioCompra} type="number" />
//             <EditField label="Precio de Venta" name="precioVenta" value={formData.precioVenta} type="number" />
//             <EditField label="Proveedor" name="proveedor" value={formData.proveedor} />
//             <EditField label="Estado" name="state" value={formData.state} />
//           </div>

//           {/* FileInput para imagen */}
//           <div className="mt-3">
//             <ProductFileInput
//               label="Imagen del Medicamento"
//               onUpload={handleImageUpload}
//             />
//           </div>

//           {/* Botones de navegación: Volver y Editar */}
//           <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full mx-auto mt-6 min-w-0">
//             {/* Botón para volver al listado */}
//             <Link to="/products/listar">
//               <Button variant="secondary" size="sm" type="button">
//                 Volver
//               </Button>
//             </Link>
//             {/* Botón para abrir modal de confirmación */}
//             <Button
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={() => setIsConfirmModalOpen(true)}
//             >
//               Editar Producto
//             </Button>
//           </div>

//       {/* Modal de confirmación antes de guardar cambios */}
//       <Modal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         title="Confirmar edición"
//         message="¿Está seguro que desea guardar los cambios al medicamento?"
//       >
//         <div className="flex gap-4 justify-center">
//           <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             onClick={() => setIsConfirmModalOpen(false)}
//           >
//             Volver
//           </Button>
//           <Button
//             variant="primary"
//             size="sm"
//             type="button"
//             onClick={handleConfirmEdit}
//           >
//             Confirmar
//           </Button>
//         </div>
//       </Modal>

//       {/* Cierra contenedor interno (card del formulario) */}
//         </div>
//       {/* Cierra contenedor externo (centrador de pantalla) */}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";
import ProductFileInput from "@/features/products/components/ProductFileInput";

import {
  getFormasFarmaceuticas,
  getPresentacionesByForma,
  getViasAdministracion,
  getLaboratorios,
  getEstadosMedicamento,
  getProveedoresActivos,
} from "../../services/selectServices";

import { ProductSchema } from "../../schemas/ProductSchemas";
import {
  getMedicationById,
  updateMedication,
} from "@/lib/http/medications";
import {
  adaptMedicationDetail,
  adaptMedicationPayloadFromForm,
} from "@/lib/adapters/medicationAdapter";

import "../../../../styles/tokens.css";
import "../../../../styles/semantic.css";

/**
 * Mapea los errores del backend a los nombres de campo del formulario.
 */
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
    imagen: "imagen",
    __all__: "general",
  };

  const normalized = {};

  Object.entries(backendFields).forEach(([key, value]) => {
    const uiKey = fieldMap[key] ?? key;
    normalized[uiKey] = Array.isArray(value) ? value[0] : String(value);
  });

  return normalized;
}

/**
 * Componente EditField extraído fuera.
 * Evita que se redefinida en cada render del padre (problema de React).
 */
function EditField({ label, value, name, type = "text", error, onChange, disabled = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-semibold text-label"
        style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
        className="p-3 rounded-lg bg-white/80 text-label border border-gray-900 enabled:cursor-text enabled:hover:border-gray-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
        style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
      />

      {error ? (
        <p className="text-mostsmall text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

export default function EditProductPage() {
  /**
   * ID del medicamento desde la URL.
   */
  const { id } = useParams();
  const navigate = useNavigate();

  /**
   * Referencia del formulario para acceso directo.
   */
  const formRef = useRef(null);

  /**
   * Estados principales de la pantalla.
   */
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  /**
   * Estado del medicamento cargado desde backend.
   */
  const [medicamento, setMedicamento] = useState(null);

  /**
   * Estado local del formulario.
   * Se llena con el medicamento real traído desde backend.
   */
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    formaFarmaceutica: "",
    presentacion: "",
    concentracion: "",
    descripcion: "",
    viaAdministracion: "",
    laboratorio: "",
    lote: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    stock: "",
    precioCompra: "",
    precioVenta: "",
    proveedor: "",
    estado: "",
    imageUrl: null,
  });

  /**
   * Archivo real seleccionado para reemplazar la imagen.
   */
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  /**
   * Estado de errores y mensaje general.
   */
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  /**
   * Catálogos del formulario.
   */
  const [formasFarmaceuticas, setFormasFarmaceuticas] = useState([]);
  const [viasAdministracion, setViasAdministracion] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [estadosMedicamento, setEstadosMedicamento] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [presentacionesOptions, setPresentacionesOptions] = useState([]);

  /**
   * Carga los catálogos necesarios.
   */
  const loadCatalogs = async () => {
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
  };

  /**
   * Carga el medicamento real desde backend.
   */
  const loadMedication = async () => {

    
    const response = await getMedicationById(id);

    const adapted = adaptMedicationDetail(response?.data?.medication);

    if (!adapted) {
      setMedicamento(null);
      return;
    }

    setMedicamento(adapted);

    setFormData({
      id: adapted.id ?? "",
      nombre: adapted.nameproduct ?? "",
      formaFarmaceutica: adapted.pharmaceuticalFormId ?? adapted.formaId ?? "",
      presentacion: adapted.presentationId ?? adapted.presentacionId ?? "",
      concentracion: adapted.concentration ?? "",
      descripcion: adapted.descripcion ?? "",
      viaAdministracion: adapted.administrationRouteId ?? adapted.viaAdministracionId ?? "",
      laboratorio: adapted.laboratoryId ?? adapted.laboratorioId ?? "",
      lote: adapted.lote ?? "",
      fechaFabricacion: adapted.fechaFabricacion ?? "",
      fechaVencimiento: adapted.fechaVencimiento ?? "",
      stock: adapted.stock ?? "",
      precioCompra: adapted.precioCompra ?? "",
      precioVenta: adapted.precioVenta ?? "",
      proveedor: adapted.supplierId ?? adapted.proveedorId ?? "",
      estado: adapted.stateId ?? adapt.estadoId ?? "",
      imageUrl: adapted.imageUrl ?? null,
    });

    /**
     * Si el medicamento ya tiene forma, se cargan sus presentaciones.
     */
    const formaId = adapted.pharmaceuticalFormId ?? adapted.formaId;
    if (formaId) {
      const options = await getPresentacionesByForma(formaId);
      setPresentacionesOptions(options);
    }
  };

  /**
   * Carga inicial de pantalla.
   */
  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        setLoading(true);
        setGeneralError("");

        await loadCatalogs();
        await loadMedication();
      } catch (error) {
        console.error("Error loading edit medication page:", error);

        if (isMounted) {
          setMedicamento(null);
          setGeneralError("No se pudo cargar la información del medicamento.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [id]);

  /**
   * Actualiza estado local al escribir en campos.
   */
  const handleInputChange = (e) => {    
    const { name, value } = e.target;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      return newData;
    });
  };

  /**
   * Cambia forma farmacéutica y recarga presentaciones.
   */
  const handleFormaChange = async (e) => {
    const formaId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      formaFarmaceutica: formaId,
      presentacion: "",
    }));

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

  /**
   * Recibe el archivo real desde ProductFileInput.
   */
  const handleImageUpload = (file) => {
    setSelectedImageFile(file ?? null);
  };

  /**
   * Construye el objeto base del formulario.
   * Luego el adapter lo convierte a FormData real.
   */
  const buildFormValues = () => {
    return {
      nombre: formData.nombre,
      formaFarmaceutica: formData.formaFarmaceutica,
      presentacion: formData.presentacion,
      concentracion: formData.concentracion,
      descripcion: formData.descripcion,
      viaAdministracion: formData.viaAdministracion,
      laboratorio: formData.laboratorio,
      lote: formData.lote,
      fechaFabricacion: formData.fechaFabricacion,
      fechaVencimiento: formData.fechaVencimiento,
      stock: formData.stock,
      precioCompra: formData.precioCompra,
      precioVenta: formData.precioVenta,
      proveedor: formData.proveedor,
      estado: formData.estado,
      imagen: selectedImageFile,
    };
  };

  /**
   * Envía la actualización real al backend.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = buildFormValues();

    const result = ProductSchema.safeParse({
      ...values,
      imagen: values.imagen ?? undefined,
    });

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      setGeneralError("");
      setIsConfirmModalOpen(false);
      return;
    }

    try {
      setIsSubmitting(true);
      setGeneralError("");
      setErrors({});

      /**
       * Se construye FormData real, incluyendo imagen si el usuario cambió archivo.
       */
      const payload = adaptMedicationPayloadFromForm(values);

      await updateMedication(id, payload);

      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error updating medication:", error);

      const backendFields = error?.error?.fields ?? {};
      const normalizedErrors = mapBackendErrorsToUiFields(backendFields);

      setErrors(normalizedErrors);
      setGeneralError(
        error?.error?.message || "No se pudo actualizar el medicamento."
      );
      setIsConfirmModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Ejecuta submit real cuando el usuario confirma en modal.
   */
  const handleConfirmEdit = () => {
    formRef.current?.requestSubmit();
  };

  /**
   * Componente reutilizable simple para campos input.
   */
  // NOTA: EditField ahora está definido AFUERA del componente para evitar re-renders innecesarios

  /**
   * Estado de carga.
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-label">Cargando...</p>
      </div>
    );
  }

  /**
   * Estado cuando no existe el medicamento.
   */
  if (!medicamento) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-label mb-4">
            {generalError || "Producto no encontrado"}
          </p>

          <Link to="/products/listar">
            <Button variant="primary" size="sm">
              Volver a productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="
          w-full max-w-5xl
          min-w-0
          px-4 py-8 sm:px-6 sm:py-12
          flex flex-col gap-6
          bg-white/30
          backdrop-blur-md
          border
          rounded-lg
          shadow-xl
          ring-1
        "
        style={{
          borderColor: "var(--color-primary-200)",
        }}
      >
        <h2
          className="
            text-center
            text-4xl
            font-bold
            text-label
            wrap-break-word
          "
          style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
        >
          EDITAR PRODUCTO
        </h2>

        {generalError ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
            {generalError}
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EditField label="ID" name="id" value={formData.id} onChange={handleInputChange} disabled={true} />

          <EditField
            label="Medicamento"
            name="nombre"
            value={formData.nombre}
            error={errors.nombre}
            onChange={handleInputChange}
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Forma Farmacéutica"
              name="formaFarmaceutica"
              value={formData.formaFarmaceutica}
              options={formasFarmaceuticas}
              placeholder="Forma Farmacéutica"
              onChange={handleFormaChange}
              error={errors.formaFarmaceutica}
              wrapperClassName="w-full min-w-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label="Presentación"
              name="presentacion"
              value={formData.presentacion}
              options={presentacionesOptions}
              placeholder="Presentación"
              onChange={handleInputChange}
              error={errors.presentacion}
              wrapperClassName="w-full min-w-0"
            />
          </div>

          <EditField
            label="Concentración"
            name="concentracion"
            value={formData.concentracion}
            error={errors.concentracion}
            onChange={handleInputChange}
          />

          <EditField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            error={errors.descripcion}
            onChange={handleInputChange}
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Vía de Administración"
              name="viaAdministracion"
              value={formData.viaAdministracion}
              options={viasAdministracion}
              placeholder="Vía de Administración"
              onChange={handleInputChange}
              error={errors.viaAdministracion}
              wrapperClassName="w-full min-w-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label="Laboratorio"
              name="laboratorio"
              value={formData.laboratorio}
              options={laboratorios}
              placeholder="Laboratorio"
              onChange={handleInputChange}
              error={errors.laboratorio}
              wrapperClassName="w-full min-w-0"
            />
          </div>

          <EditField
            label="Lote"
            name="lote"
            value={formData.lote}
            error={errors.lote}
            onChange={handleInputChange}
          />

          <EditField
            label="Fecha de Fabricación"
            name="fechaFabricacion"
            value={formData.fechaFabricacion}
            type="date"
            error={errors.fechaFabricacion}
            onChange={handleInputChange}
          />

          <EditField
            label="Fecha de Vencimiento"
            name="fechaVencimiento"
            value={formData.fechaVencimiento}
            type="date"
            error={errors.fechaVencimiento}
            onChange={handleInputChange}
          />

          <EditField
            label="Stock"
            name="stock"
            value={formData.stock}
            type="number"
            error={errors.stock}
            onChange={handleInputChange}
          />

          <EditField
            label="Precio de Compra"
            name="precioCompra"
            value={formData.precioCompra}
            type="number"
            error={errors.precioCompra}
            onChange={handleInputChange}
          />

          <EditField
            label="Precio de Venta"
            name="precioVenta"
            value={formData.precioVenta}
            type="number"
            error={errors.precioVenta}
            onChange={handleInputChange}
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Proveedor"
              name="proveedor"
              value={formData.proveedor}
              options={proveedores}
              placeholder="Proveedor"
              onChange={handleInputChange}
              error={errors.proveedor}
              wrapperClassName="w-full min-w-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Select
              label="Estado"
              name="estado"
              value={formData.estado}
              options={estadosMedicamento}
              placeholder="Estado"
              onChange={handleInputChange}
              error={errors.estado}
              wrapperClassName="w-full min-w-0"
            />
          </div>
        </div>

        <div className="mt-3 space-y-4">
          {formData.imageUrl ? (
            <div>
              <p className="text-sm font-semibold text-label mb-2">
                Imagen actual
              </p>
              <img
                src={formData.imageUrl}
                alt={formData.nombre}
                className="h-32 w-32 rounded-lg object-cover border border-border-strong"
              />
            </div>
          ) : null}

          <ProductFileInput
            label="Imagen del Medicamento"
            onUpload={handleImageUpload}
          />

          {errors.imagen ? (
            <p className="text-mostsmall text-red-600">{errors.imagen}</p>
          ) : null}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full mx-auto mt-6 min-w-0">
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
            {isSubmitting ? "Actualizando..." : "Editar Producto"}
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar edición"
        message="¿Está seguro que desea guardar los cambios al medicamento?"
      >
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
            disabled={isSubmitting}
          >
            Volver
          </Button>

          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleConfirmEdit}
            disabled={isSubmitting}
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Medicamento actualizado"
        message="El medicamento se ha actualizado correctamente."
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