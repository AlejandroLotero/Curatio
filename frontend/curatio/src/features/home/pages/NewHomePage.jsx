import { useState, useEffect } from "react";
import { Card, Button, Modal } from "@/shared/components";
import { products } from "@/data/product/products";
import { Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";

const NewHomePage = () => {
  // Inicializamos las cantidades para cada producto en 1
  const [quantities, setQuantities] = useState(
    // Creamos un objeto con las IDs de los productos como claves y 1 como valor inicial
    //acc es el acumulador que se va llenando con cada producto, p es el producto actual en la iteración
    products.reduce((acc, p) => {
      acc[p.id] = 1;
      return acc;
    }, {})
  );
// Estado para controlar la apertura del modal y el producto seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para almacenar el producto que se ha agregado al carrito y mostrar su información en el modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Índice del carrusel de productos destacados
  const [currentSlide, setCurrentSlide] = useState(0);

  // Función para aumentar la cantidad de un producto específico
  const handleIncrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };
// Función para disminuir la cantidad de un producto específico, asegurándose de que no baje de 1
  const handleDecrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };
  // Función para manejar la acción de comprar un producto, abre el modal y establece el producto seleccionado
  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
// Función para cerrar el modal y limpiar el producto seleccionado
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Navegación del carrusel
  const totalProducts = products.length;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalProducts) % totalProducts);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalProducts);
  };

  // Cambio automático del carrusel cada 5 segundos
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
          {/* <h1 className="text-3xl font-bold mb-2">
            Productos disponibles
          </h1> */}
          {/* <p className="text-muted-foreground">
            Explora nuestros medicamentos y agrégalos fácilmente a tu carrito.
          </p> */}
        </header>

        {/* Carrusel de medicamentos destacados */}
        <div className="mb-10" >
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Destacados
          </h2>

          <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
            {/* Botón izquierda ocupando todo el alto disponible, sin solapar las cards */}
            <div className="flex-shrink-0 flex justify-start">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handlePrevSlide}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>

            {/* Contenedor de tarjetas visibles (3 a la vez) */}
            {/* Agregamos un contenedor para que las cards se centren y se separen por 6px */}
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

            {/* Botón derecha ocupando todo el alto disponible, sin solapar las cards */}
            <div className="flex-shrink-0 flex justify-end">
              <Button
                variant="secondary"
                size="md"
                type="button"
                onClick={handleNextSlide}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grid de productos con controles de cantidad */}

        <h2 className="text-2xl font-semibold mb-4 text-left">
          Productos
        </h2>
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center cursor-pointer">
          {products.map((product) => (
            <div key={product.id} className="space-y-4">
              <Card product={product} />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-white rounded-2xl p-1">
                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={() => handleDecrease(product.id)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>

                  <span className="min-w-[2rem] text-center font-semibold">
                    {quantities[product.id]}
                  </span>

                  <Button
                    variant="secondary"
                    size="md"
                    type="button"
                    onClick={() => handleIncrease(product.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={() => handleBuy(product)}
                >
                  Comprar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

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
        <div className="flex justify-center gap-4">
          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={() => {
              // Aquí podrías navegar al carrito cuando tengas el router configurado
              handleCloseModal();
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
        </div>
      </Modal>
    </div>
  );
};

export default NewHomePage;