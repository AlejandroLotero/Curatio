
//página pública
import logo from "@/assets/images/Curatio.png";
import bgAll from "@/assets/images/bgAll.jpg";
import { useAuth } from '../../auth/context/AuthContext';

export default function HomePage() {

  const { user, isAuthenticated } = useAuth();

  console.log("AUTH STATE:", { user, isAuthenticated });


    return (
      <section
        className="relative z-0 min-h-screen w-full flex items-center justify-center text-black"
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
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
                <img
                  src={logo}
                  alt="watermark"
                  className="absolute inset-0 m-auto w-[800px] opacity-[0.80] blur-[1px]"
                />
              </div>
        <div className="absolute inset-0  bg-white/20"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-h1 font-heading ">Bienvenido</h1>
          
        </div>
      </section>
    );

}