import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function SupplierDetailComponent({ supplier, onCancel, onEdit }) {
  const data = supplier ?? {};

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-4 py-8">
      <div
        className="
          w-full max-w-4xl mx-auto
          px-8 py-10
          bg-white/70 dark:bg-neutral-900/20
          backdrop-blur-md
          shadow-xl
          ring-1
          rounded-3xl
        "
      >
        <h2 className="text-center text-subtittles font-bold mb-8">
          {data.nombreProveedor || "NOMBRE DEL PROVEEDOR"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 place-items-center">
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

        <div className="flex justify-end gap-6 mt-8">
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
            onClick={onEdit}
          >
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}

