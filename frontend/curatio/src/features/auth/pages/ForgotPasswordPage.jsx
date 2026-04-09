import { useState } from "react";
import Button from "@/shared/components/Button";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { requestPasswordRecovery } from "@/lib/http/identity";
import logo from "@/assets/images/Curatio.png";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleForgot = async ({ email }) => {
    try {
      setSubmitting(true);
      setServerError("");

      const response = await requestPasswordRecovery({ email });

      // Guardamos email para reenvío desde TokenPasswordPage
      sessionStorage.setItem("password_recovery_email", email);

      // Guardamos recovery uid si backend lo entrega
      const recoveryUid = response?.data?.recovery_uid;
      if (recoveryUid) {
        sessionStorage.setItem("password_recovery_uid", recoveryUid);
      } else {
        sessionStorage.removeItem("password_recovery_uid");
      }

      setSent(true);
    } catch (err) {
      console.error("Error forgot password:", err);
      setServerError(
        err?.error?.message || "No se pudo procesar la solicitud."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-transparent relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-3xl">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6 text-left">
              <h1 className="text-2xl font-body font-bold text-label">
                RECUPERAR CONTRASEÑA
              </h1>
            </div>

            {serverError ? (
              <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-700">{serverError}</p>
              </div>
            ) : null}

            {!sent ? (
              <>
              <div className="flex">
                <p className="text-sm text-label/80 mb-5 text-left">
                  Por favor ingrese el correo electronico con el que se creó el usuario en esta aplicación
                </p>
                <div className="flex items-center">
                  
                    <img
                      src={logo}
                      alt="Curatio Logo"
                      className="h-18 drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]  "
                    />
                 
                </div>
                </div>

                <ForgotPasswordForm
                  loading={submitting}
                  onBack={() => navigate("/login")}
                  onSubmit={handleForgot}
                />
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-sm text-label">
                    Si el correo existe, te enviamos un enlace para restablecer tu contraseña.
                  </p>
                  <p className="text-xs text-label/70 mt-2">
                    También puedes validar el token manualmente si lo recibiste por correo.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setSent(false)}
                  >
                    Enviar de nuevo
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={() => navigate("/send-token")}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-label/80 mt-5">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}