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
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonSubmit(e);
        }}
      >
        {/* DATOS DE CONTACTO */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
            Datos de contacto
          </h2>
          <div className="space-y-6 grid grid-cols-1 w-full max-w-[320px]">
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

          {/* Botones de acción */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => console.log("Oprimió cancelar")}
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              size="sm"
              type="submit"
              onClick={() => console.log("Oprimió guardar")}
            >
              Guardar
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}