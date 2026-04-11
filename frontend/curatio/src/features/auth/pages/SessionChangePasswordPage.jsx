import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";
// Reutiliza el mismo formulario visual y reglas de validación que el flujo por correo (uid/token).
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { changePasswordWithSession } from "@/lib/http/identity";

/**
 * Pantalla protegida: cambio de contraseña estando logueado.
 * Usa ResetPasswordForm y el endpoint POST /v1/identity/session/password/.
 */
export default function SessionChangePasswordPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async ({ password, confirmPassword }) => {
    try {
      setSubmitting(true);
      setServerError("");
      await changePasswordWithSession({ password, confirmPassword });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setServerError(
        err?.error?.message || "No se pudo cambiar la contraseña. Inténtalo de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden px-4">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-body font-bold text-label">CURATIO</h1>
              <p className="text-sm text-label/80 mt-1 font-body">
                Actualizar contraseña
              </p>
            </div>

            {!success ? (
              <>
                <p className="text-sm text-label/80 mb-5 text-center">
                  Ingresa tu nueva contraseña y confírmala. Debe cumplir la política de seguridad del
                  sistema.
                </p>
                <ResetPasswordForm
                  loading={submitting}
                  serverError={serverError}
                  onBack={() => navigate("/accounts/perfil")}
                  onSubmit={handleSubmit}
                />
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-sm text-label">Tu contraseña fue actualizada correctamente.</p>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={() => navigate("/accounts/perfil", { replace: true })}
                >
                  Volver al perfil
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
