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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-transparent p-8 rounded-lg w-[400px] space-y-8">
        {/* DATOS BÁSICOS */}
        <section>
          <h2 className="text-xl font-bold text-center mb-6">Datos básicos</h2>
          <div className="space-y-6 grid grid-cols-1">
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
        </section>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-6">
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
              size="md"
              type="button"
              onClick={() => console.log("Ir a datos de contacto")}
            >
              Siguiente
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}