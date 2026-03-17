import { useState } from "react";
import StatusSwitch from "@/shared/components/StatusSwitch";

export default function ConfigUserPage() {

  // Estado que controla el switch
  const [isActive, setIsActive] = useState(true);

  // Maneja el cambio enviado desde el switch
  const handleStatusChange = (value) => {
    setIsActive(value);

    // aquí normalmente iría una llamada a API
    console.log("Nuevo estado:", value);
  };

  return (
        <div className="p-6 max-w-md space-y-4">

      <h2 className="text-lg font-semibold">
        Configuración de usuario
      </h2>

      {/* Fila de configuración */}
      <div className="flex items-center justify-between border p-4 rounded-lg">

        <div>
          <p className="font-medium">Usuario activo</p>
          <p className="text-sm text-gray-500">
            Permite que el usuario pueda iniciar sesión
          </p>
        </div>

        {/* Switch reutilizable */}
        <StatusSwitch
          checked={isActive}
          onChange={handleStatusChange}
          size="md"
        />

      </div>
      </div>
  )};

