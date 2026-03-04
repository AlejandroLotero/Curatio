//Creación de Formulario de Creación de Proveedores - Datos básicos
import { Link } from "react-router-dom";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Select from "@/shared/components/Select";
// import selectService from "@/features/user/services/serviceSelect";
// import { getDocumentTypes } from "../users/services/selectService";
// import { useState, useEffect } from "react";

export default function CreateFormSuppliers() {
  //   const[documentTypes, setDocumentTypes] = useState([])

  // useEffect (() =>{
  //     getDocumentTypes().then(setDocumentTypes);
  // },[]);

  const handleNitChange = (e) => {
    console.log("NIT del proveedor: ", e.target.value);
    if (e.target.value === "") {
      console.log("Este campo no puede estar vacío");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <form
        className="
      w-full max-w-md
      px-6 py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl"
      >
        {/* DATOS BÁSICOS */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
            Datos básicos
          </h2>
          <div className="space-y-6 grid grid-cols-1 w-full max-w-[320px]">
            <Input
              label="NIT: Ejemplo: 80000000-0"
              placeholder="80000000-0"
              onChange={handleNitChange}
            />
            <Input
              label="Nombre del proveedor"
              placeholder="Juan Rivera"
            />
            <Input label="Razón social" placeholder="Mi Empresa S.A.S." />
            {/* <Select label="Tipos de documento" name="documentType" options={documentTypes}></Select> */}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Button>

            <Link to="../datos-contacto">
              <Button
                variant="primary"
                size="sm"
                type="button"
                onClick={() => console.log("Ir a datos de contacto")}
              >
                Siguiente
              </Button>
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}