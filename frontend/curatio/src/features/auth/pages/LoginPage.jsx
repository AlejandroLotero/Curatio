import { useState } from "react";
//Ya no se usa location porque ya no se usa el hook useLocation ya que no se usa el estado de la ruta actual
import { useNavigate } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * Devuelve la ruta por defecto después del login según rol.
 */
function getDefaultPostLoginPath(user) {
  if (!user?.role) return "/home";

  switch (user.role) {
    case "Administrador":
      return "/home";
    case "Farmaceuta":
      return "/home";
    case "Cliente":
      return "/home";
    default:
      return "/";
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password, remember }) => {
    try {
      setError("");
      setLoading(true);

      const authenticatedUser = await signIn({ email, password, remember });

      // Tras expirar sesión o cerrar sesión no se restaura la última pantalla:
      // siempre se va al inicio según rol.
      const nextPath = getDefaultPostLoginPath(authenticatedUser);
      navigate(nextPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError(
        err?.error?.message || "Invalid credentials or connection error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-md">
        <div
          className="
            rounded-3xl
            border border-white/10
            text-label
            bg-white/10 dark:bg-neutral-900/20
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
          />
        </div>
      </div>
    </div>
  );
}