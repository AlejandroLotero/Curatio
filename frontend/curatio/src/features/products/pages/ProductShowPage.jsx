// // import { useMemo, useState } from "react";
// // import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
// // import { Plus, Minus, ArrowLeft } from "lucide-react";
// // import { Button } from "@/shared/components";
// // import Modal from "@/shared/components/Modal";
// // import { listProducts } from "@/data/product/listProducts";
// // import { products as visualProducts } from "@/data/product/products";
// // import { useCart } from "@/features/cartshop/context/CartContext";

// // /**
// //  * ProductShowPage
// //  * ---------------
// //  * Vista de detalle del producto.
// //  *
// //  * Responsabilidades:
// //  * - Mostrar información detallada del medicamento
// //  * - Mezclar datos reales del medicamento + imagen visual mock
// //  * - Permitir agregar al carrito real
// //  */
// // export default function ProductShowPage() {
// //   const { id } = useParams();
// //   const [searchParams] = useSearchParams();
// //   const navigate = useNavigate();

// //   const source = searchParams.get("source") || "new";

// //   const { addMedicationToCart, isMutatingCart } = useCart();

// //   const [quantity, setQuantity] = useState(1);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   /**
// //    * Producto real del catálogo detallado.
// //    */
// //   const product = useMemo(() => {
// //     return listProducts.find((item) => item.id === Number(id));
// //   }, [id]);

// //   /**
// //    * Producto visual para imagen/título comercial.
// //    */
// //   const visualProduct = useMemo(() => {
// //     return visualProducts.find((item) => item.id === Number(id));
// //   }, [id]);

// //   /**
// //    * Combina ambas fuentes.
// //    */
// //   const mergedProduct = useMemo(() => {
// //     if (!product) return null;

// //     return {
// //       ...product,
// //       image: visualProduct?.image ?? null,
// //       title: visualProduct?.title ?? product.nameproduct,
// //       price: visualProduct?.price ?? product.precioVenta,
// //     };
// //   }, [product, visualProduct]);

// //   if (!mergedProduct) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="text-center">
// //           <p className="text-xl mb-4 text-label">Producto no encontrado</p>
// //           <Button variant="primary" size="md" onClick={() => navigate("/")}>
// //             Volver al inicio
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   /**
// //    * Agrega al carrito real.
// //    */
// //   const handleAddToCart = async () => {
// //     try {
// //       const result = await addMedicationToCart({
// //         medicationId: mergedProduct.id,
// //         quantity,
// //       });

// //       if (result.ok) {
// //         setIsModalOpen(true);
// //       }
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //     }
// //   };

// //   /**
// //    * Cierra modal.
// //    */
// //   const handleCloseModal = () => {
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div className="min-h-screen pt-0 pb-12 bggall font-roboto">
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Botón volver */}
// //         <Link
// //           to={source === "new" ? "/" : "/home"}
// //           className="inline-flex items-center justify-center w-16 h-16 mb-2 text-label hover:opacity-70 transition-colors"
// //           title="Volver"
// //         >
// //           <ArrowLeft size={32} />
// //         </Link>

// //         {/* Contenedor principal */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bgformglass rounded-lg p-2 sm:p-4 shadow-lg border-2 border-black">
// //           {/* Imagen */}
// //           <div className="flex items-start justify-center">
// //             <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center overflow-hidden mt-2">
// //               {mergedProduct.image ? (
// //                 <img
// //                   src={mergedProduct.image}
// //                   alt={mergedProduct.nameproduct}
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="p-6 text-center text-label">
// //                   Sin imagen disponible
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Información */}
// //           <div className="flex flex-col justify-between">
// //             <div>
// //               <h1 className="text-3xl md:text-4xl font-bold mb-2 text-label">
// //                 {mergedProduct.nameproduct}
// //               </h1>

// //               <p className="text-sm text-label mb-4">
// //                 Laboratorio:{" "}
// //                 <span className="font-semibold">{mergedProduct.laboratory}</span>
// //               </p>

// //               {/* Precio */}
// //               <div className="bg-gradient-to-r from-[var(--color-secondary-600)] to-[var(--color-secondary-400)] text-white p-4 rounded-lg mb-6">
// //                 <p className="text-sm mb-1 text-label">Precio:</p>
// //                 <p className="text-3xl font-bold text-label">
// //                   ${Number(mergedProduct.precioVenta).toLocaleString("es-CO")}
// //                 </p>
// //               </div>

// //               {/* Stock */}
// //               <div className="mb-6">
// //                 <p
// //                   className={`text-sm font-semibold text-label ${
// //                     mergedProduct.stock > 0 ? "text-green-600" : "text-red-600"
// //                   }`}
// //                 >
// //                   {mergedProduct.stock > 0
// //                     ? `✓ ${mergedProduct.stock} unidades disponibles`
// //                     : "Agotado"}
// //                 </p>
// //               </div>

// //               {/* Descripción + info */}
// //               <div className="mb-6 p-4 border-2 border-black rounded-lg bg-white/30 backdrop-blur-md shadow-xl">
// //                 <h2 className="text-lg font-semibold mb-2 text-label">
// //                   Descripción
// //                 </h2>

// //                 <p className="text-label leading-relaxed mb-4">
// //                   {mergedProduct.descripcion}
// //                 </p>

// //                 <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-white/30 rounded-lg">
// //                   <div>
// //                     <p className="text-xs text-label mb-1">Forma</p>
// //                     <p className="font-semibold text-sm text-label">
// //                       {mergedProduct.formaFarmaceutica}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs text-label mb-1">Presentación</p>
// //                     <p className="font-semibold text-sm text-label">
// //                       {mergedProduct.presentacion}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs text-label mb-1">Concentración</p>
// //                     <p className="font-semibold text-sm text-label">
// //                       {mergedProduct.concentration}
// //                     </p>
// //                   </div>

// //                   <div>
// //                     <p className="text-xs text-label mb-1">Vía</p>
// //                     <p className="font-semibold text-sm text-label">
// //                       {mergedProduct.administration_guide}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2 text-sm text-label">
// //                   <p>
// //                     <span className="font-semibold">Lote:</span>{" "}
// //                     {mergedProduct.lote}
// //                   </p>
// //                   <p>
// //                     <span className="font-semibold">Vencimiento:</span>{" "}
// //                     {mergedProduct.fechaVencimiento}
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Acciones */}
// //             <div className="border-t border-t-black space-y-2 flex flex-col gap-2">
// //               <div className="flex items-center gap-4">
// //                 <span className="text-sm font-semibold text-label">
// //                   Cantidad:
// //                 </span>

// //                 <div className="flex items-center gap-2 bg-transparent rounded-lg p-1">
// //                   <button
// //                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                     className="p-2 hover:bg-gray-200 rounded transition text-black"
// //                     disabled={quantity <= 1}
// //                   >
// //                     <Minus size={18} />
// //                   </button>

// //                   <span className="w-12 text-center font-semibold text-label">
// //                     {quantity}
// //                   </span>

// //                   <button
// //                     onClick={() =>
// //                       setQuantity(Math.min(mergedProduct.stock, quantity + 1))
// //                     }
// //                     className="p-2 hover:bg-gray-200 rounded transition text-black"
// //                     disabled={quantity >= mergedProduct.stock}
// //                   >
// //                     <Plus size={18} />
// //                   </button>
// //                 </div>

// //                 <Button
// //                   variant="primary"
// //                   size="md"
// //                   type="button"
// //                   onClick={handleAddToCart}
// //                   disabled={mergedProduct.stock === 0 || isMutatingCart}
// //                 >
// //                   {mergedProduct.stock > 0 ? "Agregar al carrito" : "Agotado"}
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal */}
// //       <Modal
// //         isOpen={isModalOpen}
// //         onClose={handleCloseModal}
// //         title="Producto agregado"
// //         message={`Has agregado ${quantity} unidad(es) de ${mergedProduct.nameproduct} a tu carrito.`}
// //       >
// //         <div className="flex justify-center gap-4">
// //           <Button variant="secondary" size="md" onClick={handleCloseModal}>
// //             Continuar comprando
// //           </Button>

// //           <Button
// //             variant="primary"
// //             size="md"
// //             onClick={() => {
// //               handleCloseModal();
// //               navigate("/cartshop/ver-carrito");
// //             }}
// //           >
// //             Ir al carrito
// //           </Button>
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // }

// import { useMemo, useState } from "react";
// import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { Plus, Minus, ArrowLeft } from "lucide-react";
// import { Button, Modal } from "@/shared/components";
// import { products } from "@/data/product/products";
// import { listProducts } from "@/data/product/listProducts";
// import { useCart } from "@/features/cartshop/context/CartContext";

// /**
//  * ProductShowPage
//  * ----------------
//  * Vista de detalle visual/comercial del producto.
//  *
//  * Uso:
//  * - Dashboard / catálogo
//  * - Home pública / comercial
//  *
//  * No reemplaza el detalle administrativo.
//  */
// export default function ProductShowPage() {
//   const { id } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { addToCartItem } = useCart();

//   /**
//    * Source indica desde dónde se abrió el detalle.
//    * Sirve para reglas futuras de navegación.
//    */
//   const source = searchParams.get("source") || "dashboard";

//   /**
//    * Cantidad local del producto.
//    */
//   const [quantity, setQuantity] = useState(1);

//   /**
//    * Modal de confirmación de agregado al carrito.
//    */
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   /**
//    * Producto visual del catálogo.
//    */
//   const visualProduct = useMemo(
//     () => products.find((item) => String(item.id) === String(id)),
//     [id]
//   );

//   /**
//    * Producto técnico/administrativo.
//    */
//   const inventoryProduct = useMemo(
//     () => listProducts.find((item) => String(item.id) === String(id)),
//     [id]
//   );

//   /**
//    * Unifica la data visual + técnica para la vista.
//    */
//   const product = useMemo(() => {
//     if (!visualProduct && !inventoryProduct) return null;

//     return {
//       id: inventoryProduct?.id ?? visualProduct?.id,
//       title: visualProduct?.title ?? inventoryProduct?.nameproduct ?? "Producto",
//       image: visualProduct?.image ?? null,
//       price: visualProduct?.price ?? inventoryProduct?.precioVenta ?? 0,
//       description:
//         visualProduct?.description ??
//         inventoryProduct?.descripcion ??
//         "Sin descripción disponible.",
//       category: visualProduct?.category ?? "",
//       nameproduct: inventoryProduct?.nameproduct ?? visualProduct?.title ?? "",
//       laboratory: inventoryProduct?.laboratory ?? "No disponible",
//       stock: inventoryProduct?.stock ?? 0,
//       descripcion: inventoryProduct?.descripcion ?? visualProduct?.description ?? "",
//       formaFarmaceutica: inventoryProduct?.formaFarmaceutica ?? "No disponible",
//       presentacion: inventoryProduct?.presentacion ?? "No disponible",
//       concentration: inventoryProduct?.concentration ?? "No disponible",
//       administration_guide: inventoryProduct?.administration_guide ?? "No disponible",
//       lote: inventoryProduct?.lote ?? "No disponible",
//       fechaVencimiento: inventoryProduct?.fechaVencimiento ?? "No disponible",
//       precioVenta: inventoryProduct?.precioVenta ?? visualProduct?.price ?? 0,
//     };
//   }, [visualProduct, inventoryProduct]);

//   /**
//    * Si no existe el producto, mostrar fallback.
//    */
//   if (!product) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <p className="text-xl mb-4">Producto no encontrado</p>
//           <Button variant="primary" size="md" onClick={() => navigate("/")}>
//             Volver al inicio
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   /**
//    * Agrega al carrito real.
//    */
//   const handleAddToCart = async () => {
//     try {
//       await addToCartItem({
//         productId: product.id,
//         quantity,
//       });

//       setIsModalOpen(true);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   /**
//    * Cierra modal.
//    */
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen pt-0 pb-12 bggall font-roboto">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Botón volver */}
//         <Link
//           to={source === "dashboard" ? "/" : "/"}
//           className="inline-flex items-center justify-center w-16 h-16 mb-2 text-label hover:opacity-70 transition-colors"
//           title="Volver"
//         >
//           <ArrowLeft size={32} />
//         </Link>

//         {/* Contenedor principal */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bgformglass rounded-lg p-2 sm:p-4 shadow-lg border-2 border-black">
//           {/* Imagen */}
//           <div className="flex items-start justify-center">
//             <div className="aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center overflow-hidden mt-2 w-full max-w-md">
//               {product.image ? (
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full text-label">
//                   Sin imagen
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Información */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold mb-2 text-label">
//                 {product.title}
//               </h1>

//               <p className="text-sm text-label mb-4">
//                 Laboratorio:{" "}
//                 <span className="font-semibold">{product.laboratory}</span>
//               </p>

//               {/* Precio */}
//               <div className="bg-gradient-to-r from-[var(--color-secondary-600)] to-[var(--color-secondary-400)] text-white p-4 rounded-lg mb-6">
//                 <p className="text-sm mb-1 text-label">Precio:</p>
//                 <p className="text-3xl font-bold text-label">
//                   ${Number(product.precioVenta).toLocaleString("es-CO")}
//                 </p>
//               </div>

//               {/* Stock */}
//               <div className="mb-6">
//                 <p
//                   className={`text-sm font-semibold text-label ${
//                     product.stock > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {product.stock > 0
//                     ? `✓ ${product.stock} unidades disponibles`
//                     : "Agotado"}
//                 </p>
//               </div>

//               {/* Caja de detalle */}
//               <div className="mb-6 p-4 border-2 border-black rounded-lg bg-white/30 backdrop-blur-md shadow-xl">
//                 <h2 className="text-lg font-semibold mb-2 text-label">
//                   Descripción
//                 </h2>

//                 <p className="text-label leading-relaxed mb-4">
//                   {product.descripcion}
//                 </p>

//                 <div className="grid grid-cols-2 gap-2 mb-2 p-2 bg-white/30 rounded-lg">
//                   <div>
//                     <p className="text-xs text-label mb-1">Forma</p>
//                     <p className="font-semibold text-sm text-label">
//                       {product.formaFarmaceutica}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-label mb-1">Presentación</p>
//                     <p className="font-semibold text-sm text-label">
//                       {product.presentacion}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-label mb-1">Concentración</p>
//                     <p className="font-semibold text-sm text-label">
//                       {product.concentration}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-label mb-1">Vía</p>
//                     <p className="font-semibold text-sm text-label">
//                       {product.administration_guide}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-2 text-sm text-label">
//                   <p>
//                     <span className="font-semibold">Lote:</span> {product.lote}
//                   </p>
//                   <p>
//                     <span className="font-semibold">Vencimiento:</span>{" "}
//                     {product.fechaVencimiento}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Acciones */}
//             <div className="border-t border-t-black space-y-2 flex flex-col gap-2">
//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-semibold text-label">
//                   Cantidad:
//                 </span>

//                 <div className="flex items-center gap-2 bg-transparent rounded-lg p-1">
//                   <button
//                     type="button"
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="p-2 hover:bg-gray-200 rounded transition text-black"
//                     disabled={quantity <= 1}
//                   >
//                     <Minus size={18} />
//                   </button>

//                   <span className="w-12 text-center font-semibold text-label">
//                     {quantity}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                     className="p-2 hover:bg-gray-200 rounded transition text-black"
//                     disabled={quantity >= product.stock}
//                   >
//                     <Plus size={18} />
//                   </button>
//                 </div>

//                 <Button
//                   variant="primary"
//                   size="md"
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={product.stock === 0}
//                 >
//                   {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title="Producto agregado"
//         message={`Has agregado ${quantity} unidad(es) de ${product.title} a tu carrito.`}
//       >
//         <div className="flex justify-center gap-4">
//           <Button
//             variant="secondary"
//             size="md"
//             type="button"
//             onClick={handleCloseModal}
//           >
//             Continuar comprando
//           </Button>

//           <Button
//                   variant="primary"
//                   size="md"
//                   onClick={() => {
//                     handleCloseModal();
//                     if (source === "home") {
//                       navigate("/cart");
//                     } else if (source === "new") {
//                       navigate("/");
//                     }
//                   }}
//                 >
//                   {source === "home" ? "Ir a carrito" : "Agregar a Carrito"}
//                 </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/components";
import Modal from "@/shared/components/Modal";
import { listProducts } from "@/data/product/listProducts";
import { products as visualProducts } from "@/data/product/products";
import { useCart } from "@/features/cartshop/context/CartContext";

export default function ProductShowPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /**
   * Source solo controla navegación de retorno si luego la necesitas.
   */
  const source = searchParams.get("source") || "new";

  /**
   * Contexto del carrito público.
   */
  const { addToCartItem } = useCart();

  /**
   * Estado local de cantidad.
   */
  const [quantity, setQuantity] = useState(1);

  /**
   * Modal de confirmación.
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Producto administrativo/técnico.
   */
  const inventoryProduct = useMemo(
    () => listProducts.find((p) => String(p.id) === String(id)),
    [id]
  );

  /**
   * Producto visual del catálogo.
   */
  const visualProduct = useMemo(
    () => visualProducts.find((p) => String(p.id) === String(id)),
    [id]
  );

  /**
   * Mezcla de información visual + técnica.
   */
  const product = useMemo(() => {
    if (!inventoryProduct && !visualProduct) return null;

    return {
      id: inventoryProduct?.id ?? visualProduct?.id,
      nameproduct:
        inventoryProduct?.nameproduct ??
        visualProduct?.title ??
        "Producto",
      title:
        visualProduct?.title ??
        inventoryProduct?.nameproduct ??
        "Producto",
      image: visualProduct?.image ?? null,
      laboratory: inventoryProduct?.laboratory ?? "No disponible",
      precioVenta:
        inventoryProduct?.precioVenta ??
        visualProduct?.price ??
        0,
      stock: inventoryProduct?.stock ?? 0,
      descripcion:
        inventoryProduct?.descripcion ??
        visualProduct?.description ??
        "",
      formaFarmaceutica: inventoryProduct?.formaFarmaceutica ?? "",
      presentacion: inventoryProduct?.presentacion ?? "",
      concentration: inventoryProduct?.concentration ?? "",
      administration_guide: inventoryProduct?.administration_guide ?? "",
      lote: inventoryProduct?.lote ?? "",
      fechaVencimiento: inventoryProduct?.fechaVencimiento ?? "",
    };
  }, [inventoryProduct, visualProduct]);

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

  /**
   * Agrega al carrito sin login.
   */
  const handleAddToCart = async () => {
    try {
      await addToCartItem({
        productId: product.id,
        quantity,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  /**
   * Cierra el modal.
   */
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
          {/* Imagen */}
          <div className="flex items-start justify-center">
            <div className="w- aspect-square bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center overflow-hidden mt-2">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.nameproduct}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-label">
                  Sin imagen
                </div>
              )}
            </div>
          </div>

          {/* Información */}
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

              {/* Descripción y datos */}
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

            {/* Acciones */}
            <div className="border-t border-t-black space-y-2 flex flex-col gap-2">
              <div className="flex items-center gap-4 p-2">
                <span className="text-sm font-semibold text-label">
                  Cantidad:
                </span>

                <div className="flex items-center gap-2 bg-transparent rounded-lg p-1">
                  <button
                    type="button"
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
                    type="button"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-2 hover:bg-gray-200 rounded transition text-black"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  
                >
                  {product.stock > 0 ? "Agregar al carrito" : "Agotado"}
                </Button> */}

                <Button
                  variant="primary"
                  size="md"
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock > 0 ? (
                    <>
                      Agregar al carrito <ShoppingCart/>
                    </>
                  ) : (
                    "Agotado"
                  )}
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
        message={`Has agregado ${quantity} unidad(es) de ${product.nameproduct} a tu carrito.`}
      >
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            size="md"
            type="button"
            onClick={() => {
              handleCloseModal();
              navigate("/");
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