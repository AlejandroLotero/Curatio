import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password, remember }) => {
    try {
      setError("");
      setLoading(true);

      // TODO: aquí va tu llamada real a backend
      console.log("Login payload:", { email, password, remember });

      // Simulación
      await new Promise((r) => setTimeout(r, 700));

    
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-5 w-125 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Fondo con “luces” suaves */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      {/* Card glass */}
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/20 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)] border border-black/30">
          <div className="px-7 py-8">
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
              onForgotPassword={() => navigate("/forgot-password")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}