// import { Search, User, Cross, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
// import LogoutButton from "@/features/auth/components/LogoutButton";
// import { useCart } from "@/features/cartshop/context/CartContext";
// import { useAuth } from "@/features/auth/context/AuthContext";
// import { IconButton } from "@/shared/components";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownContent,
//   DropdownItem,
// } from "@/shared/components";

// /**
//  * NavBarClient
//  * -----------
//  * Variante del navbar para la vista pública (home).
//  * - Sin links de gestión (Grupos/Usuarios/Proveedores/Productos/Carritos/Ventas)
//  * - El buscador ocupa el espacio disponible
//  */
// const NavBarClient = ({ variant = "solid" }) => {
//   const { cartCount } = useCart();
//   const { isAuthenticated, user } = useAuth();

//   return (
//     <nav
//       className={`w-full border-b transition-colors duration-300 ${
//         variant === "transparent"
//           ? "bg-transparent border-transparent absolute top-0 left-0 z-100"
//           : "bg-[#98e3f4] border-border"
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-16 items-center gap-4">
//           {/* Marca */}
//           <div className="flex items-center flex-shrink-0">
//             <Link
//               to="/"
//               className="flex items-center gap-2 text-tittles font-heading font-body text-label"
//             >
//               <Cross
//                 className="size-12 fill-label stroke-label [stroke-linecap:square] [stroke-linejoin:miter]"
//                 strokeWidth={2}
//               />
//               Curatio
//             </Link>
//           </div>

//           {/* Buscador (ocupa el espacio del menú eliminado) */}
//           <div className="flex-1 hidden sm:flex items-center">
//             <div className="relative w-full text-black font-body">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Buscar..."
//                 className="
//                   w-full pl-9 pr-4 py-2.5 border rounded-lg
//                   text-body placeholder:text-placeholder
//                   focus:outline-none focus:ring-1 focus:ring-black
//                   border-border-strong
//                 "
//               />
//             </div>
//           </div>

//           {/* Derecha */}
//           <div className="flex items-center gap-4 flex-shrink-0">
//             {/* Carrito */}
//             <Link
//               to="/cartshop/ver-carrito"
//               className="
//                 relative hidden sm:flex items-center justify-center
//                 size-10 rounded-full border hover:bg-surface
//                 transition border-border-strong
//               "
//             >
//               <ShoppingCart className="size-5 text-label" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Dropdown de usuario */}
//             <Dropdown>
//               <DropdownTrigger>
//                 <IconButton arialLabel="Menu de Usuario" className="
//                 relative hidden sm:flex items-center justify-center
//                 rounded-full border hover:bg-surface
//                 transition border-border-strong
//               ">
//                   <User className="size-5 text-label " />
//                 </IconButton>
//               </DropdownTrigger>

//               <DropdownContent className="right-0 w-56">
//                 {!isAuthenticated && (
//                   <DropdownItem>
//                     <Link to="/login" className="block w-full">
//                       Iniciar sesión
//                     </Link>
//                   </DropdownItem>
//                 )}

//                 {isAuthenticated && (
//                   <>
//                     <DropdownItem>
//                       <Link to="/perfil" className="block w-full">
//                         Perfil
//                       </Link>
//                     </DropdownItem>

//                     {user?.role === "Administrador" && (
//                       <DropdownItem>
//                         <Link to="/accounts/list" className="block w-full">
//                           Gestión de usuarios
//                         </Link>
//                       </DropdownItem>
//                     )}

//                     <DropdownItem>
//                       <LogoutButton className="w-full" />
//                     </DropdownItem>
//                   </>
//                 )}
//               </DropdownContent>
//             </Dropdown>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBarClient;


import { User, Cross, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import logoCuratio from "@/assets/images/Curatio.png";
import { IconButton } from "@/shared/components";
import MedicationSearchBar from "@/features/products/components/MedicationSearchBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/shared/components";

/**
 * NavBarClient
 * ------------
 * Navbar público / comercial.
 *
 * Responsabilidades:
 * - mostrar marca
 * - mostrar buscador comercial/público
 * - mostrar acceso al carrito
 * - mostrar acceso a login / perfil
 *
 * Importante:
 * - este navbar lo usa el cliente o visitante
 * - el buscador consulta backend real
 * - el carrito puede verse incluso sin login
 */
const NavBarClient = ({ variant = "solid" }) => {
  /**
   * Estado global del carrito actual.
   */
  const { cartCount } = useCart();

  /**
   * Estado global de autenticación.
   */
  const { isAuthenticated, user } = useAuth();

  return (
    <nav
      className={`relative z-50 w-full border-b transition-colors duration-300 mt-4 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-[100]"
          : "bg-[#98e3f4] border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex min-h-16 items-center gap-2 py-2 sm:gap-4 sm:py-0">
          {/* =========================
              MARCA
             ========================= */}
          <div className="flex shrink-0 items-center">
            <Link
              to="/"
              className="flex items-center"
            >
              <img
                src={logoCuratio}
                alt="Curatio Logo"
                className="h-18 w-auto drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)] "
              />
            </Link>
          </div>
          {/* =========================
              BUSCADOR PÚBLICO
             =========================
              - ocupa el espacio central del navbar
              - busca medicamentos reales en backend
              - funciona para cliente y visitante
              - min-w-0 permite que el input encaje en pantallas estrechas
           */}
          <div className="flex min-w-0 flex-1 items-center">
            <MedicationSearchBar
              source="dashboard"
              placeholder="Buscar medicamentos..."
              className="w-full min-w-0 text-label"
            />
          </div>

          {/* =========================
              ACCIONES DERECHA
             ========================= */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
            {/* =========================
                BOTÓN DE CARRITO
               ========================= */}
            <Link
              to="/cartshop/ver-carrito"
              className="
                relative flex size-9 items-center justify-center rounded-full border
                hover:bg-surface transition border-border-strong
                sm:size-10
              "
            >
              <ShoppingCart className="size-[1.125rem] text-label sm:size-5" />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* =========================
                DROPDOWN DE USUARIO
               ========================= */}
            <Dropdown>
              <DropdownTrigger>
                <IconButton
                  arialLabel="Menu de Usuario"
                  className="
                    relative flex size-9 items-center justify-center rounded-full border
                    hover:bg-surface transition border-border-strong
                    sm:size-10
                  "
                >
                  <User className="size-[1.125rem] text-label sm:size-5" />
                </IconButton>
              </DropdownTrigger>

              <DropdownContent className="right-0 w-56">
                {!isAuthenticated && (
                  <DropdownItem>
                    <Link to="/login" className="block w-full">
                      Iniciar sesión
                    </Link>
                  </DropdownItem>
                )}

                {isAuthenticated && (
                  <>
                    <DropdownItem>
                      <Link
                        to={
                          user?.id != null
                            ? `/accounts/perfil/${user.id}`
                            : "/perfil"
                        }
                        className="block w-full"
                      >
                        Perfil
                      </Link>
                    </DropdownItem>

                    {user?.role === "Administrador" && (
                      <DropdownItem>
                        <Link to="/accounts/list" className="block w-full">
                          Gestión de usuarios
                        </Link>
                      </DropdownItem>
                    )}

                    <DropdownItem>
                      <LogoutButton className="w-full">
                        Cerrar sesión
                      </LogoutButton>
                    </DropdownItem>
                  </>
                )}
              </DropdownContent>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarClient;
