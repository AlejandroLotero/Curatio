
//página pública


//página pública

import bgAll from "@/assets/images/bgAll.jpg";
import Card from "@/shared/components/Card";

// importar imagenes desde assets/images

import acetaminofen from "@/assets/images/acetaminofen.png";
import bisbacter from "@/assets/images/bisbacter.png";
import hidrocortisona from "@/assets/images/hidrocortisona.png";



export default function HomePage() {
  // Array de productos
  const products = [
    {
      title: "Acetaminofén",
      image: acetaminofen,
      price: 29990,
      description: "Acetam forte 500+65mg de MK. Es un medicamento eficaz para el alivio del dolor y la reducción de la fiebre."
    },
    {
      title: "Bisbacter",
      image: bisbacter,
      price: 49990,
      description: "Subsacilato de bismuto 262mg de MK. Es un medicamento utilizado para tratar problemas como la diarrea y la indigestión."
    },
    {
      title: "Hidrocortisona",
      image: hidrocortisona,
      price: 39990,
      description: "Hidrocortisona 20mg de MK. Es un medicamento antiinflamatorio utilizado para tratar diversas afecciones inflamatorias y alérgicas."
    }
  ];

  return (
    <section
      className="relative min-h-screen w-full text-black"
      style={{
        backgroundImage: `url(${bgAll})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="relative z-10 p-8 mt-16">
        <h1 className="text-5xl font-heading text-center mb-12">
          Curatio, tu farmacia en línea
        </h1>
        
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}