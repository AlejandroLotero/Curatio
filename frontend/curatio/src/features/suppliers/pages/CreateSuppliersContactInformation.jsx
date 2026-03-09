//Formulario de Creación de Proveedores - Datos de contacto
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import Modal from "@/shared/components/Modal";
import { CircleArrowLeft } from "lucide-react";

export default function ContactInformationSuppliers() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formRef = useRef(null);

  const handleEmailBlur = (e) => {
    console.log("Correo electrónico del proveedor: ", e.target.value);
  };

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleConfirmSave = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">

      <form
        ref={formRef}
        className="
      w-full max-w-md
      px-6 py-12 
      grid grid-cols-1 gap-4 
      bg-white/70 dark:bg-neutral-900/20 
      backdrop-blur-md 
      shadow-xl 
      ring-1 
      rounded-3xl"
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