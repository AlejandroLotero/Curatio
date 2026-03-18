import { Outlet } from "react-router-dom";



import heroBfg from "@/assets/images/bgAll.jpg";

export default function CartShopLayout() {
 
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
