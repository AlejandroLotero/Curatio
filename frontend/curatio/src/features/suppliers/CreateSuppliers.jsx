//Creación de Formulario de Creación de Provedores
import Input from "./" //Pendiente conectar ruta

export default function CreateForm() {
  return (
    <div className="flex items-center justify-center w-[320px]">
      <div className="bg-transparent p-8 rounded-lg">
        <h2 className="text-xl font-bold text-center mb-6">
          Datos básicos
        </h2>

        <div className="space-y-6"> {/*agrega espacio vertical entre cada input automáticamente*/}
          <Input 
            label="NIT: Ejemplo:80000000-0"
            placeholder="80000000-0"
          />

          <Input 
            label="Nombre del proveedor"
            placeholder="Juan Rivera"
          />

          <Input 
            label="Razón social"
            placeholder="1234567890"
          />
        </div>
      </div>
    </div>
  );
}