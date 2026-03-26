// import { Search, User, Cross, ShoppingCart } from "lucide-react";
// import { Link } from "react-router-dom";
// import LogoutButton from "@/features/auth/components/LogoutButton";
// import { useCart } from "@/features/cartshop/context/CartContext";
// import { useAuth } from "@/features/auth/context/AuthContext";
// import { IconButton } from "@/shared/components";
// import {Dropdown, DropdownTrigger, DropdownContent,DropdownItem} from "@/shared/components";

// /**
//  * Navbar
//  * ------
//  * Navbar principal del sistema.
//  *
//  * Fuente real de autenticación:
//  * - useAuth()
//  * Ya NO depende de localStorage.
//  */
// const Navbar = ({ variant = "solid" }) => {
//   const { cartCount } = useCart();
//   const { isAuthenticated, user } = useAuth();

//   return (
//     <nav
//       className={`w-full border-b transition-colors duration-300 ${
//         variant === "transparent"
//           ? "bg-transparent border-transparent absolute top-0 left-0 z-100"
//           : "bg-background border-border"
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Marca */}
//           <div className="flex items-center">
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

//           {/* Menú principal */}
//           <ul className="hidden md:flex items-center gap-6 font-body font-heading text-small text-label">
//             <li>
//               <Link to="/" className="hover:text-primary transition">
//                 Gestion de grupos
//               </Link>
//             </li>
//             <li>
//               <Link to="/accounts/list" className="hover:text-primary transition">
//                 Usuarios
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/suppliers/listar-proveedores"
//                 className="hover:text-primary transition"
//               >
//                 Proveedores
//               </Link>
//             </li>
//             <li>
//               <Link to="/products/listar" className="hover:text-primary transition">
//                 Productos
//               </Link>
//             </li>
//             <li>
//               <Link to="/cartshop/list-cartshop" className="hover:text-primary transition">
//                 Carrito
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/sales/factura-electronica"
//                 className="hover:text-primary transition"
//               >
//                 Ventas
//               </Link>
//             </li>
//           </ul>

//           {/* Derecha */}
//           <div className="flex items-center gap-4">
//             {/* Buscador */}
//             <div className="flex items-center gap-4">
//               <div className="relative hidden sm:block text-black font-body">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

//                 <input
//                   type="text"
//                   placeholder="Buscar..."
//                   className="
//                     pl-9 pr-4 py-2.5 border rounded-lg
//                     text-body placeholder:text-placeholder
//                     focus:outline-none focus:ring-1 focus:ring-black
//                     border-border-strong
//                   "
//                 />
//               </div>

//               {/* Carrito */}
//               <button
//                 type="button"
//                 className="
//                   relative hidden sm:flex items-center justify-center
//                   size-10 rounded-full border hover:bg-surface
//                   transition border-border-strong ml-4
//                 "
//               >
//                 <ShoppingCart className="size-5 text-label" />
//                 {/* {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
//                     {cartCount}
//                   </span>
//                 )} */}
//                 {isAuthenticated && cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Dropdown de usuario */}
//             <Dropdown>
//               <DropdownTrigger>
//                 <IconButton arialLabel="Menu de Usuario">
//                   <User className="size-5 text-label" />
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

// export default Navbar;

import { Search, User, Cross, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { IconButton } from "@/shared/components";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/shared/components";

/**
 * Navbar
 * ------
 * Navbar principal del sistema.
 *
 * Ajuste importante:
 * - El botón del carrito ahora sí navega a la vista del carrito actual
 * - El badge rojo sigue mostrando la cantidad real
 * - Se conserva la estructura visual existente
 */
const Navbar = ({ variant = "solid" }) => {
  const { cartCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  return (
    <nav
      className={`w-full border-b transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-100"
          : "bg-[#98e3f4] border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* =========================
              MARCA
             ========================= */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-tittles font-heading font-body text-label"
            >
              <Cross
                className="size-12 fill-label stroke-label [stroke-linecap:square] [stroke-linejoin:miter]"
                strokeWidth={2}
              />
              Curatio
            </Link>
          </div>

          {/* =========================
              MENÚ PRINCIPAL
             ========================= */}
          <ul className="hidden md:flex items-center gap-6 font-body font-heading text-small text-label">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Gestion de grupos
              </Link>
            </li>
            <li>
              <Link
                to="/accounts/list"
                className="hover:text-primary transition"
              >
                Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/suppliers/listar-proveedores"
                className="hover:text-primary transition"
              >
                Proveedores
              </Link>
            </li>
            <li>
              <Link
                to="/products/listar"
                className="hover:text-primary transition"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/cartshop/list-cartshop"
                className="hover:text-primary transition"
              >
                Carritos
              </Link>
            </li>
            <li>
              <Link
                to="/sales/factura-electronica"
                className="hover:text-primary transition"
              >
                Ventas
              </Link>
            </li>
          </ul>

          {/* =========================
              DERECHA
             ========================= */}
          <div className="flex items-center gap-4">
            {/* Buscador */}
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block text-black font-body">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

                <input
                  type="text"
                  placeholder="Buscar..."
                  className="
                    pl-9 pr-4 py-2.5 border rounded-lg
                    text-body placeholder:text-placeholder
                    focus:outline-none focus:ring-1 focus:ring-black
                    border-border-strong
                  "
                />
              </div>

              {/* =========================
                  BOTÓN DE CARRITO
                 =========================                 
                  ahora lleva a la vista real del carrito actual si no tiene nada no muestra icono en 0 .
               */}
              <Link
                to="/cartshop/ver-carrito"
                className="
                  relative hidden sm:flex items-center justify-center
                  size-10 rounded-full border hover:bg-surface
                  transition border-border-strong ml-4
                "
              >
                <ShoppingCart className="size-5 text-label" />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* =========================
                DROPDOWN DE USUARIO
               ========================= */}
            <Dropdown>
              <DropdownTrigger>
                <IconButton arialLabel="Menu de Usuario">
                  <User className="size-5 text-label" />
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
                      <Link to="/perfil" className="block w-full">
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
                      <LogoutButton className="w-full" />
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

export default Navbar;