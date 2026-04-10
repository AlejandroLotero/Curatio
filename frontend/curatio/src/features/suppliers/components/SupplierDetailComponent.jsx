import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { useNavigate } from "react-router-dom";

export default function SupplierDetailComponent({ supplier, onCancel, }) {
  const data = supplier ?? {};
  const navigate = useNavigate();

    const handleEdit = () => {
    const nit = supplier?.nit;

    if (nit) {
      navigate(`/suppliers/editar/${encodeURIComponent(nit)}`);
      return;
    }

    navigate("/suppliers/editar");
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-3 sm:px-4 py-4 sm:py-8">
      <div
        className="
          w-full max-w-4xl mx-auto
          px-4 sm:px-6 md:px-8 py-6 sm:py-10
          bg-white/70 dark:bg-neutral-900/20
          backdrop-blur-md
          shadow-xl
          ring-1
          rounded-2xl sm:rounded-3xl
        "
      >
        <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-8">
          {data.nombreProveedor || "NOMBRE DEL PROVEEDOR"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 place-items-center">
          <Input
            label="NIT:"
            value={data.nit ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Nombre del proveedor:"
            value={data.nombreProveedor ?? ""}
            readOnly
            className="cursor-default max-w-md" 
          />
          <Input
            label="Razón social:"
            value={data.razonSocial ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Nombre de contacto:"
            value={data.nombreContacto ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Teléfono de contacto:"
            value={data.telefonoContacto ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Correo:"
            value={data.correo ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Dirección:"
            value={data.direccion ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Ciudad:"
            value={data.ciudad ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
          <Input
            label="Estado:"
            value={data.estado ?? ""}
            readOnly
            className="cursor-default max-w-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-6 mt-6 sm:mt-8">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleEdit}
          >
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}

