// import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
// import NavBarClient from "./NavBarClient";
// import bgAll from "@/assets/images/bgAll.jpg";


// export default function MainLayout() {
//   /*
//     * useLocation: es un hook de react router que te da acceso al objeto location, el cual contiene
//     informacion de la URL actual: pathname = la ruta actual (/about, etc)
//     */
//   const location = useLocation();
// //variables para determinar el tipo de navbar a usar
//   const isHome = location.pathname === "/";
//   const searchParams = new URLSearchParams(location.search);
//   const isClientSource = searchParams.get("source") === "dashboard";
//   const isProductDetail = location.pathname.startsWith("/products/detalle/");
//   const isCartFlow = location.pathname.startsWith("/cartshop/ver-carrito");
//   const useClientNavbar =
//     isHome || isCartFlow || (isProductDetail && isClientSource);

//     //renderiza el navbar adecuado
//   return (
//     /**
//      * Navbar transparente solo en el home
//      * si la ruta es exactamente / => es transparente
//      * si es cualquier otra ruta es solido
//      * 
//       */
//     <div className="relative min-h-screen text-text-primary overflow-hidden">
//       <div
//         className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${bgAll})` }}
//       />
//       <div className="pointer-events-none absolute inset-0 " />

//       {useClientNavbar ? (
//         <NavBarClient variant={isHome ? "transparent" : "solid"} />
//       ) : (
//         <Navbar variant="solid" />
//       )}
      

//       {/* Contenido externo que se inyecta */}
//       <main className="mx-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import NavBarClient from "./NavBarClient";
import logo from "@/assets/images/Curatio.png";
import SessionConflictGlobalModal from "@/features/auth/components/SessionConflictGlobalModal";
import bgAll from "@/assets/images/nuevo.jpg";

export default function MainLayout() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const searchParams = new URLSearchParams(location.search);
  const isClientSource = searchParams.get("source") === "dashboard";
  const isProductDetail = location.pathname.startsWith("/products/detalle/");
  const isCartFlow = location.pathname.startsWith("/cartshop/ver-carrito");

  const useClientNavbar =
    isHome || isCartFlow || (isProductDetail && isClientSource);

  return (
    <div className="relative min-h-screen text-text-primary overflow-hidden">
      
       {/* <div
         className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url(${bgAll})` }}
       /> */}

      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(65, 144, 190, 0.15), transparent 90%),
            radial-gradient(circle at 70% 70%, rgba(70, 185, 175, 0.15), transparent 40%),
            linear-gradient(
              135deg,
              var(--color-primary-100),
              var(--color-primary-300),
              var(--color-secondary-200),
              var(--color-secondary-100)
            )
          `,
        }}
      />

      {/* <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, var(--color-secondary-400), transparent 20%),
            radial-gradient(circle at 70% 80%, var(--color-primary-400), transparent 40%),
            linear-gradient(
              140deg,
              var(--color-secondary-100),
              var(--color-primary-200),
              var(--color-white)
            )
          `,
        }}
      /> */}






      
      <div
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <img
          src={logo}
          alt="watermark"
          className="absolute inset-0 m-auto w-[800px] opacity-[0.60] blur-[9px]"
        />
      </div>

      {useClientNavbar ? (
        <NavBarClient variant={isHome ? "transparent" : "solid"} />
      ) : (
        <Navbar variant="solid" />
      )}

      <main className="mx-auto">
        <Outlet />
      </main>
      <SessionConflictGlobalModal />
    </div>
  );
}