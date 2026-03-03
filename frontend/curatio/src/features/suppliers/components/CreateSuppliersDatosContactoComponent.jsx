//Formulario de Creación de Proveedores - Datos de contacto
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

export default function DatosContactoSuppliers() {
  const handleEmailBlur = (e) => {
    console.log("Correo electrónico del proveedor: ", e.target.value);
  };

  const handleButtonSubmit = (s) => {
    console.log("Subir: ", s.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-transparent p-8 rounded-lg w-[400px] space-y-8">
        {/* DATOS DE CONTACTO */}
        <section>
          <h2 className="text-xl font-bold text-center mb-6">
            Datos de contacto
          </h2>
          <div className="space-y-6 grid grid-cols-1">
            <Input
              label="Nombre de contacto"
              placeholder="Stiven Quintero"
            />
            <Input
              label="Teléfono de contacto"
              placeholder="30000000"
            />
            <Input
              label="Correo electrónico"
              placeholder="example@gmail.com"
              onBlur={handleEmailBlur}
            />
            <Input
              label="Dirección"
              placeholder="Barrio Dss Mz 44 Cs 88"
            />
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

          <Button
            variant="primary"
            size="md"
            type="submit"
            onClick={() => console.log("Oprimió guardar")}
            onSubmit={handleButtonSubmit}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}