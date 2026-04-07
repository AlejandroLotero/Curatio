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
//  * Navbar
//  * ------
//  * Navbar principal del sistema.
//  *
//  * Ajuste importante:
//  * - El botón del carrito ahora sí navega a la vista del carrito actual
//  * - El badge rojo sigue mostrando la cantidad real
//  * - Se conserva la estructura visual existente
//  */
// const Navbar = ({ variant = "solid" }) => {
//   const [open, setOpen] = useState(false);
//   const { cartCount } = useCart();
//   const { isAuthenticated, user } = useAuth();

//   return (
//     <nav
//       className={`relative w-full border-b transition-colors duration-300 ${
//         variant === "transparent"
//           ? "bg-transparent border-transparent absolute top-0 left-0 z-100"
//           : "bg-[#98e3f4] border-border"
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* =========================
//               MARCA
//              ========================= */}
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

//           {/* =========================
//               MENÚ PRINCIPAL
//              ========================= */}
//           <ul className="hidden md:flex items-center gap-6 font-body font-heading text-small text-label">
//             <li>
//               <Link to="/permissions" className="hover:text-primary transition">
//                 Gestion de grupos
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/accounts/list"
//                 className="hover:text-primary transition"
//               >
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
//               <Link
//                 to="/products/listar"
//                 className="hover:text-primary transition"
//               >
//                 Productos
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/cartshop/list-cartshop"
//                 className="hover:text-primary transition"
//               >
//                 Carritos
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/sales/list"
//                 className="hover:text-primary transition"
//               >
//                 Ventas
//               </Link>
//             </li>
//           </ul>
// {/* =========================
//               MENÚ HAMBURGUESA
//              ========================= */}
//           <button
//             onClick={() => setOpen((prev) => !prev)}
//             className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
//             aria-label="Abrir menú"
//           >
//             {open ? <X size={20} className="text-black dark:text-black" /> : <Menu size={20} className="text-black dark:text-black" />}
//           </button>
//           {open && (
//             <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-slate-700 mt-2 z-50">
//               <ul className="flex flex-col px-4 py-3 gap-2">
//                 <li>
//                   <Link
//                     to="/permissions"
//                     onClick={() => setOpen(false)}
//                     className="block rounded px-3 py-2 text-white hover:bg-slate-700"
//                   >
//                     Gestión 
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/accounts/list"
//                     onClick={() => setOpen(false)}
//                     className="block rounded px-3 py-2 text-white hover:bg-slate-700"
//                   >
//                     Usuarios
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/suppliers/listar-proveedores"
//                     onClick={() => setOpen(false)}
//                     className="block rounded px-3 py-2 text-white hover:bg-slate-700"
//                   >
//                     Proveedores
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/products/listar"
//                     onClick={() => setOpen(false)}
//                     className="block rounded px-3 py-2 text-white hover:bg-slate-700"
//                   >
//                     Productos
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/cartshop/list-cartshop"
//                     onClick={() => setOpen(false)}
//                     className="block rounded px-3 py-2 text-white hover:bg-slate-700"
//                   >
//                     Carritos
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/sales/list"
//                     onClick={() => setOpen(false)}
//                     className="block rounded px-3 py-2 text-white hover:bg-slate-700"
//                   >
//                     Ventas
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//           {/* =========================
//               DERECHA
//              ========================= */}
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

//               {/* =========================
//                   BOTÓN DE CARRITO
//                  =========================                 
//                   ahora lleva a la vista real del carrito actual si no tiene nada no muestra icono en 0 .
//                */}
//               <Link
//                 to="/cartshop/ver-carrito"
//                 className="
//                   relative hidden sm:flex items-center justify-center
//                   size-10 rounded-full border hover:bg-surface
//                   transition border-border-strong ml-4
//                 "
//               >
//                 <ShoppingCart className="size-5 text-label" />

//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </div>

//             {/* =========================
//                 DROPDOWN DE USUARIO
//                ========================= */}
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
//                       <LogoutButton className="w-full">Cerrar sesión</LogoutButton>
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

import { useState } from "react";
import { User, Cross, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { IconButton } from "@/shared/components";
import MedicationSearchBar from "@/features/products/components/MedicationSearchBar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/shared/components";

/**
 * Navbar
 * ------
 * Navbar interno / administrativo.
 *
 * Lo usan:
 * - Administrador
 * - Farmaceuta
 *
 * Importante:
 * - mantiene accesos de gestión
 * - el buscador también funciona para venta en punto físico
 * - el detalle al que navega es el detalle comercial/consulta rápida
 */
const Navbar = ({ variant = "solid" }) => {
  const [open, setOpen] = useState(false);

  /**
   * Estado del carrito actual.
   */
  const { cartCount } = useCart();

  /**
   * Estado de autenticación.
   */
  const { isAuthenticated, user } = useAuth();

  return (
    <nav
      className={`relative w-full border-b transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-100"
          : "bg-[#98e3f4] border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* =========================
              MARCA
             ========================= */}
          <div className="flex items-center flex-shrink-0">
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
                to="/sales/list"
                className="hover:text-primary transition"
              >
                Ventas
              </Link>
            </li>
          </ul>

          {/* =========================
              MENÚ HAMBURGUESA
             ========================= */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full hover:bg-white/40 transition"
            aria-label="Abrir menú"
          >
            {open ? (
              <X size={20} className="text-label" />
            ) : (
              <Menu size={20} className="text-label" />
            )}
          </button>

          {open && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#98e3f4] border-t border-border mt-2 z-50">
              <ul className="flex flex-col px-4 py-3 gap-2 font-body text-label">
                <li>
                  <Link
                    to="/accounts/list"
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-white/40 transition"
                  >
                    Usuarios
                  </Link>
                </li>
                <li>
                  <Link
                    to="/suppliers/listar-proveedores"
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-white/40 transition"
                  >
                    Proveedores
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/listar"
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-white/40 transition"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cartshop/list-cartshop"
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-white/40 transition"
                  >
                    Carritos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales/list"
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-white/40 transition"
                  >
                    Ventas
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* =========================
              DERECHA
             ========================= */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* =========================
                BUSCADOR INTERNO
               =========================
                - sirve para admin y farmaceuta
                - consulta backend real
                - útil para visualización y apoyo a la venta
             */}
            <div className="hidden sm:block w-[320px]">
              <MedicationSearchBar
                source="backoffice"
                placeholder="Buscar medicamentos..."
                className="w-full text-label"
              />
            </div>

            {/* =========================
                BOTÓN DE CARRITO
               ========================= */}
            <Link
              to="/cartshop/ver-carrito"
              className="
                relative hidden sm:flex items-center justify-center
                size-10 rounded-full border hover:bg-surface
                transition border-border-strong
              "
            >
              <ShoppingCart className="size-5 text-label" />

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
                    relative hidden sm:flex items-center justify-center
                    rounded-full border hover:bg-surface
                    transition border-border-strong
                  "
                >
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

export default Navbar;