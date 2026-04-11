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
      className={`relative z-50 w-full border-b transition-colors duration-300 py-2 ${
        variant === "transparent"
          ? "absolute top-0 left-0 z-[100] bg-transparent border-transparent"
          : "bg-[#98e3f4] border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 py-2 sm:gap-4 md:h-16 md:py-0">
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
                className="h-14 w-auto md:h-16"
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
              inputClassName="!py-2 md:!py-1.5 md:!leading-snug"
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
                    <DropdownItem>
                      <Link to="/my-orders" className="block w-full">
                        Mis pedidos
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
