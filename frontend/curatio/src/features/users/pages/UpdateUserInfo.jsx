import Input from "@/shared/components/Input";
import Buttom from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import FileInput from "@/shared/components/FileInputCreateUser";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { CircleArrowLeft } from "lucide-react";
import avatar from "@/assets/images/avatar.png";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getMyProfile, patchMyProfile } from "@/lib/http/users";
import { adaptBackendUserToUi } from "@/lib/adapters/userAdapter";

/** ISO o string de fecha → YYYY-MM-DD para inputs type="date" (mismo criterio que UpdateRolPage). */
function toDateInputValue(value) {
  if (!value) return "";
  if (typeof value === "string") {
    return value.length >= 10 ? value.slice(0, 10) : value;
  }
  return "";
}

/** Evita mostrar "0" como teléfono vacío (coherente con ProfilePage). */
function normalizeSecondaryPhone(value) {
  if (value === null || value === undefined) return "";
  const s = String(value).trim();
  if (s === "" || s === "0") return "";
  return s;
}

/** Une errores por campo del backend (VALIDATION_ERROR) para mostrarlos en la UI. */
function formatValidationFields(fields) {
  if (!fields || typeof fields !== "object") return "";
  const parts = [];
  for (const [key, val] of Object.entries(fields)) {
    const msgs = Array.isArray(val) ? val : [String(val)];
    const text = msgs.filter(Boolean).join(" ");
    if (text) parts.push(`${key}: ${text}`);
  }
  return parts.join(" · ");
}

/**
 * Formulario único: datos básicos + contacto para Cliente/Farmaceuta (PATCH /v1/people/users/me/).
 * Layout compacto en rejilla 1 → 2 → 3 columnas según ancho, sin panel interno con scroll.
 */
export default function UpdateUserInfo() {
  const navigate = useNavigate();
  const { user: sessionUser, isBootstrapping } = useAuth();

  const [documentTypes, setDocumentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [role, setRole] = useState("");

  const [formData, setFormData] = useState({
    fullNames: "",
    documentTypes: "",
    documentNumber: "",
    photoUrl: "",
    address: "",
    phoneNumber: "",
    secondaryPhone: "",
    email: "",
    confirmEmail: "",
    startDate: "",
    endDate: "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await getMyProfile();
        const user = adaptBackendUserToUi(response?.data?.user);
        if (!user) {
          navigate("/accounts/perfil", { replace: true });
          return;
        }
        const r = user.role ?? "";
        setRole(r);
        if (r !== "Cliente" && r !== "Farmaceuta") {
          navigate("/accounts/perfil", { replace: true });
          return;
        }
        const emailVal = user.email ?? "";
        setFormData({
          fullNames: user.name ?? "",
          documentTypes: user.documentType ?? "",
          documentNumber: user.documentNumber ?? "",
          photoUrl: user.photoUrl ?? "",
          address: user.address ?? "",
          phoneNumber: user.phone ?? "",
          secondaryPhone: normalizeSecondaryPhone(user.secondaryPhone),
          email: emailVal,
          confirmEmail: emailVal,
          startDate: r === "Farmaceuta" ? toDateInputValue(user.startDate) : "",
          endDate: r === "Farmaceuta" ? toDateInputValue(user.endDate) : "",
        });
        setPhotoFile(null);
      } catch (e) {
        console.error(e);
        navigate("/accounts/perfil", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    if (isBootstrapping) return;
    if (!sessionUser?.id) return;
    load();
  }, [sessionUser?.id, isBootstrapping, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoFileChange = (file) => {
    setPhotoFile(file ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (formData.email !== formData.confirmEmail) {
      setSubmitError("Los correos no coinciden.");
      return;
    }

    if (role === "Farmaceuta" && (!formData.startDate || !formData.endDate)) {
      setSubmitError("Las fechas de inicio y fin son obligatorias para farmaceuta.");
      return;
    }

    const dir = (formData.address || "").trim();
    if (dir.length > 0 && dir.length < 10) {
      setSubmitError("La dirección debe tener al menos 10 caracteres.");
      return;
    }

    const merged = {
      fullNames: formData.fullNames,
      documentTypes: formData.documentTypes,
      documentNumber: formData.documentNumber,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      secondaryPhone: formData.secondaryPhone,
      address: formData.address,
      startDate: role === "Farmaceuta" ? formData.startDate : "",
      endDate: role === "Farmaceuta" ? formData.endDate : "",
    };

    setSaving(true);
    try {
      await patchMyProfile(merged, photoFile instanceof File ? photoFile : null);
      navigate("/accounts/perfil");
    } catch (err) {
      const base = err?.error?.message || "No se pudo guardar los cambios.";
      const detail = formatValidationFields(err?.error?.fields);
      setSubmitError(detail ? `${base} ${detail}` : base);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-label">
        Cargando formulario...
      </div>
    );
  }

  const isFarmaceuta = role === "Farmaceuta";

  return (
    <div className="min-h-0 w-full flex justify-center text-label px-3 py-4 sm:px-4 sm:py-6">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-5xl rounded-2xl bg-white/70 px-4 py-5 shadow-xl ring-1 ring-black/5 backdrop-blur-md dark:bg-neutral-900/25 sm:px-6 sm:py-6"
      >
        <Link
          to="/accounts/perfil"
          className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 sm:left-3 sm:top-3"
          aria-label="Volver al perfil"
        >
          <CircleArrowLeft className="size-7 text-label" />
        </Link>

        <h2 className="mb-1 pl-11 text-center text-base font-bold text-label sm:pl-12 sm:text-left sm:text-lg">
          Editar mi información
        </h2>
        <p className="mb-3 pl-11 text-center text-xs text-label/70 sm:mb-4 sm:pl-12 sm:text-left">
          Datos básicos y de contacto
        </p>

        {submitError ? (
          <p className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-xs text-red-700 sm:text-sm">
            {submitError}
          </p>
        ) : null}

        {/* Foto (1 col) + formulario en rejilla de 2 columnas (md+): nombre ocupa el ancho completo del formulario */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(160px,220px)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-[200px] lg:max-w-none">
              <FileInput
                label="Foto"
                accept="image/*"
                defaultImage={formData.photoUrl ?? avatar}
                previewSize={80}
                onFileChange={handlePhotoFileChange}
              />
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
            <Input
              label="Nombres y apellidos"
              placeholder="Juan Rivera Grisales"
              name="fullNames"
              onChange={handleChange}
              value={formData.fullNames}
              wrapperClassName="w-full md:col-span-2"
            />

            <Select
              label="Tipo de documento"
              name="documentTypes"
              options={documentTypes}
              placeholder="Tipo"
              wrapperClassName="w-full min-w-0"
              value={formData.documentTypes}
              onChange={handleChange}
            />
            <Input
              label="Número de documento"
              placeholder="123456789"
              type="text"
              inputMode="numeric"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              wrapperClassName="w-full min-w-0"
            />

            <Input
              label="Dirección"
              placeholder="Calle 123 #45-67"
              name="address"
              value={formData.address}
              onChange={handleChange}
              wrapperClassName="w-full md:col-span-2"
            />

            <Input
              label="Teléfono principal"
              placeholder="3001234567"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              wrapperClassName="w-full min-w-0"
            />
            <Input
              label="Teléfono secundario"
              placeholder="Opcional"
              type="tel"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
              wrapperClassName="w-full min-w-0"
            />

            <Input
              label="Correo electrónico"
              placeholder="juan@ejemplo.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              wrapperClassName="w-full min-w-0"
            />
            <Input
              label="Confirmar correo"
              placeholder="juan@ejemplo.com"
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              wrapperClassName="w-full min-w-0"
            />

            {isFarmaceuta ? (
              <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-4 md:col-span-2">
                <Input
                  label="Fecha inicio"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  wrapperClassName="w-full min-w-0"
                />
                <Input
                  label="Fecha fin"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  wrapperClassName="w-full min-w-0"
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4 dark:border-white/10 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/accounts/cambiar-contrasena" className="w-full sm:w-auto">
            <Buttom variant="primary" size="sm" type="button" className="w-full sm:w-auto">
              Actualizar contraseña
            </Buttom>
          </Link>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            <Link to="/accounts/perfil">
              <Buttom variant="secondary" size="sm" type="button">
                Cancelar
              </Buttom>
            </Link>
            <Buttom variant="primary" size="sm" type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </Buttom>
          </div>
        </div>
      </form>
    </div>
  );
}
