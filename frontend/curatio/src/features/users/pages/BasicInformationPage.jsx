import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { CircleArrowLeft } from "lucide-react";

export default function BasicInformationPage() {
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
        className="
      relative
      w-full max-w-md
      px-6 py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl">

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

          <Input
            label="Nombre y Apellidos"
            placeholder="Juan Rivera Grisales"
            name="fullNames"
            onChange={handleNameChange}
          />

          <Select
            label="Tipos de documento"
            name="documentTypes"
            options={documentTypes}
            placeholder="Tipo de documento"
            wrapperClassName="w-[320px]"
          />

          <Input
            label="Numero de documento"
            placeholder="123456789"
            type="number"
            name="documentNumber"
            onBlur={handleDocumentBlur}
          />

          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Buttom
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Buttom>

            <Link to="/accounts/contacto">
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
