// import { useState } from "react";
// import {useNavigate } from "react-router-dom";
// import Button from "@/shared/components/Button";
// import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// export default function ResetPasswordPage() {
//   const navigate = useNavigate();  

//   const [submitting, setSubmitting] = useState(false);
//   const [serverError, setServerError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleReset = async ({ password }) => {
//     try {
//       setSubmitting(true);
//       setServerError("");

//       console.log("Reset password payload:", {newPassword: password });

//       await new Promise((r) => setTimeout(r, 800));

//       setSuccess(true);
//     } catch (err) {
//       console.error(err);
//       setServerError("No se pudo cambiar la contraseña. Inténtalo de nuevo.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
//       <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
//       <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

//       <div className="w-full max-w-md">
//         <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
//           <div className="px-7 py-8">
//             <div className="mb-6 text-center">
//               <h1 className="text-2xl font-body font-bold text-label">CURATIO</h1>
//               <p className="text-sm text-label/80 mt-1 font-body">
//                 Restablecer contraseña
//               </p>
//             </div>

//             {!success ? (
//               <>
//                 <p className="text-sm text-label/80 mb-5 text-center">
//                   Ingresa tu nueva contraseña y confírmala para finalizar.
//                 </p>

//                 <ResetPasswordForm
//                   loading={submitting}
//                   serverError={serverError}
//                   onBack={() => navigate("/send-token")}
//                   onSubmit={handleReset}
//                 />
//               </>
//             ) : (
//               <div className="text-center space-y-4">
//                 <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
//                   <p className="text-sm text-label">
//                     Tu contraseña fue actualizada correctamente.
//                   </p>
//                   <p className="text-xs text-label/70 mt-2">
//                     Ya puedes iniciar sesión con tu nueva contraseña.
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-center gap-6">
//                   <Button
//                     variant="primary"
//                     size="md"
//                     type="button"
//                     onClick={() => navigate("/login", { replace: true })}
//                   >
//                     Ir a login
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <p className="text-center text-xs text-label/80 mt-5">
//           Al continuar aceptas nuestros Términos y Política de Privacidad.
//         </p>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import {
  confirmPasswordRecovery,
  validatePasswordRecoveryToken,
} from "@/lib/http/identity";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validatingLink, setValidatingLink] = useState(true);

  /**
   * Obtiene uid/token desde:
   * 1. state de navegación (flujo token manual)
   * 2. query params del correo (flujo link directo)
   */
  const recoveryContext = useMemo(() => {
    const query = new URLSearchParams(location.search);

    return {
      uid: location.state?.uid || query.get("uid") || "",
      token: location.state?.token || query.get("token") || "",
    };
  }, [location]);

  /**
   * Valida el contexto de recuperación al cargar la vista.
   */
  useEffect(() => {
    const runValidation = async () => {
      try {
        setValidatingLink(true);
        setServerError("");

        if (!recoveryContext.uid || !recoveryContext.token) {
          setServerError("El enlace o contexto de recuperación no es válido.");
          return;
        }

        await validatePasswordRecoveryToken({
          uid: recoveryContext.uid,
          token: recoveryContext.token,
        });
      } catch (err) {
        console.error(err);
        setServerError(
          err?.error?.message || "El enlace de recuperación es inválido o expiró."
        );
      } finally {
        setValidatingLink(false);
      }
    };

    runValidation();
  }, [recoveryContext]);

  /**
   * Ejecuta cambio real de contraseña.
   */
  const handleReset = async ({ password, confirmPassword }) => {
    try {
      setSubmitting(true);
      setServerError("");

      await confirmPasswordRecovery({
        uid: recoveryContext.uid,
        token: recoveryContext.token,
        password,
        confirmPassword,
      });

      // Limpieza de recovery context manual
      sessionStorage.removeItem("password_recovery_uid");
      sessionStorage.removeItem("password_recovery_email");

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setServerError(
        err?.error?.message || "No se pudo cambiar la contraseña. Inténtalo de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (validatingLink) {
    return (
      <div className="min-h-[80vh] w-full flex items-center justify-center text-label">
        Validando enlace de recuperación...
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-body font-bold text-label">CURATIO</h1>
              <p className="text-sm text-label/80 mt-1 font-body">
                Restablecer contraseña
              </p>
            </div>

            {!success ? (
              <>
                <p className="text-sm text-label/80 mb-5 text-center">
                  Ingresa tu nueva contraseña y confírmala para finalizar.
                </p>

                <ResetPasswordForm
                  loading={submitting}
                  serverError={serverError}
                  onBack={() => navigate("/send-token")}
                  onSubmit={handleReset}
                />
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-sm text-label">
                    Tu contraseña fue actualizada correctamente.
                  </p>
                  <p className="text-xs text-label/70 mt-2">
                    Ya puedes iniciar sesión con tu nueva contraseña.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={() => navigate("/login", { replace: true })}
                  >
                    Ir a login
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