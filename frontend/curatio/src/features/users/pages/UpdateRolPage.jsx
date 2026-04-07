import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Modal from "@/shared/components/Modal";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRoles } from "../../users/services/selectService";
import { CircleArrowLeft } from "lucide-react";
//Importaciones para traer usuario
import { getUserById, updateUser } from "@/lib/http/users";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

/** ISO o string de fecha → YYYY-MM-DD para inputs type="date". */
function toDateInputValue(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return value.length >= 10 ? value.slice(0, 10) : value;
  }
  return "";
}

export default function RolPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId ?? null;
  const previousFormData = location.state?.formData ?? {};
  const photoFile = location.state?.photoFile ?? null;

  const [roles, setRoles] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    roles: previousFormData.roles ?? "",
    startDate: previousFormData.startDate ?? "",
    endDate: previousFormData.endDate ?? "",
  });

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUserById(userId);
        const user = adaptBackendUserToUi(response?.data?.user);
        if (!user) return;

        const role = user.role ?? "";
        const isFarmaceuta = role === "Farmaceuta";

        setFormData({
          roles: role,
          startDate: isFarmaceuta ? toDateInputValue(user.startDate) : "",
          endDate: isFarmaceuta ? toDateInputValue(user.endDate) : "",
        });
      } catch (error) {
        console.error("Error cargando rol y fechas del usuario:", error);
      }
    };

    const hasPrefillFromState =
      Boolean(previousFormData?.roles) ||
      Boolean(previousFormData?.startDate) ||
      Boolean(previousFormData?.endDate);

    if (userId && !hasPrefillFromState) {
      loadUser();
    }
  }, [userId, previousFormData]);

  const isFarmaceutaRole = formData.roles === "Farmaceuta";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      // Regla de negocio: fechas solo se usan para Farmaceuta.
      if (name === "roles" && value !== "Farmaceuta") {
        next.startDate = "";
        next.endDate = "";
      }

      return next;
    });
  };

  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    const merged = { ...previousFormData, ...formData };

    const confirmEmail = merged.confirmEmail ?? merged.email;
    if (merged.email !== confirmEmail) {
      setSubmitError("Los correos no coinciden.");
      return;
    }

    if (formData.roles === "Farmaceuta" && (!formData.startDate || !formData.endDate)) {
      setSubmitError("Las fechas de inicio y fin son obligatorias para farmaceuta.");
      return;
    }

    if (!userId) {
      setSubmitError("No se identificó el usuario a actualizar.");
      return;
    }

    setIsConfirmModalOpen(false);
    setSubmitError("");
    setSaving(true);

    try {
      const detail = await getUserById(userId);
      const u = adaptBackendUserToUi(detail?.data?.user);
      const mergedPayload = {
        ...merged,
        secondaryPhone: u?.secondaryPhone ?? merged.secondaryPhone ?? "",
      };

      await updateUser(
        userId,
        mergedPayload,
        {
          isActive:
            u?.isActive !== undefined && u?.isActive !== null
              ? Boolean(u.isActive)
              : true,
        },
        photoFile instanceof File ? photoFile : null,
      );

      setIsSuccessModalOpen(true);
    } catch (err) {
      setSubmitError(
        err?.error?.message || "No se pudo actualizar el usuario.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmCreate = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-label">
      <form
        ref={formRef}
        className="
      relative
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
          to="/accounts/editar-datos-contacto"
          state={{
            userId,
            formData: {
              ...previousFormData,
              ...formData,
            },
            photoFile,
          }}
          className="absolute left-3 flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/20 transition-colors group"
        >
          <CircleArrowLeft className="size-8 text-label group-hover:text-white transition-colors" />
      </Link>


        {/* ================= ROL ================= */}
        <section className="flex flex-col items-center gap-4 p-4 border rounded-xl">
          <h2
            className="
          text-center 
          text-subtittles 
          font-bold 
          text-label"
          >
            Actualizar Rol
          </h2>

          <Select
            name="roles"
            options={roles}
            placeholder="Seleccione un rol"
            wrapperClassName="w-[320px]"
            value={formData.roles}
            onChange={handleChange}
          />

          {isFarmaceutaRole ? (
            <>
              <Input
                label="Fecha de inicio"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />

              <Input
                label="Fecha de fin"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </>
          ) : null}

          {submitError ? (
            <p className="text-sm text-red-600 text-center max-w-[320px]">
              {submitError}
            </p>
          ) : null}

          <div className="flex justify-between w-full max-w-[320px] mt-6">
            <Link
              to="/accounts/list"
              className="inline-flex items-center justify-center h-9 px-3 border border-border-strong bg-secondarybtnbg text-secondarybtntext font-heading text-small hover:bg-secondarybtnhoverbg hover:text-primarybtntext rounded-4xl transition-colors"
              >
              Cancelar
            </Link>

            <Buttom
              variant="primary"
              size="sm"
              type="button"
              disabled={saving}
              onClick={() => setIsConfirmModalOpen(true)}
            >
              {saving ? "Guardando…" : "Actualizar"}
            </Buttom>
          </div>
        </section>
      </form>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar actualización de datos del usuario"
        message="¿Está seguro que desea actualizar los datos del usuario?"
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
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate("/accounts/list", { replace: true });
        }}
        title="Usuario actualizado"
        message="El usuario se ha actualizado correctamente."
      >
        <div className="flex flex-col gap-4 items-center">
          <Link
            to="/accounts/list"
            className="border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label px-4 py-2 rounded-4xl transition-colors"
          >
            Ir al listado
          </Link>
        </div>
      </Modal>
    </div>
  );
}
