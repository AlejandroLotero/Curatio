import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import FileInput from "@/shared/components/FileInputCreateUser";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { CircleArrowLeft } from "lucide-react";
import avatar from "@/assets/images/avatar.png";
import { UserSchema } from "../schemas/UserSchemas";

export default function BasicInformationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullnames: "",
    documentType: "",
    documentNumber: "",
    address: "",
    phoneNumber: "",
    email: "",
    confirmEmail: "",
    roles: "",
    startDate: "",
    endDate: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
// Seleccionar los campos que se van a validar
    const basicSchema = UserSchema.pick({
      fullnames: true,
      documentType: true,
      documentNumber: true,
    });

    // Validar los datos
    const result = basicSchema.safeParse(formData);
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
    // Redirigir a la siguiente página una vez que los datos sean válidos
    navigate("/accounts/contacto", { state: result.data });
  };

  const [errors, setErrors] = useState({});

  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  const handleNameChange = (e) => {
    console.log("Nombre del usuario", e.target.value);
  };

  const handleDocumentBlur = (e) => {
    console.log("Número de documento", e.target.value);
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
      rounded-3xl"
      >
        <Link
          to="/"
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
            Datos basicos
          </h2>

          <div className="flex flex-col items-center w-max ">
            <FileInput
              label="Foto de perfil"
              accept="image/*"
              defaultImage={avatar}
              previewSize={128}
              onUpload={(url) => console.log("Foto subida:", url)}
            />
          </div>

          <Input
            label="Nombre y Apellidos"
            placeholder="Juan Rivera Grisales"
            name="fullnames"
            onChange={handleChange}
            error={errors.fullnames}
            value={formData.fullnames}
          />

          <Select
            label="Tipos de documento"
            name="documentType"
            options={documentTypes}
            placeholder="Tipo de documento"
            wrapperClassName="w-[320px]"
            error={errors.documentType}
            value={formData.documentType}
            onChange={handleChange}
          />

          <Input
            label="Numero de documento"
            placeholder="123456789"
            type="number"
            name="documentNumber"
            onBlur={handleDocumentBlur}
            error={errors.documentNumber}
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

            <Buttom variant="primary" size="sm" type="submit">
              Siguiente
            </Buttom>
          </div>
        </section>
      </form>
    </div>
  );
}
