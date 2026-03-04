
//página pública


//página pública

import heroBfg from "@/assets/images/bgAll.jpg";

export default function HomePage() {


    return (
      <section
        className="relative min-h-screen w-full flex items-center justify-center text-black"
        style={{
          backgroundImage: `url(${heroBfg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0  bg-white/20"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-h1 font-heading ">
            Bienvenidos a mi página
          </h1>
          <p>
            Texto de relleno 
          </p>
        </div>
      </section>
    );

}