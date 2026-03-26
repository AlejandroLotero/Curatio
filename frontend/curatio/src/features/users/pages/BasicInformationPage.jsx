// import Input from "@/shared/components/Input";
// import Buttom from "@/shared/components/Button";
// import Select from "@/shared/components/Select";
// import FileInput from "@/shared/components/FileInputCreateUser";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getDocumentTypes } from "../services/selectService";
// import { CircleArrowLeft } from "lucide-react";
// import avatar from "@/assets/images/avatar.png";
// import { UserSchema } from "../schemas/UserSchemas";

// export default function BasicInformationPage() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullnames: "",
//     documentType: "",
//     documentNumber: "",
//     address: "",
//     phoneNumber: "",
//     email: "",
//     confirmEmail: "",
//     roles: "",
//     startDate: "",
//     endDate: "",
//   });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
// // Seleccionar los campos que se van a validar
//     const basicSchema = UserSchema.pick({
//       fullnames: true,
//       documentType: true,
//       documentNumber: true,
//     });

//     // Validar los datos
//     const result = basicSchema.safeParse(formData);
//     if (!result.success) {
//       const fieldErrors = {};
//       result.error.issues.forEach((issue) => {
//         const field = issue.path[0];
//         fieldErrors[field] = issue.message;
//         });
//       setErrors(fieldErrors);
//       return;
//     }
//     setErrors({});
//     // Redirigir a la siguiente página una vez que los datos sean válidos
//     navigate("/accounts/contacto", { state: result.data });
//   };

//   const [errors, setErrors] = useState({});

//   const [documentTypes, setDocumentTypes] = useState([]);

//   useEffect(() => {
//     getDocumentTypes().then(setDocumentTypes);
//   }, []);

//   const handleNameChange = (e) => {
//     console.log("Nombre del usuario", e.target.value);
//   };

//   const handleDocumentBlur = (e) => {
//     console.log("Número de documento", e.target.value);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen text-label">
//       <form
//         onSubmit={handleSubmit}
//         className="
//       relative
//       w-full max-w-md
//       px-6 py-12 
//       grid grid-cols-1 gap-4 
//       bg-white/70 dark:bg-neutral-900/20
//       backdrop-blur-md 
//       shadow-xl 
//       ring-1 
//       rounded-3xl"
//       >
//         <Link
//           to="/"
//           className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
//         >
//           <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
//         </Link>

//         {/* ================= DATOS BASICOS ================= */}
//         <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
//           <h2
//             className="
//           text-center 
//           text-subtittles 
//           font-bold 
//           text-label"
//           >
//             Datos basicos
//           </h2>

//           <div className="flex flex-col items-center w-max ">
//             <FileInput
//               label="Foto de perfil"
//               accept="image/*"
//               defaultImage={avatar}
//               previewSize={128}
//               onUpload={(url) => console.log("Foto subida:", url)}
//             />
//           </div>

//           <Input
//             label="Nombre y Apellidos"
//             placeholder="Juan Rivera Grisales"
//             name="fullnames"
//             onChange={handleChange}
//             error={errors.fullnames}
//             value={formData.fullnames}
//           />

//           <Select
//             label="Tipos de documento"
//             name="documentType"
//             options={documentTypes}
//             placeholder="Tipo de documento"
//             wrapperClassName="w-[320px]"
//             error={errors.documentType}
//             value={formData.documentType}
//             onChange={handleChange}
//           />

//           <Input
//             label="Numero de documento"
//             placeholder="123456789"
//             type="number"
//             name="documentNumber"
//             onBlur={handleDocumentBlur}
//             error={errors.documentNumber}
//             value={formData.documentNumber}
//             onChange={handleChange}
//           />

//           <div className="flex justify-between w-full max-w-[320px] mt-6">
//             <Link to="/accounts/list">
//               <Buttom
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => console.log("Oprimió cancelar")}
//               >
//                 Cancelar
//               </Buttom>
//             </Link>

//             <Buttom variant="primary" size="sm" type="submit">
//               Siguiente
//             </Buttom>
//           </div>
//         </section>
//       </form>
//     </div>
//   );
// }

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import FileInput from "@/shared/components/FileInputcreateUser";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { CircleArrowLeft } from "lucide-react";
import avatar from "@/assets/images/avatar.png";
import { BasicInformationSchema } from "../schemas/UserSchemas";
import { useCreateUserWizard } from "../context/CreateUserWizardContext";

/**
 * BasicInformationPage
 * --------------------
 * Paso 1 del wizard de creación de usuario.
 *
 * Importante:
 * - Se conserva el diseño anterior
 * - Se mantiene la lógica nueva del wizard
 * - Los datos viven en el contexto global
 * - La navegación sigue siendo /accounts/contacto
 */
export default function BasicInformationPage() {
  const navigate = useNavigate();

  /**
   * Estado global del wizard.
   * Aquí ya no usamos location.state porque ahora
   * toda la información vive en el contexto compartido.
   */
  const {
    formData,
    updateFormData,
    errors,
    setErrors,
    generalError,
    setGeneralError,
  } = useCreateUserWizard();

  /**
   * Catálogo de tipos de documento.
   */
  const [documentTypes, setDocumentTypes] = useState([]);

  /**
   * Carga de tipos de documento al montar la vista.
   */
  useEffect(() => {
    const loadDocumentTypes = async () => {
      try {
        const items = await getDocumentTypes();
        setDocumentTypes(items);
      } catch (error) {
        console.error("Error loading document types:", error);
        setGeneralError("No se pudieron cargar los tipos de documento.");
      }
    };

    loadDocumentTypes();
  }, [setGeneralError]);

  /**
   * Maneja cambios de inputs y selects.
   * Actualiza el contexto del wizard.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    updateFormData({
      [name]: value,
    });
  };

  /**
   * Maneja cambio real de archivo para la foto.
   * El archivo se guarda temporalmente en el contexto.
   */
  const handleFileChange = (file) => {
    updateFormData({
      photoFile: file,
    });
  };

  /**
   * Valida solo los datos del paso 1.
   * Si todo está correcto, avanza al paso 2.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = BasicInformationSchema.safeParse({
      fullNames: formData.fullNames,
      documentTypes: formData.documentTypes,
      documentNumber: formData.documentNumber,
      photoFile: formData.photoFile,
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
    navigate("/accounts/contacto");
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <form
        onSubmit={handleSubmit}
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
        {/* Botón visual de volver */}
        <Link
          to="/accounts/list"
          className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
        >
          <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
        </Link>

        {/* Error general si ocurre algo al cargar catálogos */}
        {generalError ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-700">{generalError}</p>
          </div>
        ) : null}

        {/* ================= DATOS BÁSICOS ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
              text-center
              text-subtittles
              font-bold
              text-label
            "
          >
            Datos basicos
          </h2>

          {/* Foto de perfil */}
          <div className="flex flex-col items-center w-max">
            <FileInput
              label="Foto de perfil"
              accept="image/png, image/jpeg"
              defaultImage={avatar}
              previewSize={128}
              onFileChange={handleFileChange}
            />
            {errors.photoFile ? (
              <p className="text-mostsmall text-red-600 mt-1">
                {errors.photoFile}
              </p>
            ) : null}
          </div>

          {/* Nombre */}
          <Input
            label="Nombre y Apellidos"
            placeholder="Juan Rivera Grisales"
            name="fullNames"
            value={formData.fullNames}
            onChange={handleChange}
            error={errors.fullNames}
          />

          {/* Tipo de documento */}
          <Select
            label="Tipos de documento"
            name="documentTypes"
            options={documentTypes}
            placeholder="Tipo de documento"
            wrapperClassName="w-[320px]"
            value={formData.documentTypes}
            onChange={handleChange}
            error={errors.documentTypes}
          />

          {/* Número de documento */}
          <Input
            label="Numero de documento"
            placeholder="123456789"
            type="number"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            error={errors.documentNumber}
          />

          {/* Botones */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to="/accounts/list">
              <Button
                variant="secondary"
                size="sm"
                type="button"
              >
                Cancelar
              </Button>
            </Link>

            <Button variant="primary" size="sm" type="submit">
              Siguiente
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}