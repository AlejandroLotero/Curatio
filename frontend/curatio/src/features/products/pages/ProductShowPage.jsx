
import { useEffect, useMemo, useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components";
import Modal from "@/shared/components/Modal";
import { products as visualProducts } from "@/data/product/products";
import { useCart } from "@/features/cartshop/context/CartContext";
import { getPublicMedicationById } from "@/lib/http/publicMedications";
import { adaptPublicMedicationDetail } from "@/lib/adapters/publicMedicationAdapter";

/**
 * ProductShowPage
 * ---------------
 * Detalle comercial / visual de medicamento.
 *
 * Fuente real:
 * - backend público de medicamentos
 *
 * Fuente complementaria:
 * - visualProducts para fallback visual local
 *
 * Objetivo:
 * - cliente puede ver el detalle sin login
 * - admin y farmaceuta también pueden usar este detalle
 *   como apoyo visual para búsqueda / venta rápida
 */
export default function ProductShowPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Fuente desde donde se abrió el detalle.
   *
   * Valores esperados hoy:
   * - dashboard   -> desde home pública / navbar cliente
   * - admin       -> desde navbar administrativo
   * - backoffice  -> compatibilidad si ya quedó alguna navegación previa
   *
   * Fallback:
   * - dashboard
   */
  const source = searchParams.get("source") || "dashboard";

  /**
   * Contexto del carrito.
   */
  const { addToCartItem } = useCart();

  /**
   * Estado local de la pantalla.
   */
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [productDetail, setProductDetail] = useState(null);

  /**
   * Producto visual local.
   * Solo se usa como fallback para:
   * - imagen
   * - título visual
   *
   * Esto evita romper el detalle si el backend
   * todavía no tiene imagen asociada.
   */
  const visualProduct = useMemo(
    () => visualProducts.find((p) => String(p.id) === String(id)),
    [id]
  );

  /**
   * Determina a dónde debe volver el usuario
   * según el origen de navegación.
   */
  const backTarget = useMemo(() => {
    if (source === "admin" || source === "backoffice") {
      return "/products/listar";
    }

    return "/";
  }, [source]);

  /**
   * Carga detalle real desde backend.
   */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await getPublicMedicationById(id);
        const adapted = adaptPublicMedicationDetail(response?.data?.medication);

        setProductDetail(adapted);
      } catch (error) {
        console.error("Error loading public medication detail:", error);
        setErrorMessage("No se pudo cargar el detalle del producto.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  /**
   * Une backend real + fallback visual local.
   */
  const product = useMemo(() => {
    if (!productDetail) return null;

    return {
      id: productDetail.id,
      nameproduct: productDetail.name,
      title: visualProduct?.title ?? productDetail.name,
      image: productDetail.imageUrl ?? visualProduct?.image ?? null,
      laboratory: productDetail.laboratory,
      precioVenta: productDetail.salePrice,
      stock: productDetail.stock,
      descripcion: productDetail.description,
      formaFarmaceutica: productDetail.pharmaceuticalForm,
      presentacion: productDetail.presentation,
      concentration: productDetail.concentration,
      administration_guide: productDetail.administrationRoute,
      lote: productDetail.batch,
      fechaVencimiento: productDetail.expirationDate,
      canBeSold: productDetail.canBeSold,
      status: productDetail.status,
    };
  }, [productDetail, visualProduct]);

  /**
   * Agrega el producto al carrito.
   *
   * Regla:
   * - no requiere login
   * - respeta cantidad seleccionada
   */
  const handleAddToCart = async () => {
  if (!product) return;

  try {
    await addToCartItem({
      productId: product.id,
      productName: product.nameproduct,
      quantity,
      unitPrice: product.precioVenta,
      imageUrl: product.image ?? null,
      laboratory: product.laboratory ?? "",
    });

    setIsModalOpen(true);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

  /**
   * Cierra modal.
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Estado de carga.
   */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-label">
        Cargando producto...
      </div>
    );
  }

  /**
   * Estado de error o producto inexistente.
   */
  if (errorMessage || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4 text-label">
            {errorMessage || "Producto no encontrado"}
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(backTarget)}
          >
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 pb-12 bggall font-roboto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================
            BOTÓN VOLVER
           ========================= */}
        <Link
          to={backTarget}
          className="inline-flex items-center justify-center w-10 h-10 mb-2 text-label rounded-lg transition-all duration-300 hover:opacity-100 hover:bg-white/20 hover:shadow-sm hover:scale-110"
          title="Volver"
        >
          <ArrowLeft size={20} />
        </Link>

        {/* =========================
            CONTENEDOR PRINCIPAL
           ========================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bgformglass rounded-lg p-2 sm:p-4 shadow-lg border-2 border-black">
          {/* =========================
              IMAGEN
             ========================= */}
          <div className="flex w-full items-start justify-center md:justify-center">
            <div
              className="
                mt-2 flex aspect-square w-full max-w-sm shrink-0
                items-center justify-center overflow-hidden rounded-lg
                bg-gradient-to-br from-cyan-100 to-blue-100
              "
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.nameproduct}
                  className="h-full w-full object-contain object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-label">
                  Sin imagen
                </div>
              )}
            </div>
          </div>

          {/* =========================
              INFORMACIÓN
             ========================= */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-label">
                {product.nameproduct}
              </h1>

              <p className="text-sm text-label mb-4">
                Laboratorio:{" "}
                <span className="font-semibold">{product.laboratory}</span>
              </p>

              {/* Precio */}
              <div className="bg-gradient-to-r from-[var(--color-secondary-600)] to-[var(--color-secondary-400)] text-white p-4 rounded-lg mb-6">
                <p className="text-sm mb-1 text-label">Precio:</p>
                <p className="text-3xl font-bold text-label">
                  ${Number(product.precioVenta).toLocaleString("es-CO")}
                </p>
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

              {/* Descripción e info técnica */}
              <div className="mb-6 p-4 border-2 border-black rounded-lg bg-white/30 backdrop-blur-md shadow-xl">
                <h2 className="text-lg font-semibold mb-2 text-label">
                  Descripción
                </h2>

                <p className="text-label leading-relaxed mb-4">
                  {product.descripcion}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-white/30 rounded-lg">
                  <div>
                    <p className="text-xs text-label mb-1">Forma</p>
                    <p className="font-semibold text-sm text-label">
                      {product.formaFarmaceutica}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-label mb-1">Presentación</p>
                    <p className="font-semibold text-sm text-label">
                      {product.presentacion}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-label mb-1">Concentración</p>
                    <p className="font-semibold text-sm text-label">
                      {product.concentration}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-label mb-1">Vía</p>
                    <p className="font-semibold text-sm text-label">
                      {product.administration_guide}
                    </p>
                  </div>
                </div>

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

            {/* =========================
                ACCIONES DE COMPRA
               ========================= */}
            <div className="border-t border-t-black space-y-2 flex flex-col gap-2">
              <div className="flex items-center gap-4 p-2">
                <span className="text-sm font-semibold text-label">
                  Cantidad:
                </span>

                <div className="flex items-center gap-2 bg-transparent rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    //Modificacion de tono de gris para resaltar el plus y Minus
                    className="p-2 hover:bg-gray-900/80  rounded transition text-black"
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
                    //Modificacion de tono de gris para resaltar el plus y Minus
                    className="p-2 hover:bg-gray-900/80 rounded transition text-black"
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
                  disabled={product.stock === 0 || !product.canBeSold}
                  className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock > 0 && product.canBeSold ? (
                    <>
                      Agregar al carrito <ShoppingCart />
                    </>
                  ) : (
                    "No disponible"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MODAL DE CONFIRMACIÓN
         ========================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Producto agregado"
        message={`Has agregado ${quantity} unidad(es) de ${product.nameproduct} a tu carrito.`}
      >
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={() => {
              handleCloseModal();
              navigate(backTarget);
            }}
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
}