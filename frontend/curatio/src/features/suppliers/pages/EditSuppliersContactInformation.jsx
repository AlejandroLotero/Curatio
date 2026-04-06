// //Formulario de Edición de Proveedores - Datos de contacto
// import { useState, useRef } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import Input from "../../../shared/components/Input";
// import Button from "../../../shared/components/Button";
// import Modal from "@/shared/components/Modal";
// import { CircleArrowLeft } from "lucide-react";
// import { SupplierSchema } from "../schemas/SupplierSchemas";
// import { suppliers } from "../../../data/supplier/suppliers";

// export default function EditContactInformationSuppliers() {
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const formRef = useRef(null);

//   const { id } = useParams();
//   const location = useLocation();
//   const prevData = location.state ?? {};

//   const supplierToEdit = id ? suppliers.find((supplier) => supplier.id === Number(id)) : null;

//   const [formData, setFormData] = useState(() => {
//     const basicData = prevData && Object.keys(prevData).length > 0 ? prevData : {};
//     const contactData = supplierToEdit ? {
//       nombreContacto: supplierToEdit.nombreContacto || "",
//       phoneNumber: supplierToEdit.telefonoContacto || "",
//       email: supplierToEdit.correoElectronico || "",
//       address: "",
//     } : {};

//     return {
//       ...basicData,
//       ...contactData,
//     };
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleButtonSubmit = (e) => {
//     e.preventDefault();

//     const contactSchema = SupplierSchema.pick({
//       phoneNumber: true,
//       email: true,
//       address: true,
//     });

//     const result = contactSchema.safeParse(formData);
//     if (!result.success) {
//       const fieldErrors = {};
//       result.error.issues.forEach((issue) => {
//         const field = issue.path[0];
//         fieldErrors[field] = issue.message;
//       });
//       setErrors(fieldErrors);
//       setIsConfirmModalOpen(false);
//       return;
//     }

//     setErrors({});
//     setIsConfirmModalOpen(false);
//     setIsSuccessModalOpen(true);
//   };

//   const handleConfirmSave = () => {
//     formRef.current?.requestSubmit();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen text-label px-3 sm:px-4 py-4 sm:py-8">

//       <form
//         ref={formRef}
//         className="
//       w-full max-w-md
//       px-4 sm:px-6 py-8 sm:py-12 
//       grid grid-cols-1 gap-4 
//       bg-white/70 dark:bg-neutral-900/20 
//       backdrop-blur-md 
//       shadow-xl 
//       ring-1 
//       rounded-2xl sm:rounded-3xl"
//       onSubmit={handleButtonSubmit}>
//         <Link
//         to={`../editar/${id}`}
//         className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
//       >
//         <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
//       </Link>
      
//         {/* DATOS DE CONTACTO */}
//         <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
//           <h2
//             className="
//           text-center 
//           text-lg sm:text-xl md:text-2xl font-bold 
//           text-label"
//           >
//             Actualizar datos de contacto
//           </h2>
//           <div className="space-y-6 grid grid-cols-1 w-full max-w-[320px]">
//             <Input
//               label="Nombre de contacto"
//               placeholder="Stiven Quintero"
//               name="nombreContacto"
//               value={formData.nombreContacto}
//               onChange={handleChange}
//             />
//             <Input
//               label="Teléfono de contacto"
//               placeholder="3001234567"
//               type="tel"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               error={errors.phoneNumber}
//             />
//             <Input
//               label="Correo electrónico"
//               placeholder="example@gmail.com"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//             />
//             <Input
//               label="Dirección"
//               placeholder="Barrio Dss Mz 44 Cs 88"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               error={errors.address}
//             />
//           </div>

//           {/* Botones de acción */}
//           <div className="flex justify-between w-full max-w-[320px] mt-6">
//             <Link to="/suppliers/listar-proveedores">
//               <Button variant="secondary" size="sm" type="button">
//                 Cancelar
//               </Button>
//             </Link>

//             <Button
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={() => setIsConfirmModalOpen(true)}
//             >
//               Actualizar
//             </Button>
//           </div>
//         </section>
//       </form>

//       {/* Modal de confirmación */}
//       <Modal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         title="Confirmar Actualización"
//         message="¿Está seguro que desea actualizar los datos de contacto del proveedor?"
//       >
//         <div className="flex gap-4 justify-center">
//           <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             onClick={() => setIsConfirmModalOpen(false)}
//           >
//             Cancelar
//           </Button>
//           <Button
//             variant="primary"
//             size="sm"
//             type="button"
//             onClick={handleConfirmSave}
//           >
//             Actualizar
//           </Button>
//         </div>
//       </Modal>

//       {/* Modal de éxito */}
//       <Modal
//         isOpen={isSuccessModalOpen}
//         onClose={() => setIsSuccessModalOpen(false)}
//         title="Datos actualizados"
//         message="Los datos de contacto del proveedor se han actualizado correctamente."
//       >
//         <div className="flex flex-col gap-4 items-center">
//           <Link
//             to="/"
//             className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
//           >
//             Volver al inicio
//           </Link>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// Formulario de Edición de Proveedores - Datos de contacto

import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Modal from "@/shared/components/Modal";
import { CircleArrowLeft } from "lucide-react";
import { SupplierSchema } from "../schemas/SupplierSchemas";

// Cliente HTTP y adaptadores del módulo de proveedores
import {
  fetchSupplierDetail,
  mapSupplierDetailResponse,
  updateSupplier,
} from "../../../lib/http/suppliers";
import { buildSupplierUpdateBody } from "../../../lib/adapters/supplierAdapter";

export default function EditContactInformationSuppliers() {
  // Estado de modales
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Referencia al formulario para disparar submit desde el modal
  const formRef = useRef(null);

  // Se toma el NIT desde la URL porque el backend identifica el proveedor por NIT
  const { nit } = useParams();

  // State enviado desde la pantalla anterior con datos básicos ya validados
  const location = useLocation();
  const prevData = location.state ?? {};

  /**
   * Estado del formulario final.
   * Se mezclan:
   * - datos básicos del paso 1
   * - datos de contacto obtenidos del backend
   */
  const [formData, setFormData] = useState({
    nit: prevData.nit ?? "",
    fullnames: prevData.fullnames ?? "",
    supplierSocialReason: prevData.supplierSocialReason ?? "",
    nombreContacto: "",
    phoneNumber: "",
    email: "",
    address: "",
    ciudad: "",
    estado: "Activo",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /**
   * Carga inicial del proveedor desde backend para llenar
   * los datos de contacto actuales.
   */
  useEffect(() => {
    const loadSupplier = async () => {
      try {
        if (!nit) return;

        const response = await fetchSupplierDetail(nit);
        const supplier = mapSupplierDetailResponse(response);

        setFormData((prev) => ({
          ...prev,
          nit: supplier?.nit || prev.nit || "",
          fullnames: prev.fullnames || supplier?.nombreProveedor || "",
          supplierSocialReason:
            prev.supplierSocialReason ||
            supplier?.razonSocial ||
            supplier?.nombreProveedor ||
            "",
          nombreContacto: supplier?.nombreContacto || "",
          phoneNumber: supplier?.telefonoContacto || "",
          email: supplier?.correoElectronico || "",
          address: supplier?.direccion || "",
          ciudad: supplier?.ciudad || "",
          estado: supplier?.estado || "Activo",
        }));
      } catch (error) {
        console.error("Error cargando proveedor para edición:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSupplier();
  }, [nit]);

  /**
   * Manejo de cambios en inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Envía la actualización al backend.
   */
  const handleButtonSubmit = async (e) => {
    e.preventDefault();

    const contactSchema = SupplierSchema.pick({
      phoneNumber: true,
      email: true,
      address: true,
    });

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      setIsConfirmModalOpen(false);
      return;
    }

    try {
      setSaving(true);

      const body = buildSupplierUpdateBody(formData);

      await updateSupplier(nit, body);

      setErrors({});
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error actualizando proveedor:", error);

      const apiErrors = error?.response?.data?.error?.fields;

      if (apiErrors) {
        setErrors((prev) => ({
          ...prev,
          phoneNumber: apiErrors.telefono_contacto?.[0] || prev.phoneNumber,
          email: apiErrors.correo_contacto?.[0] || prev.email,
          address: apiErrors.direccion?.[0] || prev.address,
          nombreContacto:
            apiErrors.nombre_contacto?.[0] || prev.nombreContacto,
          ciudad: apiErrors.ciudad?.[0] || prev.ciudad,
        }));
      }

      setIsConfirmModalOpen(false);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Confirma el submit del formulario desde el modal.
   */
  const handleConfirmSave = () => {
    formRef.current?.requestSubmit();
  };

  if (loading) {
    return <div className="text-center">Cargando proveedor...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-3 sm:px-4 py-4 sm:py-8">
      <form
        ref={formRef}
        className="
          w-full max-w-md
          px-4 sm:px-6 py-8 sm:py-12 
          grid grid-cols-1 gap-4 
          bg-white/70 dark:bg-neutral-900/20 
          backdrop-blur-md 
          shadow-xl 
          ring-1 
          rounded-2xl sm:rounded-3xl"
        onSubmit={handleButtonSubmit}
      >
        <Link
          to={`/suppliers/editar/${encodeURIComponent(nit)}`}
          className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
        >
          <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
        </Link>

        {/* DATOS DE CONTACTO */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-label">
            Actualizar datos de contacto
          </h2>

          <div className="space-y-6 grid grid-cols-1 w-full max-w-[320px]">
            <Input
              label="Nombre de contacto"
              placeholder="Stiven Quintero"
              name="nombreContacto"
              value={formData.nombreContacto}
              onChange={handleChange}
              error={errors.nombreContacto}
            />

            <Input
              label="Teléfono de contacto"
              placeholder="3001234567"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />

            <Input
              label="Correo electrónico"
              placeholder="example@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Dirección"
              placeholder="Barrio Dss Mz 44 Cs 88"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />

            <Input
              label="Ciudad"
              placeholder="Medellín"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              error={errors.ciudad}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to="/suppliers/listar-proveedores">
              <Button variant="secondary" size="sm" type="button">
                Cancelar
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={saving}
            >
              Actualizar
            </Button>
          </div>
        </section>
      </form>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar Actualización"
        message="¿Está seguro que desea actualizar los datos de contacto del proveedor?"
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
            disabled={saving}
          >
            Actualizar
          </Button>
        </div>
      </Modal>

      {/* Modal de éxito */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Datos actualizados"
        message="Los datos de contacto del proveedor se han actualizado correctamente."
      >
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/suppliers/listar-proveedores"
            className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
          >
            Volver al listado
          </Link>
        </div>
      </Modal>
    </div>
  );
}