import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenPasswordForm from "@/features/auth/components/TokenPasswordForm";
import { requestPasswordRecovery, validatePasswordRecoveryToken } from "@/lib/http/identity";
import logo from "@/assets/images/Curatio.png";

export default function TokenPasswordPage() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleValidateToken = async ({ token }) => {
    try {
      setSubmitting(true);
      setServerError("");

      const recoveryUid = sessionStorage.getItem("password_recovery_uid");

      if (!recoveryUid) {
        setServerError("No hay un contexto de recuperación válido. Solicita un nuevo correo.");
        return;
      }

      await validatePasswordRecoveryToken({
        uid: recoveryUid,
        token,
      });

      // Navega al reset y pasa uid/token como state
      navigate("/reset-password", {
        replace: true,
        state: {
          uid: recoveryUid,
          token,
        },
      });
    } catch (err) {
      console.error(err);
      setServerError(
        err?.error?.message || "El token es inválido o expiró. Solicita uno nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      setSubmitting(true);
      setServerError("");

      const recoveryEmail = sessionStorage.getItem("password_recovery_email");

      if (!recoveryEmail) {
        setServerError("No se encontró el correo de recuperación. Vuelve a solicitar el proceso.");
        return;
      }

      const response = await requestPasswordRecovery({ email: recoveryEmail });

      const recoveryUid = response?.data?.recovery_uid;
      if (recoveryUid) {
        sessionStorage.setItem("password_recovery_uid", recoveryUid);
      }
    } catch (err) {
      console.error(err);
      setServerError(
        err?.error?.message || "No se pudo reenviar el token."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="flex justify-center ">
              <img
                src={logo}
                alt="Curatio Logo"
                className="h-18 drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]  "
              />
            </div>
            <div className="mb-6 text-center">
              {/* <h1 className="text-2xl font-body font-bold text-label">CURATIO</h1> */}
              

              <p className="text-sm text-label/80 mt-1 font-body font-black">
                Verificar token
              </p>
            </div>

            <p className="text-sm text-label/80 mb-5 text-center">
              Por favor ingrese el TOKEN que le ha llegado a su correo
              electrónico
            </p>

            <TokenPasswordForm
              loading={submitting}
              serverError={serverError}
              onBack={() => navigate("/forgot-password")}
              onSubmit={handleValidateToken}
              onResend={handleResend}
            />
          </div>
        </div>

        <p className="text-center text-xs text-label/80 mt-5">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}