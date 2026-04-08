import { useState } from "react";
import { User, Cross, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
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
      className={`relative z-50 w-full border-b transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-[100]"
          : "bg-[#98e3f4] border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="relative flex flex-wrap items-center gap-y-2 gap-x-2 py-2 md:h-16 md:flex-nowrap md:gap-4 md:py-0">
          {/* =========================
              MARCA
             ========================= */}
          <div className="order-1 flex shrink-0 items-center">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-tittles font-heading font-body text-label sm:gap-2"
            >
              <Cross
                className="size-10 shrink-0 fill-label stroke-label [stroke-linecap:square] [stroke-linejoin:miter] md:size-12"
                strokeWidth={2}
              />
              <span className="max-[380px]:hidden md:inline">Curatio</span>
            </Link>
          </div>

          {/* =========================
              MENÚ PRINCIPAL
             ========================= */}
          <ul className="order-2 hidden items-center gap-6 font-body font-heading text-small text-label md:flex">
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

          {open && (
            <div className="absolute top-full left-0 z-50 mt-2 w-full border-t border-border bg-[#98e3f4] md:hidden">
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
              BUSCADOR INTERNO (una sola instancia; orden distinto en móvil vs escritorio)
             ========================= */}
          <div className="order-4 w-full min-w-0 basis-full md:order-3 md:w-[320px] md:max-w-[320px] md:basis-auto md:shrink-0">
            <MedicationSearchBar
              source="backoffice"
              placeholder="Buscar medicamentos..."
              className="w-full min-w-0 text-label"
            />
          </div>

          {/* =========================
              HAMBURGUESA + ACCIONES DERECHA
             ========================= */}
          <div className="order-3 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 md:order-4 md:ml-0 md:gap-4">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex shrink-0 rounded-full p-2 hover:bg-white/40 transition md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? (
                <X size={20} className="text-label" />
              ) : (
                <Menu size={20} className="text-label" />
              )}
            </button>

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

            <div className="flex items-center [&_button]:h-9 [&_button]:w-9 sm:[&_button]:h-10 sm:[&_button]:w-10">
              <SalesNotificationsBell />
            </div>

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