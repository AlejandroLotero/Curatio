//import heroBg from "../../../assets/imagen-hero.jpg"
import heroBg from "../../../assets/images/imagen-hero.jpg";
import imageAdmin from "../../../assets/images/image-admin.jpg";

export default function HomePage(){

    return(
        <section
            className="relative min-h-screen w-full flex items-center justify-center text-black"
            style={{
                backgroundImage: `url(${imageAdmin})`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <div className="absolute inset-0 bg-cover bg-center"></div>

            <div className="relative z-10 text-center text-white">

            </div>
        </section>
    )
}