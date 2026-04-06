import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";


import heroBfg from "@/assets/images/bgAll.jpg";


export default function AuthLayout() {
 
  return (
    
    <div className="relative min-h-screen w-full flex items-center justify-center text-black"
                style={{
                  backgroundImage: `url(${heroBfg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>

           
                
            
    

        {/* Contenido externo que se inyecta de forma automatica con Outlet */}
      <main className="mx-auto ">
       
         <Outlet />       
        
      </main>
    </div>
  );
}
