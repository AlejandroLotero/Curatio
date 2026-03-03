import Input from "@/shared/components/Input";
import Buttom from "../../../shared/components/Button";
import Select from "../../../shared/components/Select";
import { useEffect, useState } from "react";
import { getDocumentTypes, getRoles } from "../services/selectService";

export default function UserForm() {
  {
    /*==========ESTADOS LISTA TIPOS DOCUMENTO==========*/
  }

  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  {
    /*==========ESTADOS LISTA ROLES==========*/
  }
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  /*==========EVENTOS/*==========*/

  const handleNameChange = (e) => {
    console.log("Nombre del usuario", e.target.value);           {/*Almacenar el ingreso de datos en un input*/}
  };

  const handleEmailBlur = (b) => {
    console.log("Email del usuario", b.target.value);            {/*Hace referencia a cuando yo salgo del input*/}
  };

  const handleButtonSubmit = (s) => {
    console.log("Datos del formulario", s.target.value);          {/*Hace referencia a cuando yo oprimo el boton de submit*/} 
  };

  return (
    <div>
      {/*Formulario para crear el usuario REALIZADO POR JHONIER G */}
      <form className=" 
      px-6 py-12 
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl">
        {/* ================= DATOS BASICOS ================= */}
        <section className="grid gap-4 p-4 border rounded-xl">
          <h2 className="
          text-center 
          text-subtittles 
          font-bold 
          text-label">
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
            onBlur={handleEmailBlur}
          />

          <div className="flex justify-between mt-6">
            <Buttom
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Buttom>

            <Buttom
              variant="primary"
              size="sm"
              type="submit"
              onSubmit={handleButtonSubmit}
              onClick={() => console.log("Oprimió siguiente")}
            >
              Siguiente
            </Buttom>
          </div>
        </section>

        {/* ================= CONTACTO ================= */}
        <section className="grid gap-4 p-4 border rounded-xl">
          <h2 className="
          text-center 
          text-subtittles 
          font-bold 
          text-label">
            Datos de Contacto
          </h2>

          <Input
            label="Direccion"
            placeholder="Calle 123 #45-67"
            name="address"
          />

          <Input
            label="Numero de telefono"
            placeholder="123456789"
            type="tel"
            name="phoneNumber"
          />

          <Input
            label="Correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="email"
          />

          <Input
            label="Confirmar correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="confirmEmail"
          />

          <div className="flex justify-between mt-6">
            <Buttom
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Buttom>

            <Buttom
              variant="primary"
              size="sm"
              type="submit"
              onSubmit={handleButtonSubmit}
              onClick={() => console.log("Oprimió siguiente")}
            >
              Siguiente
            </Buttom>
          </div>
        </section>

        {/* ================= ROL ================= */}
        <section className="grid gap-4 p-4 border rounded-xl">
          <h2 className="
          text-center 
          text-subtittles 
          font-bold 
          text-label">
            Rol
          </h2>

          <Select
            name="roles"
            options={roles}
            placeholder="Seleccione un rol"
          />

          <Input 
          label="Fecha de inicio" 
          type="date" 
          name="startDate" />

          <Input 
          label="Fecha de fin" 
          type="date" 
          name="endDate"/>

          {/*justify-between ======> Distrubye los elementos a izquierda y derecha dejando el maximo espacio disponible entre ellos */}
          <div className="flex justify-between">
            <Buttom
              variant="secondary"
              size="sm"
              onClick={() => console.log("Oprimió cancelar")}>
              Cancelar
            </Buttom>

            <Buttom
              variant="primary"
              size="sm"
              type="submit"
              onSubmit={handleButtonSubmit}
              onClick={() => console.log("Oprimió siguiente")}>
              Crear usuario
            </Buttom>
          </div>
        </section>
      </form>
    </div>
  );
}
