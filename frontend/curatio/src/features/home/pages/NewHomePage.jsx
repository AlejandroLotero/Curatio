// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, Button, Modal } from "@/shared/components";
// import { products } from "@/data/product/products";
// import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
// import { useCart } from "@/features/cartshop/context/CartContext";

// const NewHomePage = () => {
//   const navigate = useNavigate();

//   /**
//    * Contexto real del carrito
//    * -------------------------
//    * addToCartItem -> agrega producto al carrito real
//    */
//   const { addToCartItem } = useCart();

//   /**
//    * Estado local de cantidades por producto.
//    * Cada producto inicia con cantidad 1.
//    */
//   const [quantities, setQuantities] = useState(
//     products.reduce((acc, p) => {
//       acc[p.id] = 1;
//       return acc;
//     }, {})
//   );

//   /**
//    * Estado para modal de confirmación.
//    */
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   /**
//    * Producto seleccionado para el modal.
//    */
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   /**
//    * Índice del carrusel.
//    */
//   const [currentSlide, setCurrentSlide] = useState(0);

//   /**
//    * Aumenta la cantidad del producto.
//    */
//   const handleIncrease = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   /**
//    * Disminuye la cantidad del producto.
//    * Nunca baja de 1.
//    */
//   const handleDecrease = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1,
//     }));
//   };

//   /**
//    * Navega al detalle visual/comercial del producto.
//    * Este flujo usa ProductShowPage.
//    */
//   const handleCardClick = (productId) => {
//     navigate(`/products/detalle/${productId}?source=dashboard`);
//   };

//   /**
//    * Agrega producto al carrito real y abre modal.
//    */
//   const handleBuy = async (product) => {
//     try {
//       const quantity = quantities[product.id] ?? 1;

//       await addToCartItem({
//         productId: product.id,
//         quantity,
//       });

//       setSelectedProduct(product);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   /**
//    * Cierra modal y limpia producto seleccionado.
//    */
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   /**
//    * Total de productos del carrusel.
//    */
//   const totalProducts = products.length;

//   /**
//    * Ir al slide anterior.
//    */
//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalProducts) % totalProducts);
//   };

//   /**
//    * Ir al slide siguiente.
//    */
//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalProducts);
//   };

//   /**
//    * Cambio automático del carrusel cada 5 segundos.
//    */
//   useEffect(() => {
//     if (totalProducts === 0) return;

//     const intervalId = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % totalProducts);
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [totalProducts]);

//   return (
//     <div className="min-h-screen bgAll text-tittle text-label flex flex-col pt-24">
//       <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
//         <header className="mb-8 text-center" />

//         {/* =========================
//             CARRUSEL DE DESTACADOS
//            ========================= */}
//         <div className="mb-10">
//           <h2 className="text-2xl font-semibold mb-4 text-left">
//             Destacados
//           </h2>

//           <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
//             <div className="flex-shrink-0 flex justify-start">
//               <Button
//                 variant="secondary"
//                 size="md"
//                 type="button"
//                 onClick={handlePrevSlide}
//                 className="bg-transparent"
//               >
//                 <ChevronLeft className="w-8 h-8" />
//               </Button>
//             </div>

//             <div className="flex-1 flex justify-center gap-3 sm:gap-6 flex-wrap md:flex-nowrap max-w-5xl mx-auto">
//               {Array.from({ length: 3 }).map((_, index) => {
//                 const productIndex = (currentSlide + index) % totalProducts;
//                 const product = products[productIndex];

//                 return (
//                   <div
//                     key={`carousel-${product.id}`}
//                     className="w-full max-w-[210px] xs:max-w-xs md:max-w-sm lg:max-w-md"
//                   >
//                     <Card
//                       product={product}
//                       onClick={() => handleCardClick(product.id)}
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex-shrink-0 flex justify-end">
//               <Button
//                 variant="secondary"
//                 size="md"
//                 type="button"
//                 onClick={handleNextSlide}
//                 className="bg-transparent"
//               >
//                 <ChevronRight className="w-8 h-8" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* =========================
//             GRID DE PRODUCTOS
//            ========================= */}
//         <h2 className="text-2xl font-semibold mb-4 text-left">
//           Productos
//         </h2>

//         <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
//           {products.map((product) => (
//             <div key={product.id} className="space-y-4">
//               <Card
//                 product={product}
//                 onClick={() => handleCardClick(product.id)}
//               />

//               <div className="flex items-center justify-between gap-4">
//                 <div className="flex items-center gap-3 bg-white/50 border-none border-gray-200 rounded-2xl p-2">
//                   <Button
//                     variant="secondary"
//                     size="md"
//                     type="button"
//                     onClick={() => handleDecrease(product.id)}
//                     className="bg-transparent"
//                   >
//                     <Minus className="w-6 h-6" />
//                   </Button>

//                   <span className="min-w-[2rem] text-center font-semibold">
//                     {quantities[product.id]}
//                   </span>

//                   <Button
//                     variant="secondary"
//                     size="md"
//                     type="button"
//                     onClick={() => handleIncrease(product.id)}
//                     className="bg-transparent"
//                   >
//                     <Plus className="w-6 h-6" />
//                   </Button>
//                 </div>

//                 <Button
//                   variant="primary"
//                   size="md"
//                   type="button"
//                   onClick={() => handleBuy(product)}
//                 >
//                   Comprar
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* =========================
//           MODAL DE CONFIRMACIÓN
//          ========================= */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title="Producto agregado al carrito"
//         message={
//           selectedProduct
//             ? `Has agregado ${quantities[selectedProduct.id]} unidad(es) de ${selectedProduct.title} a tu carrito.`
//             : ""
//         }
//       >
//         <div className="flex justify-center gap-4">
//           <Button
//             variant="primary"
//             size="md"
//             type="button"
//             onClick={() => {
//               handleCloseModal();
//               navigate("/cartshop/mi-carrito");
//             }}
//           >
//             Ir al carrito
//           </Button>

//           <Button
//             variant="secondary"
//             size="md"
//             type="button"
//             onClick={handleCloseModal}
//           >
//             Volver
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default NewHomePage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal } from "@/shared/components";
import { products } from "@/data/product/products";
import { Plus, Minus, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/features/cartshop/context/CartContext";
import Footer from "@/features/layouts/footer";

const NewHomePage = () => {
  const navigate = useNavigate();

  /**
   * Contexto del carrito público.
   */
  const { addToCartItem } = useCart();

  /**
   * Cantidades por producto.
   */
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => {
      acc[p.id] = 1;
      return acc;
    }, {})
  );

  /**
   * Modal de confirmación.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Producto seleccionado para mostrar en modal.
   */
  const [selectedProduct, setSelectedProduct] = useState(null);

  /**
   * Slide actual del carrusel.
   */
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Aumenta cantidad.
   */
  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  /**
   * Disminuye cantidad.
   */
  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  /**
   * Click en la card para abrir el detalle público/comercial.
   */
  const handleCardClick = (productId) => {
    navigate(`/products/detalle/${productId}?source=dashboard`);
  };

  /**
   * Compra rápida desde dashboard.
   * Agrega al carrito sin login y luego muestra modal.
   */
  const handleBuy = async (product) => {
    try {
      const quantity = quantities[product.id] ?? 1;

      await addToCartItem({
        productId: product.id,
        quantity,
      });

      setSelectedProduct(product);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  /**
   * Cierra el modal.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  /**
   * Lógica del carrusel.
   */
  const totalProducts = products.length;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalProducts) % totalProducts);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalProducts);
  };

  /**
   * Cambio automático del carrusel.
   */
  useEffect(() => {
    if (totalProducts === 0) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalProducts);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [totalProducts]);

  return (
    <div className="min-h-screen bgAll text-tittle text-label flex flex-col pt-24">
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <header className="mb-8 text-center" />

        {/* =========================
            CARRUSEL DE DESTACADOS
           ========================= */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Destacados
          </h2>

          <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
            <div className="flex-shrink-0 flex justify-start">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handlePrevSlide}
                className="bg-transparent border-none shadow-none"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            </div>

            <div className="flex-1 flex justify-center gap-3 sm:gap-6 flex-wrap md:flex-nowrap max-w-5xl mx-auto">
              {Array.from({ length: 3 }).map((_, index) => {
                const productIndex = (currentSlide + index) % totalProducts;
                const product = products[productIndex];

                return (
                  <div
                    key={`carousel-${product.id}`}
                    className="w-full max-w-[210px] xs:max-w-xs md:max-w-sm lg:max-w-md"
                  >
                    <Card
                      product={product}
                      onClick={() => handleCardClick(product.id)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex-shrink-0 flex justify-end">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handleNextSlide}
                className="bg-transparent border-none shadow-none"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>

        {/* =========================
            GRID DE PRODUCTOS
           ========================= */}
        <h2 className="text-2xl font-semibold mb-4 text-left">
          Productos
        </h2>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center cursor-pointer">
          {products.map((product) => (
            <div key={product.id} className="space-y-4">
              <Card
                product={product}
                onClick={() => handleCardClick(product.id)}
              />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-white/50 border-none border-gray-200 rounded-2xl ">
                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={() => handleDecrease(product.id)}
                    className="bg-transparent border-none shadow-none"
                  >
                    <Minus className="w-6 h-6 " />
                  </Button>

                  <span className="min-w-[2rem] text-center font-semibold">
                    {quantities[product.id]}
                  </span>

                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={() => handleIncrease(product.id)}
                    className="bg-transparent border-none shadow-none"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={() => handleBuy(product)}
                  className="flex items-center gap-4"
                >
                  Agregar  <ShoppingCart/>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          MODAL DE AGREGADO
         ========================= */}
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Producto agregado al carrito"
        message={
          selectedProduct
            ? `Has agregado ${quantities[selectedProduct.id]} unidad(es) de ${selectedProduct.title} a tu carrito.`
            : ""
        }
      >
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={handleCloseModal}
          >
            Seguir comprando
          </Button>

          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={() => {
              handleCloseModal();
              navigate("/cartshop/ver-carrito");
            }}
          >
            Ir al carrito
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NewHomePage;