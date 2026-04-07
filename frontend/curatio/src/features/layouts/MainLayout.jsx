import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import NavBarClient from "./NavBarClient";
import bgAll from "@/assets/images/bgAll.jpg";


export default function MainLayout() {
  /*
    * useLocation: es un hook de react router que te da acceso al objeto location, el cual contiene
    informacion de la URL actual: pathname = la ruta actual (/about, etc)
    */
  const location = useLocation();
//variables para determinar el tipo de navbar a usar
  const isHome = location.pathname === "/";
  const searchParams = new URLSearchParams(location.search);
  const isClientSource = searchParams.get("source") === "dashboard";
  const isProductDetail = location.pathname.startsWith("/products/detalle/");
  const isCartFlow = location.pathname.startsWith("/cartshop/ver-carrito");
  const useClientNavbar =
    isHome || isCartFlow || (isProductDetail && isClientSource);

    //renderiza el navbar adecuado
  return (
    /**
     * Navbar transparente solo en el home
     * si la ruta es exactamente / => es transparente
     * si es cualquier otra ruta es solido
     * 
      */
    <div className="relative min-h-screen text-text-primary overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgAll})` }}
      />
      <div className="pointer-events-none absolute inset-0 " />

      {useClientNavbar ? (
        <NavBarClient variant={isHome ? "transparent" : "solid"} />
      ) : (
        <Navbar variant="solid" />
      )}
      

      {/* Contenido externo que se inyecta */}
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
