import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import { useEffect, useState } from "react";
import { getRoles } from "../services/selectService";

export default function RolPage() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    console.log("Crear usuario - Datos del formulario", e.target);
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
        onSubmit={handleButtonSubmit}
      >
        {/* ================= ROL ================= */}
        <section className="grid gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
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
            name="startDate"
          />

          <Input
            label="Fecha de fin"
            type="date"
            name="endDate"
          />

          <div className="flex justify-between mt-6">
            <Buttom
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Buttom>

            <Buttom
              variant="primary"
              size="sm"
              type="submit"
              onClick={() => console.log("Crear usuario")}
            >
              Crear usuario
            </Buttom>
          </div>
        </section>
      </form>
    </div>
  );
}
