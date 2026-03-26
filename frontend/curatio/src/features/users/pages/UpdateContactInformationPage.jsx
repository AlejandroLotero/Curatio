import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import { Link, useLocation } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
// Importaciones para traer usuario
import { getUserById } from "@/lib/http/users";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

export default function UpdateDatosContactoPage() {

  //Recibir datos desde la página anterior
  const location = useLocation();
  const userId = location.state?.userId;
  const previousFormData = location.state?.formData ?? {};

  //Estado del formulario
  const [formData, setFormData] = useState({
    address: previousFormData.address ?? "",
    phoneNumber: previousFormData.phoneNumber ?? "",
    email: previousFormData.email ?? "",
    confirmEmail: previousFormData.confirmEmail ?? previousFormData.email ?? "",
  });

    //Efecto para cargar datos del usuario
    useEffect(() => {
      const loadUser = async () => {
        try {
          const response = await getUserById(userId);
          const user = adaptBackendUserToUi(response?.data?.user);
  
          setFormData({
            address: user?.address ?? "",
            phoneNumber: user?.phoneNumber ?? "",
            email: user?.email ?? "",
            confirmEmail: user?.email ?? "", // normalmente igual al email
          });
  
        } catch (error) {
          console.error("Error cargando datos de contacto:", error);
        }
      };
  
      const hasPrefillFromState =
        Boolean(previousFormData?.address) ||
        Boolean(previousFormData?.phoneNumber) ||
        Boolean(previousFormData?.email) ||
        Boolean(previousFormData?.confirmEmail);

      if (userId && !hasPrefillFromState) loadUser();
    }, [userId, previousFormData]);

  //Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <form
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
          to={`/accounts/editar-datos-basicos/${userId ?? ""}`}
          state={{
            userId,
            formData: {
              ...previousFormData,
              ...formData,
            },
          }}
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
            Actualizar datos de contacto
          </h2>

          <Input
            label="Direccion"
            placeholder="Calle 123 #45-67"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <Input
            label="Numero de telefono"
            placeholder="123456789"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <Input
            label="Correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Confirmar correo electronico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleChange}
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

            <Link to="/accounts/editar-rol"
            state={{
              userId: userId,
              formData: {
                ...previousFormData,
                ...formData,
              },
            }}>
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
