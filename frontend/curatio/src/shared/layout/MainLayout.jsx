import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/shared/layout/NavBar";

//import heroBfg from "@/assets/images/imagen-hero.jpg";

export default function MainLayout() {
  /*
    * useLocation: es un hook de react router que te da acceso al objeto location, el cual contiene
    informacion de la URL actual: pathname = la ruta actual (/about, etc)
    */
  const location = useLocation();

  const isHome = location.pathname === "/";
  return (
    /**
     * Navbar transparente solo en el home
     * si la ruta es exactamente / => es transparente
     * si es cualquier otra ruta es solido
     * 
     */
    <div className="min-h-screen text-text-primary ">

        {/* para importar la imagen  */}
       {/* <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBfg})` }}
      /> */}

      {/* Filtro */}
      {/* <div className="absolute inset-0 -z-10 bg-black/40"></div> */}

      {/* Navbar  */}
      {/* para transpareny en toda parte */}
      {/* <header className="relative z-20 ">
        <Navbar variant="transparent" />
      </header> */}

      
        <Navbar variant= {isHome ? "transparent" : "solid"} />
    

        {/* Contenido externo que se inyecta */}
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
