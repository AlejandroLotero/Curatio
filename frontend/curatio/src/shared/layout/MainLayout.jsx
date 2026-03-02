import Navbar from "@/shared/layout/Navbar.jsx";
import { Outlet, useLocation } from "react-router-dom";
// import heroBg from "@/assets/images/imagen-hero.jpg"

export default function MainLayout(){
/*
*useLocation es un hook de react router que te da acceso al objeto location el cual contiene información de la URL actual:
*pathname = Ruta actual(/about, etc)
*/ 
        const location = useLocation();
        const isHome = location.pathname === "/"

        return(
            /*
            *Navbar transparente solo en el home 
            * Si la ruta es exatamente / entonces navbar es transparente
            * Si es cualquier otra ruta es solido
            */
            <div className="min-h-screen text-text-label">
                {/* <div className="absolute inset-0 -z-10 bg-cover bg-center"

                    style={{backgroundImage: `url(${heroBg})`}}>
                </div> */}

                {/* Navbar*/}

                    <Navbar variant = {isHome ? "transparent" : "solid"}/>

                {/*Contenido que se inyecta*/}
                <main className="mx-auto max-w7">
                    <Outlet />
                </main>
            </div>

        );
};