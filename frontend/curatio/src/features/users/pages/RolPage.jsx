// import Input from "@/shared/components/Input";
// import Buttom from "@/shared/components/Button";
// import Select from "@/shared/components/Select";
// import Modal from "@/shared/components/Modal";
// import { useEffect, useState, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { getRoles } from "../../users/services/selectService";
// import { CircleArrowLeft } from "lucide-react";
// import { UserSchema } from "../schemas/UserSchemas";

// export default function UpdateRolPage() {
//   const [roles, setRoles] = useState([]);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const formRef = useRef(null);

//   const location = useLocation();
//   const prevData = location.state ?? {};

//   const [formData, setFormData] = useState({
//     ...prevData,
//     roles: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     getRoles().then(setRoles);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleButtonSubmit = (e) => {
//     e.preventDefault();

//     const rolSchema = UserSchema.pick({
//       roles: true,
//       startDate: true,
//       endDate: true,
//     });

//     // Inputs type="date" devuelven string "YYYY-MM-DD"
//     const payload = {
//       ...formData,
//       startDate: formData.startDate ? new Date(formData.startDate) : formData.startDate,
//       endDate: formData.endDate ? new Date(formData.endDate) : formData.endDate,
//     };

//     const result = rolSchema.safeParse(payload);

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

//   const handleConfirmCreate = () => {
//     formRef.current?.requestSubmit();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen text-label">
//       <form
//         ref={formRef}
//         className="
//       w-full max-w-md
//       px-6 py-12 
//       grid grid-cols-1 gap-4 
//       bg-white/70 dark:bg-neutral-900/20 
//       backdrop-blur-md 
//       shadow-xl 
//       ring-1 
//       rounded-3xl"
//         onSubmit={handleButtonSubmit}>

//       <Link
//           to="/accounts/contacto"
//           className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
//         >
//           <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
//       </Link>


//         {/* ================= ROL ================= */}
//         <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
//           <h2
//             className="
//           text-center 
//           text-subtittles 
//           font-bold 
//           text-label"
//           >
//             Rol
//           </h2>

//           <Select
//             name="roles"
//             options={roles}
//             placeholder="Seleccione un rol"
//             wrapperClassName="w-[320px]"
//             value={formData.roles}
//             onChange={handleChange}
//             error={errors.roles}
//           />

//           <Input
//             label="Fecha de inicio"
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             error={errors.startDate}
//           />

//           <Input
//             label="Fecha de fin"
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             error={errors.endDate}
//           />

//           <div className="flex justify-between w-full max-w-[320px] mt-6">
//             <Link
//               to="/accounts/list"
//               className="inline-flex items-center justify-center h-9 px-3 border border-border-strong bg-secondarybtnbg text-secondarybtntext font-heading text-small hover:bg-secondarybtnhoverbg hover:text-primarybtntext rounded-4xl transition-colors"
//               >
//               Cancelar
//             </Link>

//             <Buttom
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={() => setIsConfirmModalOpen(true)}
//             >
//               Crear usuario
//             </Buttom>
//           </div>
//         </section>
//       </form>

//       {/* Modal de confirmación */}
//       <Modal
//         isOpen={isConfirmModalOpen}
//         onClose={() => setIsConfirmModalOpen(false)}
//         title="Confirmar creación de usuario"
//         message="¿Está seguro que desea crear el usuario con los datos ingresados?"
//       >
//         <div className="flex gap-4 justify-center">
//           <Buttom
//             variant="secondary"
//             size="sm"
//             type="button"
//             onClick={() => setIsConfirmModalOpen(false)}
//           >
//             Cancelar
//           </Buttom>
//           <Buttom
//             variant="primary"
//             size="sm"
//             type="button"
//             onClick={handleConfirmCreate}
//           >
//             Confirmar
//           </Buttom>
//         </div>
//       </Modal>

//       {/* Modal de éxito con Link */}
//       <Modal
//         isOpen={isSuccessModalOpen}
//         onClose={() => setIsSuccessModalOpen(false)}
//         title="Usuario creado"
//         message="El usuario se ha creado correctamente."
//       >
//         <div className="flex flex-col gap-4 items-center">
//           <Link
//             to="/accounts/list"
//             className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
//           >
//             Ir al inicio
//           </Link>
//         </div>
//       </Modal>
//     </div>
//   );
// }

import Select from "@/shared/components/Select";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { getRoles } from "../services/selectService";
import { RoleInformationSchema } from "../schemas/UserSchemas";
import { useCreateUserWizard } from "../context/CreateUserWizardContext";

/**
 * RolPage
 * -------
 * Paso 3 del wizard de creación de usuario.
 *
 */
export default function RolPage() {
  const navigate = useNavigate();

  /**
   * Estado global del wizard.
   * Aquí vive toda la información de los pasos 1, 2 y 3.
   */
  const {
    formData,
    updateFormData,
    errors,
    setErrors,
    generalError,
    isSubmitting,
    isSuccess,
    setIsSuccess,
    submitWizard,
    resetWizard,
  } = useCreateUserWizard();

  /**
   * Catálogo de roles.
   */
  const [roles, setRoles] = useState([]);

  /**
   * Estado del modal de confirmación.
   */
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  /**
   * Carga inicial de roles desde la fuente configurada.
   */
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const items = await getRoles();
        setRoles(items);
      } catch (error) {
        console.error("Error loading roles:", error);
      }
    };

    loadRoles();
  }, []);

  /**
   * Maneja cambios del paso actual.
   * Actualiza el contexto global del wizard.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roles") {
      const next = { roles: value };

      // Regla de negocio: fechas solo aplican para Farmaceuta
      if (value !== "Farmaceuta") {
        next.startDate = "";
        next.endDate = "";
      }

      updateFormData(next);
      return;
    }

    updateFormData({ [name]: value });
  };

  /**
   * Valida únicamente este paso antes de abrir
   * el modal de confirmación final.
   */
  const handleOpenConfirm = () => {
    const result = RoleInformationSchema.safeParse({
      roles: formData.roles,
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsConfirmModalOpen(true);
  };

  /**
   * Ejecuta el submit final del wizard.
   * Si todo sale bien, el modal de éxito se controla
   * desde el propio contexto.
   */
  const handleConfirmCreate = async () => {
    const result = await submitWizard();

    if (result.ok) {
      setIsConfirmModalOpen(false);
    }
  };

  /**
   * Cierra el flujo de éxito, limpia el wizard
   * y redirige al listado de usuarios.
   */
  const handleSuccessClose = () => {
    setIsSuccess(false);
    resetWizard();
    navigate("/accounts/list");
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <div
        className="
          relative
          w-full max-w-md
          px-6 py-12
          grid grid-cols-1 gap-4
          bg-white/70 dark:bg-neutral-900/20
          backdrop-blur-md
          shadow-xl
          ring-1
          rounded-3xl
        "
      >
        {/* Botón visual para volver al paso anterior */}
        <Link
          to="/accounts/contacto"
          className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
        >
          <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
        </Link>

        {/* Error general si el contexto lo reporta */}
        {generalError ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-700">{generalError}</p>
          </div>
        ) : null}

        {/* ================= ROL ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
              text-center
              text-subtittles
              font-bold
              text-label
            "
          >
            Rol
          </h2>

          {/* Selección de rol */}
          <Select
            name="roles"
            options={roles}
            placeholder="Seleccione un rol"
            wrapperClassName="w-[320px]"
            value={formData.roles}
            onChange={handleChange}
            error={errors.roles}
          />

          {formData.roles === "Farmaceuta" ? (
            <>
              {/* Fecha de inicio */}
              <Input
                label="Fecha de inicio"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
              />

              {/* Fecha de fin */}
              <Input
                label="Fecha de fin"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
              />
            </>
          ) : null}

          {/* Botones principales */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link
              to="/accounts/list"
              className="
                inline-flex items-center justify-center
                h-9 px-3
                border border-border-strong
                bg-secondarybtnbg text-secondarybtntext
                font-heading text-small
                hover:bg-secondarybtnhoverbg hover:text-primarybtntext
                rounded-4xl transition-colors
              "
            >
              Cancelar
            </Link>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={handleOpenConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear usuario"}
            </Button>
          </div>
        </section>
      </div>

      {/* ================= MODAL DE CONFIRMACIÓN ================= */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar creación de usuario"
        message="¿Está seguro que desea crear el usuario con los datos ingresados?"
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
            onClick={handleConfirmCreate}
            disabled={isSubmitting}
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      {/* ================= MODAL DE ÉXITO ================= */}
      <Modal
        isOpen={isSuccess}
        onClose={handleSuccessClose}
        title="Usuario creado"
        message="El usuario se ha creado correctamente. La contraseña fue enviada al correo registrado."
      >
        <div className="flex flex-col gap-4 items-center">
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleSuccessClose}
          >
            Ir al listado
          </Button>
        </div>
      </Modal>
    </div>
  );
}