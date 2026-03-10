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

       localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/dashboard", { replace: true });
      
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">     

      <div className="w-full max-w-md">
        <div
          className="
            rounded-3xl
            border border-white
            text-label
            bg-white/70 dark:bg-neutral-900/20
            backdrop-blur-md
            shadow-xl
            ring-1 ring-white
            px-6 py-8 sm:px-8 sm:py-10
          "
        >
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
            onForgotPassword={() => navigate("/forgot-password")}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
