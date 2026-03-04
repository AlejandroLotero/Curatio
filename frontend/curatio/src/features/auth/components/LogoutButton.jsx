import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";

export default function LogoutButton({
  onLogout,                
  redirectTo = "/",     
  clearStorage = true,      
  variant = "secondary",
  size = "sm",
  children = "Cerrar sesión",
  onClick,
  ...props
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onClick) onClick(e);
    if (loading) return;

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1200));
      localStorage.removeItem("isLoggedIn");
      window.dispatchEvent(new Event("auth-changed"));

      if (onLogout) {
        await onLogout();
      }

      if (clearStorage) {
        localStorage.removeItem("user");
        localStorage.removeItem("auth");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("auth");
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={loading}
      {...props}
    >
       {loading ? (
      <span className="flex items-center gap-2">
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
        Cerrando...
      </span>
    ) : (
      children
    )}
    </Button>
  );
}
