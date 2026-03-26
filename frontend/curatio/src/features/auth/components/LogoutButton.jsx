// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/features/auth/context/AuthContext";
// import Button from "@/shared/components/Button";

// export default function LogoutButton({ className = "" }) {
//   const navigate = useNavigate();
//   const { signOut } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       await signOut();
//       navigate("/login", { replace: true });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       type="button"
//       variant="secondary"
//       size="sm"
//       onClick={handleLogout}
//       disabled={loading}
//       className={className}
//     >
//       {loading ? "Signing out..." : "Logout"}
//     </Button>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import Button from "@/shared/components/Button";

/**
 * Botón reutilizable de logout real.
 */
export default function LogoutButton({
  className = "",
  onLoggedOut,
  children,
}) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      onLoggedOut?.();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className={className}
    >
      {loading ? "Signing out..." : (children ?? "Logout")}
    </Button>
  );
}