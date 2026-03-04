import { Search, User, Cross } from "lucide-react";
/*Nos enruta pero con react router*/
import { Link } from "react-router-dom";
import { useState } from "react";



const Navbar = ({variant = "solid"}) => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    // Estos son los estilos del NavBar para que quede transparente
    <nav className = {`w-full border-b transition-color duration-300${variant === "transparent" ? "bg-transparent border-transparent absolute top-0 left-0 z-30"
      : "bg-background border-border"}`}>


      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo de marca */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-tittles font-heading font-body text-label">
              <Cross className="size-12 fill-label stroke-label [stroke-linecap:square] [stroke-linejoin:miter]" strokeWidth={2} />
              Curatio
            </Link>
          </div>


          {/* Links de navegación */}
          <ul className="hidden md:flex items-center gap-6 font-body font-heading text-small text-label">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Gestion de grupos
              </Link>
            </li>
            <li>
              <Link to="/accounts/datos-basicos" className="hover:text-primary transition">
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/suppliers/datos-basicos" className="hover:text-primary transition">
                Proveedores
              </Link>
            </li>
            <li>
              <Link to="/video" className="hover:text-primary transition">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/video" className="hover:text-primary transition">
                Carrito
              </Link>
            </li>
            <li>
              <Link to="/video" className="hover:text-primary transition">
                Ventas
              </Link>
            </li>
          </ul>


          {/* Sección derecha: búsqueda + usuario */}
          <div className="flex items-center gap-4">
            
            {/* Buscador */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4
                  py-2.5 border rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-primary border border-border-strong"
              />
            </div>

            {/* Icono de usuario */}
            {/* <button className="flex items-center justify-center size-10 rounded-full border hover:bg-gray-100 transition">
              <User className="size-5" />
            </button> */}

            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center size-10 rounded-full border hover:bg-surface transition border border-border-strong"
              >
                <User className="size-5 cursor-pointer" />
              </button>

              {isOpen && (
                <div className="h-28 text-label text-center absolute right-0 mt-2 w-48 bg-background bg-white/70 dark:bg-neutral-900/20 backdrop-blur-md shadow-xl ring-1 rounded-3xl">
                  <ul className="py-2 text-sm">
                    <li>
                      <Link
                        to="/login" /*"/perfil"*/
                        className="block px-4 py-2 hover:bg-surface rounded-t-3xl transition cursor-pointer"
                        onClick={() => setIsOpen(false)}>
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-center px-4 py-2 hover: hover:bg-surface rounded-b-3xl transition cursor-pointer"
                        onClick={() => {
                          setIsOpen(false);
                          console.log("Cerrar sesión");
                        }}>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/*
Para dirigirme o navegar a una ruta uso <Link/>
Para ejecutar lógica se usa button.
*/