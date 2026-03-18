
//página pública


//página pública

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import bgAll from "@/assets/images/bgAll.jpg";
import Card from "../components/Cards";
import Modal from "../components/Modal";
import Buttom from "@/shared/components/Button";

// importar imagenes desde assets/images

import acetaminofen from "@/assets/images/acetaminofen.png";
import bisbacter from "@/assets/images/bisbacter.png";
import hidrocortisona from "@/assets/images/hidrocortisona.png";



export default function HomePage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState({});
  //const [showAddedNotification, setShowAddedNotification] = useState(false);

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

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const handleComprarClick = (product, quantity) => {
    navigate("/login");
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto auto-rows-max">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-4">
              <div onClick={() => handleCardClick(product)} style={{ cursor: "pointer" }} className="w-full">
                <Card product={product} onComprarRoute="/sales/factura-electronica" />
              </div>
              {/* Contador de items */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCartItems({...cartItems, [index]: Math.max(1, (cartItems[index] || 1) - 1)})}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Minus size={18} style={{ color: "var(--color-black)" }} />
                </button>
                <input
                  type="number"
                  value={cartItems[index] || 1}
                  onChange={(e) => setCartItems({...cartItems, [index]: Math.max(1, parseInt(e.target.value) || 1)})}
                  className="w-16 text-center px-3 py-1 border rounded-lg [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
                  style={{ borderColor: "var(--color-primary-200)", MozAppearance: "textfield", appearance: "textfield" }}
                />
                <button
                  onClick={() => setCartItems({...cartItems, [index]: (cartItems[index] || 1) + 1})}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Plus size={18} style={{ color: "var(--color-black)" }} />
                </button>
              </div>
              <Buttom
                variant="primary"
                size="md"
                type="button"
                onClick={() => handleComprarClick(product, cartItems[index] || 1)}
              >
                Comprar
              </Buttom>
            </div>
          ))}
        </div>

        {/* Modal de detalles del producto */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          backgroundColor="bg-white/70 dark:bg-neutral-900/70"
          width="w-[900px]"
        >
          <div className="flex gap-6 items-start">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-black/10 transition"
            >
              <ChevronLeft size={24} style={{ color: "var(--color-black)" }} />
            </button>

            {/* Imagen a la izquierda */}
            <div className="flex-shrink-0 w-80">
              <img 
                src={selectedProduct?.image} 
                alt={selectedProduct?.title}
                className="w-full h-80 object-contain"
              />
            </div>

            {/* Contenido a la derecha */}
            <div className="flex-1 flex flex-col gap-4 pt-8">
              {/* Nombre */}
              <h2 className="text-2xl font-bold" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
                {selectedProduct?.title}
              </h2>

              {/* Precio */}
              <p className="text-3xl font-bold text-green-700" style={{ fontFamily: "var(--font-body)" }}>
                $ {selectedProduct?.price?.toLocaleString()}
              </p>

              {/* Descripción */}
              <p className="text-2xl" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
                {selectedProduct?.description}
              </p>

              {/* Selector de cantidad */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Minus size={18} style={{ color: "var(--color-black)" }} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-12 text-center px-2 py-0 border rounded-lg font-bold [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden"
                  style={{ 
                    borderColor: "var(--color-primary-200)", 
                    MozAppearance: "textfield",
                    appearance: "textfield"
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  <Plus size={18} style={{ color: "var(--color-black)" }} />
                </button>
              </div>

              {/* Botón Agregar al carrito */}
              <Buttom
                variant="primary"
                size="xs"
                type="button"
                onClick={() => {
                  handleComprarClick(selectedProduct, quantity);
                  setIsModalOpen(false);
                }}
              >
                Agregar al Carrito de Compras
              </Buttom>
            </div>
          </div>
        </Modal>

        {/* Modal de notificación: Agregado al carrito - NO USADO EN HOMEBOARD */}
        {/* <Modal
          isOpen={showAddedNotification}
          onClose={() => setShowAddedNotification(false)}
          backgroundColor="bg-white/40 dark:bg-neutral-900/90"
          width="w-[400px]"
        >
          <div className="flex flex-col gap-6 items-center justify-center p-6">
            <ShoppingCart size={48} style={{ color: "var(--color-secondary-900)" }} />
            <h2 className="text-3xl font-bold text-center" style={{ color: "var(--color-secondary-900)" }}>
              Agregado al carrito
            </h2>
            <p className="text-lg text-center" style={{ color: "var(--color-black)" }}>
              Tu producto ha sido añadido correctamente
            </p>
          </div>
        </Modal> */}
      </div>
    </section>
  );
}