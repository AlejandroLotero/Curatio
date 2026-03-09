import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import { Link } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

export default function DatosContactoPage() {
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
        {/* ================= DATOS DE CONTACTO ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
        <Link to="/accounts/datos-basicos" className="self-start">
          <CircleArrowLeft className="absolute top-4 left-4 text-label size-6 cursor-pointer" />
        </Link>

          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
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

          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to= "/">
              <Buttom
                variant="secondary"
                size="sm"
                onClick={() => console.log("Oprimió cancelar")}
              >
                Cancelar
              </Buttom>
            </Link>

            <Link to="/accounts/rol">
              <Buttom
                variant="primary"
                size="sm"
                type="button"
                onClick={() => console.log("Oprimió siguiente")}
              >
                Siguiente
              </Buttom>
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}
