import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useState } from "react";
import { UserSchema } from "../schemas/UserSchemas";

export default function DatosContactoPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const prevData = location.state ?? {};

  const [formData, setFormData] = useState({
    ...prevData,
    address: prevData.address ?? "",
    phoneNumber: prevData.phoneNumber ?? "",
    email: prevData.email ?? "",
    confirmEmail: prevData.confirmEmail ?? "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactSchema = UserSchema.pick({
      address: true,
      phoneNumber: true,
      email: true,
      confirmEmail: true,
    });

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Validacion de confirmacion (igualdad)
    if (formData.email !== formData.confirmEmail) {
      setErrors({ confirmEmail: "Los correos no coinciden" });
      return;
    }

    setErrors({});
    navigate("/accounts/rol", { state: { ...prevData, ...result.data } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <form
        onSubmit={handleSubmit}
        className="
      relative
      w-full max-w-md
      px-6 py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl">

      <Link
          to="/accounts/datos-basicos"
          className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
        >
          <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
      </Link>
      
        {/* ================= DATOS DE CONTACTO ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
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
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />

          <Input
            label="Numero de telefono"
            placeholder="123456789"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <Input
            label="Correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Confirmar correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
            error={errors.confirmEmail}
          />

          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to= "/accounts/list">
              <Buttom
                variant="secondary"
                size="sm"
                onClick={() => console.log("Oprimió cancelar")}
              >
                Cancelar
              </Buttom>
            </Link>

            <Buttom variant="primary" size="sm" type="submit">
              Siguiente
            </Buttom>
          </div>
        </section>
      </form>
    </div>
  );
}
