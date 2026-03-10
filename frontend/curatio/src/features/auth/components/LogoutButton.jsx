import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";

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
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  const handleLogout = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    // Mostrar el modal en lugar de ejecutar logout directamente
    setIsConfirmLogoutOpen(true);
    // No llamamos a onClick aquí para que el dropdown no se cierre hasta confirmar
  };

  const handleConfirmLogout = async () => {
    if (onClick) onClick();
    if (loading) return;

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1200));
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
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
      setIsConfirmLogoutOpen(false);
    }
  };

  return (
    <>
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

      <Modal isOpen={isConfirmLogoutOpen} onClose={() => setIsConfirmLogoutOpen(false)}>
        <h2 className="text-lg font-heading text-label mb-4 text-center">
          ¿Seguro deseas salir de Curatio?
        </h2>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => setIsConfirmLogoutOpen(false)}
            variant="secondary"
          >
            No, quedarme
          </Button>
          <Button
            onClick={handleConfirmLogout}
            variant="primary"
          >
            Sí, salir
          </Button>
        </div>
      </Modal>
    </>
  );
}
