import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CLEAR_UI_STATE_ON_AUTH_END } from "@/lib/auth/sessionEvents";
import { createUser } from "../../../lib/http/users";
import { buildCreateUserFormData } from "@/lib/adapters/userAdapter";
import { UserSchema } from "../schemas/UserSchemas";

/**
 * Contexto del wizard de creación de usuario.
 */
const CreateUserWizardContext = createContext(null);

/**
 * Estado inicial del wizard.
 */
const initialWizardState = {
  fullNames: "",
  documentTypes: "",
  documentNumber: "",
  photoFile: null,

  address: "",
  phoneNumber: "",
  secondaryPhone: "",
  email: "",
  confirmEmail: "",

  roles: "",
  startDate: "",
  endDate: "",
};

/**
 * Provider del wizard.
 */
export function CreateUserWizardProvider({ children }) {
  // Estado centralizado de todo el wizard
  const [formData, setFormData] = useState(initialWizardState);

  // Errores por campo
  const [errors, setErrors] = useState({});

  // Error general
  const [generalError, setGeneralError] = useState("");

  // Loading de submit final
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Éxito final
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const onAuthEnd = () => {
      setFormData(initialWizardState);
      setErrors({});
      setGeneralError("");
      setIsSubmitting(false);
      setIsSuccess(false);
    };
    window.addEventListener(CLEAR_UI_STATE_ON_AUTH_END, onAuthEnd);
    return () => window.removeEventListener(CLEAR_UI_STATE_ON_AUTH_END, onAuthEnd);
  }, []);

  /**
   * Actualiza parcialmente el estado del wizard.
   */
  const updateFormData = (partialData) => {
    setFormData((prev) => ({
      ...prev,
      ...partialData,
    }));
  };

  /**
   * Limpia wizard completo.
   */
  const resetWizard = () => {
    setFormData(initialWizardState);
    setErrors({});
    setGeneralError("");
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  /**
   * Mapea errores backend a nombres UI.
   */
  const mapBackendErrorsToUiFields = (backendFields = {}) => {
    const fieldMap = {
      nombre: "fullNames",
      tipo_documento: "documentTypes",
      numero_documento: "documentNumber",
      rol: "roles",
      fecha_inicio: "startDate",
      fecha_fin: "endDate",
      email: "email",
      confirmar_email: "confirmEmail",
      telefono: "phoneNumber",
      telefono_secundario: "secondaryPhone",
      direccion: "address",
      foto: "photoFile",
      __all__: "general",
    };

    const normalized = {};

    Object.entries(backendFields).forEach(([key, value]) => {
      const uiKey = fieldMap[key] ?? key;
      normalized[uiKey] = Array.isArray(value) ? value[0] : String(value);
    });

    return normalized;
  };

  /**
   * Submit final del wizard.
   * Hace una sola transacción al backend.
   */
  const submitWizard = async () => {
    // Validación final global
    const result = UserSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      setGeneralError("");
      return { ok: false, errors: fieldErrors };
    }

    try {
      setIsSubmitting(true);
      setGeneralError("");
      setErrors({});

      const payload = buildCreateUserFormData(formData);
      const response = await createUser(payload);

      setIsSuccess(true);

      return {
        ok: true,
        response,
      };
    } catch (error) {
      const backendFields = error?.error?.fields ?? {};
      const normalizedErrors = mapBackendErrorsToUiFields(backendFields);

      setErrors(normalizedErrors);
      setGeneralError(error?.error?.message || "No se pudo crear el usuario.");

      return {
        ok: false,
        errors: normalizedErrors,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = useMemo(
    () => ({
      formData,
      errors,
      generalError,
      isSubmitting,
      isSuccess,
      updateFormData,
      resetWizard,
      submitWizard,
      setErrors,
      setGeneralError,
      setIsSuccess,
    }),
    [formData, errors, generalError, isSubmitting, isSuccess]
  );

  return (
    <CreateUserWizardContext.Provider value={value}>
      {children}
    </CreateUserWizardContext.Provider>
  );
}

/**
 * Hook de consumo del contexto.
 */
export function useCreateUserWizard() {
  const context = useContext(CreateUserWizardContext);

  if (!context) {
    throw new Error("useCreateUserWizard must be used inside CreateUserWizardProvider");
  }

  return context;
}