// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "@/features/auth/context/AuthContext";

// export default function ProtectedRoute({ allowedRoles = [] }) {
//   const { isAuthenticated, isBootstrapping, user } = useAuth();
//   const location = useLocation();

//   if (isBootstrapping) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-label">
//         Loading session...
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/home" replace />;
//   }

//   return <Outlet />;
// }

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, isBootstrapping, user } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center text-label">
        Loading session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}