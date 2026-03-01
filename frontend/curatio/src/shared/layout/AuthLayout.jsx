import { Outlet } from "react-router-dom";
import Navbar from "@/shared/layout/NavBar";

import UserForm from "@/features/users/components/UserForm"

// import heroBfg from "@/assets/images/carro.jpg";

import heroBfg from "@/assets/images/imagen-hero.jpg";

export default function AuthLayout() {
 
  return (
    
    <div className="relative min-h-screen w-full flex items-center justify-center text-black"
                style={{
                  backgroundImage: `url(${heroBfg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>

           
                
            
    

        {/* Contenido externo que se inyecta */}
      <main className="mx-auto">
       
        <UserForm></UserForm>
      </main>
    </div>
  );
}
