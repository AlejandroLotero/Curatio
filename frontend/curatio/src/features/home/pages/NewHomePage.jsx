// import { useState, useEffect } from "react";
// import { Card, Button, Modal } from "@/shared/components";
// import { products } from "@/data/product/products";
// import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

// const NewHomePage = () => {
//   // Inicializamos las cantidades para cada producto en 1
//   const [quantities, setQuantities] = useState(
//     // Creamos un objeto con las IDs de los productos como claves y 1 como valor inicial
//     //acc es el acumulador que se va llenando con cada producto, p es el producto actual en la iteración
//     products.reduce((acc, p) => {
//       acc[p.id] = 1;
//       return acc;
//     }, {})
//   );
// // Estado para controlar la apertura del modal y el producto seleccionado
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // Estado para almacenar el producto que se ha agregado al carrito y mostrar su información en el modal
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   // Índice del carrusel de productos destacados
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Función para aumentar la cantidad de un producto específico
//   const handleIncrease = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };
// // Función para disminuir la cantidad de un producto específico, asegurándose de que no baje de 1
//   const handleDecrease = (id) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: prev[id] > 1 ? prev[id] - 1 : 1,
//     }));
//   };
//   // Función para manejar la acción de comprar un producto, abre el modal y establece el producto seleccionado
//   const handleBuy = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };
// // Función para cerrar el modal y limpiar el producto seleccionado
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   // Navegación del carrusel
//   const totalProducts = products.length;

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + totalProducts) % totalProducts);
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % totalProducts);
//   };

//   // Cambio automático del carrusel cada 5 segundos
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
//         <header className="mb-8 text-center">
//           {/* <h1 className="text-3xl font-bold mb-2">
//             Productos disponibles
//           </h1> */}
//           {/* <p className="text-muted-foreground">
//             Explora nuestros medicamentos y agrégalos fácilmente a tu carrito.
//           </p> */}
//         </header>

//         {/* Carrusel de medicamentos destacados */}
//         <div className="mb-10" >
//           <h2 className="text-2xl font-semibold mb-4 text-left">
//             Destacados
//           </h2>

//           <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
//             {/* Botón izquierda ocupando todo el alto disponible, sin solapar las cards */}
//             <div className="flex-shrink-0 flex justify-start">
//               <Button
//                 variant="secondary"
//                 size="md"
//                 type="button"
//                 onClick={handlePrevSlide}
//                 className = "bg-transparent"
//               >
//                 <ChevronLeft className="w-8 h-8" />
//               </Button>
//             </div>

//             {/* Contenedor de tarjetas visibles (3 a la vez) */}
//             {/* Agregamos un contenedor para que las cards se centren y se separen por 6px */}
//             <div className="flex-1 flex justify-center gap-3 sm:gap-6 flex-wrap md:flex-nowrap max-w-5xl mx-auto">
//               {Array.from({ length: 3 }).map((_, index) => {
//                 const productIndex = (currentSlide + index) % totalProducts;
//                 const product = products[productIndex];

//                 return (
//                   <div
//                     key={`carousel-${product.id}`}
//                     className="w-full max-w-[210px] xs:max-w-xs md:max-w-sm lg:max-w-md"
//                   >
//                     <Card product={product} />
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Botón derecha ocupando todo el alto disponible, sin solapar las cards */}
//             <div className="flex-shrink-0 flex justify-end">
//               <Button
//                 variant="secondary"
//                 size="md"
//                 type="button"
//                 onClick={handleNextSlide}
//                 className = "bg-transparent"
//               >
//                 <ChevronRight className="w-8 h-8" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Grid de productos con controles de cantidad */}

//         <h2 className="text-2xl font-semibold mb-4 text-left">
//           Productos
//         </h2>
//         <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center cursor-pointer">
//           {products.map((product) => (
//             <div key={product.id} className="space-y-4">
//               <Card product={product} />

//               <div className="flex items-center justify-between gap-4">
//                 <div className="flex items-center gap-3 bg-white/50  border-none border-gray-200 rounded-2xl p-2">
//                   <Button
//                     variant="secondary"
//                     size="md"
//                     type="button"
//                     onClick={() => handleDecrease(product.id)}
//                     className = "bg-transparent"
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
//                     className = "bg-transparent"
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
//               // Aquí podrías navegar al carrito cuando tengas el router configurado
//               handleCloseModal();
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
import { useCart } from "@/features/cartshop/context/CartContext";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * NewHomePage
 * -----------
 * Home pública/visual de productos.
 *
 * Responsabilidades:
 * - Renderizar productos destacados y catálogo visual
 * - Permitir cambiar cantidades por producto
 * - Agregar productos al carrito REAL usando CartContext
 * - Mostrar confirmación visual en modal
 *
 * Importante:
 * - Se conserva el diseño existente
 * - Se conserva el uso de Card, Button, Modal y Lucide
 * - Se conecta la acción "Comprar" al backend mediante el CartContext
 */
const NewHomePage = () => {
  const navigate = useNavigate();

  /**
   * Hook del carrito real.
   *
   * addMedicationToCart:
   * - agrega el medicamento al carrito activo en backend
   *
   * isMutatingCart:
   * - loading mientras se agrega/elimina/actualiza algo en el carrito
   */
  const { addMedicationToCart, isMutatingCart } = useCart();

  /**
   * Estado local de cantidades por producto.
   * Cada producto inicia con cantidad 1.
   */
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  /**
   * Estado del modal.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Producto seleccionado para mostrar feedback en el modal.
   */
  const [selectedProduct, setSelectedProduct] = useState(null);

  /**
   * Tipo de resultado del modal:
   * - "success"
   * - "error"
   */
  const [modalType, setModalType] = useState("success");

  /**
   * Mensaje dinámico del modal.
   */
  const [modalMessage, setModalMessage] = useState("");

  /**
   * Índice actual del carrusel.
   */
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Aumenta la cantidad de un producto.
   */
  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  /**
   * Disminuye la cantidad de un producto.
   * Nunca baja de 1.
   */
  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  /**
   * Cierra modal y limpia estado relacionado.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalMessage("");
    setModalType("success");
  };

  /**
   * Acción real de compra.
   *
   * Flujo:
   * 1. toma la cantidad seleccionada
   * 2. llama al carrito real
   * 3. si backend responde ok:
   *    - abre modal de éxito
   *    - navbar se actualiza automáticamente porque CartContext cambia
   * 4. si falla:
   *    - abre modal de error
   */
  const handleBuy = async (product) => {
    const quantity = quantities[product.id] ?? 1;

    try {
      const result = await addMedicationToCart({
        // Se usa el id del producto visual como medicationId real.
        // Hoy esto funciona porque tus ids mock coinciden con los ids backend.
        medicationId: product.id,
        quantity,
      });

      setSelectedProduct(product);

      if (result.ok) {
        setModalType("success");
        setModalMessage(
          `${quantity} unit(s) of ${product.title} were added to your cart successfully.`
        );
        setIsModalOpen(true);
        return;
      }

      setModalType("error");
      setModalMessage(
        result.message || "The product could not be added to the cart."
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);

      setSelectedProduct(product);
      setModalType("error");
      setModalMessage("The product could not be added to the cart.");
      setIsModalOpen(true);
    }
  };

  /**
   * Total de productos para el carrusel.
   */
  const totalProducts = products.length;

  /**
   * Mueve carrusel hacia atrás.
   */
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalProducts) % totalProducts);
  };

  /**
   * Mueve carrusel hacia adelante.
   */
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalProducts);
  };

  /**
   * Cambio automático del carrusel cada 5 segundos.
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
        <header className="mb-8 text-center">
          {/* Se deja reservado por si luego quieres reactivar título/subtítulo */}
        </header>

        {/* =========================
            CARRUSEL DESTACADOS
           ========================= */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Destacados
          </h2>

          <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
            {/* Flecha izquierda */}
            <div className="flex-shrink-0 flex justify-start">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handlePrevSlide}
                className="bg-transparent"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            </div>

            {/* Tarjetas visibles del carrusel */}
            <div className="flex-1 flex justify-center gap-3 sm:gap-6 flex-wrap md:flex-nowrap max-w-5xl mx-auto">
              {Array.from({ length: 3 }).map((_, index) => {
                const productIndex = (currentSlide + index) % totalProducts;
                const product = products[productIndex];

                return (
                  <div
                    key={`carousel-${product.id}`}
                    className="w-full max-w-[210px] xs:max-w-xs md:max-w-sm lg:max-w-md"
                  >
                    <Card product={product} />
                  </div>
                );
              })}
            </div>

            {/* Flecha derecha */}
            <div className="flex-shrink-0 flex justify-end">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handleNextSlide}
                className="bg-transparent"
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
              <Card product={product} />

              <div className="flex items-center justify-between gap-4">
                {/* Selector de cantidad */}
                <div className="flex items-center gap-3 bg-white/50 border-none border-gray-200 rounded-2xl p-2">
                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={() => handleDecrease(product.id)}
                    className="bg-transparent"
                    disabled={isMutatingCart}
                  >
                    <Minus className="w-6 h-6" />
                  </Button>

                  <span className="min-w-[2rem] text-center font-semibold">
                    {quantities[product.id]}
                  </span>

                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={() => handleIncrease(product.id)}
                    className="bg-transparent"
                    disabled={isMutatingCart}
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>

                {/* Comprar real */}
                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={() => handleBuy(product)}
                  disabled={isMutatingCart}
                >
                  {isMutatingCart && selectedProduct?.id === product.id
                    ? "Comprando..."
                    : "Comprar"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          MODAL DE FEEDBACK
         ========================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalType === "success"
            ? "Producto agregado al carrito"
            : "No se pudo agregar el producto"
        }
        message={modalMessage}
      >
        <div className="flex justify-center gap-4">
          {modalType === "success" ? (
            <>
              <Button
                variant="primary"
                size="md"
                type="button"
                onClick={() => {
                  handleCloseModal();
                  navigate("/cartshop/list-cartshop");
                }}
              >
                Ir al carrito
              </Button>

              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handleCloseModal}
              >
                Volver
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={handleCloseModal}
            >
              Cerrar
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default NewHomePage;