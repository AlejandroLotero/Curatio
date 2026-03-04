import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";

export default function LogoutButton({
  onLogout,                
  redirectTo = "/login",     
  clearStorage = true,      
  variant = "secondary",
  size = "sm",
  children = "Cerrar sesión",
  ...props
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    try {
      setLoading(true);

 
      if (onLogout) {
        await onLogout();
      }

     
      if (clearStorage) {
       
      //Sin esto  me dejaba seguir autenticado 
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
      {loading ? "Cerrando..." : children}
    </Button>
  );
}