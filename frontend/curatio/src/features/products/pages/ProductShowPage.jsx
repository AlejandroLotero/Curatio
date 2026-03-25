import { useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components";
import Modal from "@/shared/components/Modal";
import { listProducts } from "@/data/product/listProducts";

export default function ProductShowPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const source = searchParams.get("source") || "new"; // "new" o "home"
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = listProducts.find((p) => p.id == id);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Producto no encontrado</p>
          <Button variant="primary" size="md" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-0 pb-12 bggall font-roboto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botón Volver */}
        <Link
          to="/"
          className="inline-flex items-center justify-center w-16 h-16 mb-2 text-label hover:opacity-70 transition-colors"
          title="Volver"
        >
          <ArrowLeft size={32} />
        </Link>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bgformglass rounded-lg p-2 sm:p-4 shadow-lg border-2 border-black">
          {/* Columna izquierda: Imagen */}
          <div className="flex items-start justify-center">
            <div className="w- aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center overflow-hidden mt-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400?text=" +
                    encodeURIComponent(product.title);
                }}
              />
            </div>
          </div>

          {/* Columna derecha: Información */}
          <div className="flex flex-col justify-between">
            {/* Encabezado */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-label">
                {product.title}
              </h1>
              <p className="text-sm text-label mb-4">
                Laboratorio: <span className="font-semibold">{product.laboratory}</span>
              </p>

              {/* Precio destacado */}
              <div className="bg-gradient-to-r from-[var(--color-secondary-600)] to-[var(--color-secondary-400)] text-white p-4 rounded-lg mb-6">
                <p className="text-sm mb-1 text-label">Precio:</p>
                <p className="text-3xl font-bold text-label">${product.price.toLocaleString('es-CO')}</p>
              </div>

              {/* Stock */}
              <div className="mb-6">
                <p
                  className={`text-sm font-semibold text-label ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `✓ ${product.stock} unidades disponibles`
                    : "Agotado"}
                </p>
              </div>

              {/* Cuadro con borde negro: Descripción a Vencimiento */}
              <div className="mb-6 p-4 border-2 border-black rounded-lg bg-white/30 backdrop-blur-md shadow-xl">
                {/* Descripción */}
                <h2 className="text-lg font-semibold mb-2 text-label">Descripción</h2>
                <p className="text-label leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Información técnica */}
                <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-white/30 rounded-lg">
                  <div>
                    <p className="text-xs text-label mb-1">Forma</p>
                    <p className="font-semibold text-sm text-label">
                      {product.formaFarmaceutica}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-label mb-1">Presentación</p>
                    <p className="font-semibold text-sm text-label">{product.presentacion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-label mb-1">Concentración</p>
                    <p className="font-semibold text-sm text-label">{product.concentration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-label mb-1">Vía</p>
                    <p className="font-semibold text-sm text-label">
                      {product.administration_guide}
                    </p>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="space-y-2 text-sm text-label">
                  <p>
                    <span className="font-semibold">Lote:</span> {product.lote}
                  </p>
                  <p>
                    <span className="font-semibold">Vencimiento:</span>{" "}
                    {product.fechaVencimiento}
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones de compra */}
            <div className="border-t border-t-black space-y-2 flex flex-col gap-2">
              {/* Selector de cantidad */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-label">Cantidad:</span>
                <div className="flex items-center gap-2 bg-transparent rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-200 rounded transition text-black"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-semibold text-label">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-2 hover:bg-gray-200 rounded transition text-black"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  
                >
                  {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Producto agregado"
        message={`Has agregado ${quantity} unidad(es) de ${product.title} a tu carrito.`}
      >
        <div className="flex justify-center gap-4">
          <Button variant="secondary" size="md" onClick={handleCloseModal}>
            Continuar comprando
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              handleCloseModal();
              if (source === "home") {
                navigate("/cart");
              } else if (source === "new") {
                navigate("/login");
              }
            }}
          >
            {source === "home" ? "Ir al carrito" : "Iniciar sesión"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
