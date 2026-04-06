// import { Trash2 } from "lucide-react";
// import { Button } from "@/shared/components";

// /**
//  * CartProductCard
//  * ---------------
//  * Card visual de cada producto dentro del carrito.
//  *
//  * Muestra:
//  * - imagen
//  * - laboratorio
//  * - nombre
//  * - cantidad
//  * - precio unitario
//  * - subtotal
//  * - acción de quitar
//  */
// export default function CartProductCard({
//   item,
//   isMutatingCart,
//   onRemove,
// }) {
//   const imageUrl = item.imageUrl ?? null;
//   const productName = item.productName ?? "Producto";
//   const laboratory = item.laboratory ?? "Laboratorio no disponible";
//   const quantity = Number(item.quantity ?? 0);
//   const unitPrice = Number(item.unitPrice ?? 0);
//   const subtotal = Number(item.subtotal ?? 0);

//   return (
//     <article
//       className="
//         rounded-2xl border border-border/40
//         bg-white/80
//         p-4 sm:p-5
//         shadow-sm
//       "
//     >
//       <div className="flex flex-col md:flex-row md:items-center gap-4">
//         {/* Imagen */}
//         <div className="w-full md:w-[110px] md:min-w-[110px]">
//           <div
//             className="
//               h-[110px] w-full rounded-2xl
//               bg-cyan-50 border border-border/30
//               overflow-hidden flex items-center justify-center
//             "
//           >
//             {imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt={productName}
//                 className="h-full w-full object-contain"
//               />
//             ) : (
//               <div className="px-3 text-center text-xs text-gray-500">
//                 Sin imagen
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Información */}
//         <div className="flex-1 min-w-0">
//           <p className="text-xs uppercase tracking-wide text-label/60 mb-1">
//             {laboratory}
//           </p>

//           <h3 className="text-lg sm:text-xl font-semibold text-label leading-snug">
//             {productName}
//           </h3>

//           <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-label/80">
//             <span>
//               Cantidad: <strong className="text-label">{quantity}</strong>
//             </span>

//             <span>
//               Precio unitario:{" "}
//               <strong className="text-label">
//                 ${unitPrice.toLocaleString("es-CO")}
//               </strong>
//             </span>
//           </div>
//         </div>

//         {/* Subtotal y acción */}
//         <div className="flex flex-col items-start md:items-end gap-3">
//           <div className="text-left md:text-right">
//             <p className="text-xs text-label/60 mb-1">Subtotal</p>
//             <p className="text-2xl font-bold text-label">
//               ${subtotal.toLocaleString("es-CO")}
//             </p>
//           </div>

//           <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             disabled={isMutatingCart}
//             onClick={onRemove}
//             className="flex items-center gap-2"
//           >
//             <Trash2 className="w-4 h-4" />
//             Quitar
//           </Button>
//         </div>
//       </div>
//     </article>
//   );
// }

//V2
// import { Trash2 } from "lucide-react";
// import { Button } from "@/shared/components";

// /**
//  * CartProductCard
//  * ---------------
//  * Card visual premium de cada producto dentro del carrito.
//  *
//  * Diseño:
//  * - imagen a la izquierda
//  * - laboratorio y nombre al centro
//  * - precio/subtotal y acción a la derecha
//  */
// export default function CartProductCard({
//   item,
//   isMutatingCart,
//   onRemove,
// }) {
//   const imageUrl = item.imageUrl ?? null;
//   const productName = item.productName ?? "Producto";
//   const laboratory = item.laboratory ?? "Laboratorio no disponible";
//   const quantity = Number(item.quantity ?? 0);
//   const unitPrice = Number(item.unitPrice ?? 0);
//   const subtotal = Number(item.subtotal ?? 0);

//   return (
//     <article
//       className="
//         rounded-3xl border border-border/30
//         bg-white/85 backdrop-blur-sm
//         px-4 py-4 sm:px-5 sm:py-5
//         shadow-sm transition-shadow
//         hover:shadow-md
//       "
//     >
//       <div className="flex flex-col lg:flex-row lg:items-center gap-4">
//         {/* =========================
//             IMAGEN
//            ========================= */}
//         <div className="w-full lg:w-[120px] lg:min-w-[120px]">
//           <div
//             className="
//               h-[120px] w-full rounded-2xl
//               border border-border/30
//               bg-cyan-50
//               overflow-hidden flex items-center justify-center
//             "
//           >
//             {imageUrl ? (
//               <img
//                 src={imageUrl}
//                 alt={productName}
//                 className="h-full w-full object-contain"
//               />
//             ) : (
//               <div className="px-3 text-center text-xs text-gray-500">
//                 Sin imagen
//               </div>
//             )}
//           </div>
//         </div>

//         {/* =========================
//             INFORMACIÓN PRINCIPAL
//            ========================= */}
//         <div className="flex-1 min-w-0">
//           <p className="text-xs uppercase tracking-wide text-label/50 italic mb-1">
//             {laboratory}
//           </p>

//           <h3 className="text-lg sm:text-xl font-semibold text-label leading-snug">
//             {productName}
//           </h3>

//           <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
//             <div className="rounded-full bg-surface/70 px-3 py-1.5 text-sm text-label">
//               Cantidad: <strong>{quantity}</strong>
//             </div>

//             <div className="rounded-full bg-surface/70 px-3 py-1.5 text-sm text-label">
//               Unitario: <strong>${unitPrice.toLocaleString("es-CO")}</strong>
//             </div>
//           </div>
//         </div>

//         {/* =========================
//             RESUMEN DEL ITEM
//            ========================= */}
//         <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[180px]">
//           <div className="text-left lg:text-right">
//             <p className="text-xs text-label/60 mb-1">Subtotal</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary-600)]">
//               ${subtotal.toLocaleString("es-CO")}
//             </p>
//           </div>

//           <Button
//             variant="secondary"
//             size="sm"
//             type="button"
//             disabled={isMutatingCart}
//             onClick={onRemove}
//             className="flex items-center gap-2"
//           >
//             <Trash2 className="w-4 h-4" />
//             Quitar
//           </Button>
//         </div>
//       </div>
//     </article>
//   );
// }

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/shared/components";

/**
 * CartProductCard
 * ---------------
 * Card visual del producto dentro del carrito.
 *
 * Reglas:
 * - si quantity > 1, se muestra botón menos
 * - si quantity === 1, se muestra papelera
 * - botón más siempre incrementa
 */
export default function CartProductCard({
  item,
  isMutatingCart,
  onRemove,
  onIncrease,
  onDecrease,
}) {
  const imageUrl = item.imageUrl ?? null;
  const productName = item.productName ?? "Producto";
  const laboratory = item.laboratory ?? "Laboratorio no disponible";
  const quantity = Number(item.quantity ?? 0);
  const unitPrice = Number(item.unitPrice ?? 0);
  const subtotal = Number(item.subtotal ?? 0);

  return (
    <article
      className="
        rounded-3xl border border-border/30
        bg-white/85 backdrop-blur-sm
        px-4 py-4 sm:px-5 sm:py-5
        shadow-sm transition-shadow
        hover:shadow-md
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* =========================
            IMAGEN
           ========================= */}
        <div className="w-full lg:w-[120px] lg:min-w-[120px]">
          <div
            className="
              h-[120px] w-full rounded-2xl
              border border-border/30
              bg-cyan-50
              overflow-hidden flex items-center justify-center
            "
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={productName}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="px-3 text-center text-xs text-gray-500">
                Sin imagen
              </div>
            )}
          </div>
        </div>

        {/* =========================
            INFORMACIÓN
           ========================= */}
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wide text-label/50 italic mb-1">
            {laboratory}
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-label leading-snug">
            {productName}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-surface/70 px-3 py-1.5 text-sm text-label">
              Unitario: <strong>${unitPrice.toLocaleString("es-CO")}</strong>
            </div>
          </div>
        </div>

        {/* =========================
            DERECHA
           ========================= */}
        <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[220px]">
          <div className="text-left lg:text-right">
            <p className="text-xs text-label/60 mb-1">Subtotal</p>
            <p className="text-2xl sm:text-3xl font-bold text-[var(--color-secondary-600)]">
              ${subtotal.toLocaleString("es-CO")}
            </p>
          </div>

          {/* =========================
              CONTROL DE CANTIDAD
             ========================= */}
          <div
            className="
              inline-flex items-center gap-2
              rounded-full border border-border/30
              bg-white px-2 py-1
            "
          >
            {quantity > 1 ? (
              <button
                type="button"
                onClick={onDecrease}
                disabled={isMutatingCart}
                className="
                  inline-flex h-9 w-9 items-center justify-center
                  rounded-full border border-border/20
                  hover:bg-surface transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onRemove}
                disabled={isMutatingCart}
                className="
                  inline-flex h-9 w-9 items-center justify-center
                  rounded-full border border-red-200
                  text-red-600 hover:bg-red-50 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                aria-label="Eliminar producto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <span className="min-w-[2rem] text-center text-base font-semibold text-label">
              {quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              disabled={isMutatingCart}
              className="
                inline-flex h-9 w-9 items-center justify-center
                rounded-full border border-border/20
                hover:bg-surface transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

         
        </div>
      </div>
    </article>
  );
}