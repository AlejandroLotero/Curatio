import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getRoles } from "../../users/services/selectService";

export default function RolPage() {
  const [roles, setRoles] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    console.log("Crear usuario - Datos del formulario", e.target);
    setIsConfirmModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleConfirmCreate = () => {
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
        onSubmit={handleButtonSubmit}
      >
        {/* ================= ROL ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
            Rol
          </h2>

          <Select
            name="roles"
            options={roles}
            placeholder="Seleccione un rol"
          />

          <Input
            label="Fecha de inicio"
            type="date"
            name="startDate"
          />

          <Input
            label="Fecha de fin"
            type="date"
            name="endDate"
          />

          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center h-9 px-3 border border-border-strong bg-secondarybtnbg text-secondarybtntext font-heading text-small hover:bg-secondarybtnhoverbg hover:text-primarybtntext rounded-4xl transition-colors"
              >
              Cancelar
            </Link>

            <Buttom
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Crear usuario
            </Buttom>
          </div>
        </section>
      </form>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar creación de usuario"
        message="¿Está seguro que desea crear el usuario con los datos ingresados?"
      >
        <div className="flex gap-4 justify-center">
          <Buttom
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancelar
          </Buttom>
          <Buttom
            variant="primary"
            size="sm"
            type="button"
            onClick={handleConfirmCreate}
          >
            Confirmar
          </Buttom>
        </div>
      </Modal>

      {/* Modal de éxito con Link */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Usuario creado"
        message="El usuario se ha creado correctamente."
      >
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/"
            className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </Modal>
    </div>
  );
}
