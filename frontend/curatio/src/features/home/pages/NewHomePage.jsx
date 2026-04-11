import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal } from "@/shared/components";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/features/cartshop/context/CartContext";
import Footer from "@/features/layouts/footer";
import { getPublicCatalogMedications } from "@/lib/http/publicMedications";
import {
  adaptPublicMedicationCatalogResponse,
  isMedicationVisibleOnNewHomePage,
} from "@/lib/adapters/publicMedicationAdapter";

const NewHomePage = () => {
  const navigate = useNavigate();

  /**
   * Contexto del carrito público.
   */
  const { addToCartItem } = useCart();

  /**
   * Estado de catálogo real.
   */
  const [products, setProducts] = useState([]);

  /**
   * Estados de pantalla.
   */
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
   * Carga real del catálogo desde backend.
   */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await getPublicCatalogMedications({
          page: 1,
          pageSize: 20,
        });

        const adapted = adaptPublicMedicationCatalogResponse(response?.data);
        const sellableProducts = (adapted.results ?? []).filter(
          isMedicationVisibleOnNewHomePage
        );

        setProducts(sellableProducts);
      } catch (error) {
        console.error("Error loading public medications catalog:", error);
        setErrorMessage("No se pudo cargar el catálogo de productos.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

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
    await addToCartItem({
      productId: product.id,
      productName: product.title ?? product.name,
      quantity: 1,
      unitPrice: product.price ?? product.salePrice ?? 0,
      imageUrl: product.imageUrl ?? product.image ?? null,
      laboratory: product.laboratory ?? "",
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
   * Lista de destacados.
   * Por ahora usamos los primeros 6 productos vendibles.
   */
  const featuredProducts = useMemo(() => {
    return products.slice(0, 6);
  }, [products]);

  /**
   * Lógica del carrusel.
   */
  const totalFeaturedProducts = featuredProducts.length;

  const handlePrevSlide = () => {
    if (totalFeaturedProducts === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalFeaturedProducts) % totalFeaturedProducts);
  };

  const handleNextSlide = () => {
    if (totalFeaturedProducts === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalFeaturedProducts);
  };

  /**
   * Cambio automático del carrusel.
   */
  useEffect(() => {
    if (totalFeaturedProducts === 0) return;

    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalFeaturedProducts);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [totalFeaturedProducts]);

  /**
   * Estado loading.
   */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-label pt-20">
        Cargando productos...
      </div>
    );
  }

  /**
   * Estado error.
   */
  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-label pt-20">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="bgAll text-tittle text-label flex flex-col pt-20">
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <header className="mb-8 text-center" />

        {/* =========================
            CARRUSEL DE DESTACADOS
           ========================= */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-left">
            Destacados
          </h2>

          {featuredProducts.length === 0 ? (
            <p className="text-label">No hay productos destacados disponibles.</p>
          ) : (
            <div className="flex w-full items-center justify-center gap-2 sm:gap-4">
              <div className="flex shrink-0 justify-start">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={handlePrevSlide}
                  className="border-none bg-transparent shadow-none"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 flex justify-center gap-3 sm:gap-4 flex-wrap md:flex-nowrap max-w-5xl mx-auto">
                {Array.from({ length: Math.min(3, featuredProducts.length) }).map((_, index) => {
                  const productIndex = (currentSlide + index) % featuredProducts.length;
                  const product = featuredProducts[productIndex];

                  return (
                    <div
                      key={`carousel-${product.id}-${product.title}`}
                      className="flex w-70 shrink-0 justify-center"
                    >
                      <Card
                        product={product}
                        onClick={() => handleCardClick(product.id)}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="shrink-0 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={handleNextSlide}
                  className="bg-transparent border-none shadow-none"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* =========================
            GRID DE PRODUCTOS
           ========================= */}
        <h2 className="text-2xl font-semibold mb-4 text-left">
          Productos
        </h2>

        {products.length === 0 ? (
          <p className="text-label">No hay productos disponibles en este momento.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center cursor-pointer">
            {products.map((product) => (
              <div key={product.id} className="w-60 space-y-4">
                <Card
                  product={product}
                  onClick={() => handleCardClick(product.id)}
                />

                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={() => handleBuy(product)}
                  className="flex w-full items-center justify-center gap-2"
                >
                  Agregar
                  <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* =========================
          MODAL DE AGREGADO
         ========================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Producto agregado al carrito"
        message={
          selectedProduct
            ? `Has agregado 1 unidad de ${selectedProduct.title ?? selectedProduct.name} a tu carrito.`
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