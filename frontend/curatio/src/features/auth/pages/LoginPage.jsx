// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoginForm from "@/features/auth/components/LoginForm";
// import { useAuth } from "@/features/auth/context/AuthContext";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const { signIn } = useAuth();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async ({ email, password, remember }) => {
//     try {
//       setError("");
//       setLoading(true);

//       await signIn({ email, password, remember });
//       // temporal, borrar 
//       alert("Login successful");
//       navigate("/home", { replace: true });
     
//     } catch (err) {
//       console.error(err);
//       setError(
//         err?.error?.message || "Invalid credentials or connection error."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-4 py-10">
//       <div className="w-full max-w-md">
//         <div
//           className="
//             rounded-3xl
//             border border-white
//             text-label
//             bg-white/70 dark:bg-neutral-900/20
//             backdrop-blur-md
//             shadow-xl
//             ring-1 ring-white
//             px-6 py-8 sm:px-8 sm:py-10
//           "
//         >
//           <LoginForm
//             onSubmit={handleLogin}
//             loading={loading}
//             error={error}
//             onForgotPassword={() => navigate("/forgot-password")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * Devuelve la ruta por defecto después del login según rol.
 */
function getDefaultPostLoginPath(user) {
  if (!user?.role) return "/home";

  switch (user.role) {
    case "Administrador":
      return "/dashboard";
    case "Farmaceuta":
      return "/home";
    case "Cliente":
      return "/home";
    default:
      return "/home";
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password, remember }) => {
    try {
      setError("");
      setLoading(true);

      const authenticatedUser = await signIn({ email, password, remember });

      // Si el usuario venía de una ruta protegida, priorizar ese destino
      const from = location.state?.from;
      const fallbackPath = getDefaultPostLoginPath(authenticatedUser);

      navigate(from || fallbackPath, { replace: true });
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
          />
        </div>
      </div>
    </div>
  );
}