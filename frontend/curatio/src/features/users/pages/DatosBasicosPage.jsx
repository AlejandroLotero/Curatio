import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";

export default function DatosBasicosPage() {
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
    <div>
      <form
        className="
      px-6 py-12 
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl"
      >
        {/* ================= DATOS BASICOS ================= */}
        <section className="grid gap-4 p-4 border rounded-xl">
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
          />

          <Input
            label="Numero de documento"
            placeholder="123456789"
            type="number"
            name="documentNumber"
            onBlur={handleDocumentBlur}
          />

          <div className="flex justify-between mt-6">
            <Buttom
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Buttom>

            <Link to="/crear-usuario/datos-contacto">
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
