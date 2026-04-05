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
 * NavBarClient
 * -----------
 * Variante del navbar para la vista pública (home).
 * - Sin links de gestión (Grupos/Usuarios/Proveedores/Productos/Carritos/Ventas)
 * - El buscador ocupa el espacio disponible
 */
const NavBarClient = ({ variant = "solid" }) => {
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
        <div className="flex h-16 items-center gap-4">
          {/* Marca */}
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

          {/* Buscador (ocupa el espacio del menú eliminado) */}
          <div className="flex-1 hidden sm:flex items-center">
            <div className="relative w-full text-black font-body">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar..."
                className="
                  w-full pl-9 pr-4 py-2.5 border rounded-lg
                  text-body placeholder:text-placeholder
                  focus:outline-none focus:ring-1 focus:ring-black
                  border-border-strong
                "
              />
            </div>
          </div>

          {/* Derecha */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Carrito */}
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

            {/* Dropdown de usuario */}
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

export default NavBarClient;

