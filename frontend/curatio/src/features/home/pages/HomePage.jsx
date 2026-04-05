
//página pública


//página pública

import bgAll from "@/assets/images/bgAll.jpg";
import { useAuth } from '../../auth/context/AuthContext';

export default function HomePage() {

  const { user, isAuthenticated } = useAuth();

  console.log("AUTH STATE:", { user, isAuthenticated });


    return (
      <section
        className="relative min-h-screen z-50 w-full flex items-center justify-center text-black"
        style={{
          backgroundImage: `url(${bgAll})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0  bg-white/20"></div>

        <div className="relative z-50 text-center">
          <h1 className="text-h1 font-heading ">Bienvenidos a mi página</h1>
          {isAuthenticated && (
            <div className="fixed top-50 z-50 rounded-lg border bg-green-500 px-4 py-2 text-black shadow">
              Signed in as {user?.name} ({user?.role})
            </div>
          )}
        </div>
      </section>
    );

}