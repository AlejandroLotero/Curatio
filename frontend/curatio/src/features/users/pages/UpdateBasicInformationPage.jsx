import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import FileInput from "@/shared/components/FileInputCreateUser";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { CircleArrowLeft } from "lucide-react";
import avatar from "@/assets/images/avatar.png";
//Importaciones para cargar los datos del usuario a editar en el form
import {getUserById} from "@/lib/http/users";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

export default function UpdateBasicInformationPage() {

// Obtener el id del usuario a editar
  const { id } = useParams();
  const location = useLocation();
  const previousFormData = location.state?.formData ?? {};
// Estado para cargar los tipos de documento
  const [documentTypes, setDocumentTypes] = useState([]);


//Estado formData para leer los datos del formulario
  const [formData, setFormData] = useState({
    fullNames: previousFormData.fullNames ?? "",
    documentTypes: previousFormData.documentTypes ?? "",
    documentNumber: previousFormData.documentNumber ?? "",
    photoUrl: previousFormData.photoUrl ?? "",
  });

  /** Archivo nuevo elegido para enviar al guardar (no serializable en location.state). */
  const [photoFile, setPhotoFile] = useState(null);

  // Siempre que exista id: catálogo + usuario desde servidor (sin omitir por prefill).
  useEffect(() => {
    if (!id) return;
// Efecto para cargar los datos del usuario a editar en el form
    const loadData = async () => {
      try {
        const [docsResponse, userResponse] = await Promise.all([
          getDocumentTypes(),
          getUserById(id),
        ]);
        setDocumentTypes(docsResponse);
// Adaptar los datos del usuario a la UI
        const user = adaptBackendUserToUi(userResponse?.data?.user);
        setFormData({
          fullNames: user?.name ?? "",
          documentTypes: user?.documentType ?? "",
          documentNumber: user?.documentNumber ?? "",
          photoUrl: user?.photoUrl ?? "",
        });
        setPhotoFile(null);
      } catch (error) {
        console.error("Error cargando usuario a editar:", error);
      }
    };

    loadData();
  }, [id]);
// Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
// Manejador de cambios en la foto de perfil
  const handlePhotoFileChange = (file) => {
    setPhotoFile(file ?? null);
  };


// // Manejador de cambios en el nombre del usuario
//   const handleNameChange = (e) => {
//     console.log("Nombre del usuario", e.target.value);
//   };

// Manejador de cambios en el número de documento
    const handleDocumentBlur = (e) => {
    console.log("Usuario id", id, "- Número de documento", e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <form
        className="
      relative
      w-full max-w-md
      px-6 py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl"
      >
        <Link
          to="/accounts/list"
          className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
        >
          <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
        </Link>

        {/* ================= DATOS BASICOS ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
            Actualizar datos basicos
          </h2>

          <div className="flex flex-col items-center w-full [&>*]:flex [&>*]:flex-col [&>*]:items-center">
            <FileInput
              label="Foto de perfil"
              accept="image/*"
              defaultImage={formData.photoUrl ?? avatar}
              previewSize={128}
              onFileChange={handlePhotoFileChange}
            />
          </div>

          <Input
            label="Nombre y Apellidos"
            placeholder="Juan Rivera Grisales"
            name="fullNames"
            onChange={handleChange}
            value={formData.fullNames}
          />

          <Select
            label="Tipos de documento"
            name="documentTypes"
            options={documentTypes}
            placeholder="Tipo de documento"
            wrapperClassName="w-[320px]"
            value={formData.documentTypes}
            onChange={handleChange}
          />

          <Input
            label="Numero de documento"
            placeholder="123456789"
            type="number"
            name="documentNumber"
            onBlur={handleDocumentBlur}
            value={formData.documentNumber}
            onChange={handleChange}
          />

          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to="/accounts/list">
              <Buttom
                variant="secondary"
                size="sm"
                onClick={() => console.log("Oprimió cancelar")}
              >
                Cancelar
              </Buttom>
            </Link>

            <Link to="/accounts/editar-datos-contacto"
              state={{
                userId: id,
                formData: {
                  ...previousFormData,
                  ...formData,
                },
              }}>
              <Buttom
                variant="primary"
                size="sm"
                type="button"
                
                onClick={() => console.log("Oprimió siguiente")}
              >
                Siguiente
              </Buttom>
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}
