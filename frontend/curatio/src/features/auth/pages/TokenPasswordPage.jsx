import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenPasswordForm from "@/features/auth/components/TokenPasswordForm";

export default function TokenPasswordPage() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleValidateToken = async ({ token }) => {
    try {
      setSubmitting(true);
      setServerError("");

      console.log("Validando token:", token);

      await new Promise((r) => setTimeout(r, 700));
      if (token === "000000") throw new Error("Token inválido");

     
      navigate("/reset-password");
    } catch (err) {
      console.error(err);
      setServerError("El token es inválido o expiró. Solicita uno nuevo.");
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
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-body font-bold text-label">CURATIO</h1>
              <p className="text-sm text-label/80 mt-1 font-body">Verificar token</p>
            </div>

            <p className="text-sm text-label/80 mb-5 text-center">
              Por favor ingrese el TOKEN que le ha llegado a su correo electrónico
            </p>

            <TokenPasswordForm
              loading={submitting}
              serverError={serverError}
              onBack={() => navigate("/forgot-password")}
              onSubmit={handleValidateToken}
              onResend={() => console.log("Reenviar token")}
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