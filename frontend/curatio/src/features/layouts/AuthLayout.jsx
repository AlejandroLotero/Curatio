import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


import heroBfg from "@/assets/images/bgAll.jpg";
import logo from "@/assets/images/Curatio.png";
import SessionConflictGlobalModal from "@/features/auth/components/SessionConflictGlobalModal";

export default function AuthLayout() {
 
  return (
    <div className="relative min-h-screen text-text-primary overflow-hidden">
        
      <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background: `
                  radial-gradient(circle at 20% 30%, rgba(65, 144, 190, 0.15), transparent 40%),
                  radial-gradient(circle at 80% 70%, rgba(70, 185, 175, 0.15), transparent 40%),
                  linear-gradient(
                    135deg,
                    var(--color-primary-100),
                    var(--color-primary-200),
                    var(--color-secondary-200),
                    var(--color-secondary-100)
                  )
                `,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <img
                src={logo}
                alt="watermark"
                className="absolute inset-0 m-auto w-[800px] opacity-[0.035] blur-[2px]"
              />
            </div>

          

      {/* Contenido externo que se inyecta de forma automatica con Outlet */}
      <main className="mx-auto ">
        <Outlet />
      </main>
      
    </div>
  );
}
