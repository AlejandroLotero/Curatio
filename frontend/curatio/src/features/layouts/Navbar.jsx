import { useState } from "react";
import { User, Cross, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoCuratio from "@/assets/images/Curatio.png";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useCart } from "@/features/cartshop/context/CartContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { IconButton } from "@/shared/components";
import MedicationSearchBar from "@/features/products/components/MedicationSearchBar";
import SalesNotificationsBell from "@/features/sales/components/SalesNotificationsBell";
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
      className={`relative z-50 w-full border-b transition-colors duration-300 mt-4 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-[100]"
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
              className="flex items-center"
            >
              <img
                src={logoCuratio}
                alt="Curatio Logo"
                className="h-18 w-auto"
              />
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

            <SalesNotificationsBell />

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
                    <DropdownItem> {/* Perfil propio o el de la URL */}
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

export default Navbar;