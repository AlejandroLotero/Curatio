//Formulario de Creación de Proveedores - Datos de contacto
import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Modal from "@/shared/components/Modal";
import { CircleArrowLeft } from "lucide-react";
import { SupplierSchema } from "../schemas/SupplierSchemas";

export default function ContactInformationSuppliers() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formRef = useRef(null);

  const location = useLocation();
  const prevData = location.state ?? {};

  const [formData, setFormData] = useState({
    ...prevData,
    nombreContacto: prevData.nombreContacto ?? "",
    phoneNumber: prevData.phoneNumber ?? "",
    email: prevData.email ?? "",
    address: prevData.address ?? "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleButtonSubmit = (e) => {
    e.preventDefault();

    const contactSchema = SupplierSchema.pick({
      phoneNumber: true,
      email: true,
      address: true,
    });

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setIsConfirmModalOpen(false);
      return;
    }

    setErrors({});
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleConfirmSave = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label px-3 sm:px-4 py-4 sm:py-8">

      <form
        ref={formRef}
        className="
      w-full max-w-md
      px-4 sm:px-6 py-8 sm:py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-2xl sm:rounded-3xl"
      onSubmit={handleButtonSubmit}>
        <Link
        to="/suppliers/datos-basicos"
        className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
      >
        <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
      </Link>
      
        {/* DATOS DE CONTACTO */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-lg sm:text-xl md:text-2xl font-bold 
          text-label"
          >
            Datos de contacto
          </h2>
          <div className="space-y-6 grid grid-cols-1 w-full max-w-[320px]">
            <Input
              label="Nombre de contacto"
              placeholder="Stiven Quintero"
              name="nombreContacto"
              value={formData.nombreContacto}
              onChange={handleChange}
            />
            <Input
              label="Teléfono de contacto"
              placeholder="3001234567"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />
            <Input
              label="Correo electrónico"
              placeholder="example@gmail.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              label="Dirección"
              placeholder="Barrio Dss Mz 44 Cs 88"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link to="/">
              <Button variant="secondary" size="sm" type="button">
                Cancelar
              </Button>
            </Link>

            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Guardar
            </Button>
          </div>
        </section>
      </form>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar guardado"
        message="¿Está seguro que desea guardar los datos de contacto del proveedor?"
      >
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleConfirmSave}
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      {/* Modal de éxito */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Datos guardados"
        message="Los datos de contacto del proveedor se han guardado correctamente."
      >
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/"
            className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </Modal>
    </div>
  );
}