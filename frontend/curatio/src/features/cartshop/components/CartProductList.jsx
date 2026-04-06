// import CartProductCard from "./CardProductCard";

// /**
//  * CartProductList
//  * ---------------
//  * Lista scrollable de productos del carrito.
//  *
//  * Solo esta sección se desplaza si hay muchos productos.
//  */
// export default function CartProductList({
//   items,
//   isMutatingCart,
//   onRemoveItem,
// }) {
//   return (
//     <section
//       className="
//         bg-white/70 backdrop-blur-md rounded-3xl shadow-xl
//         p-4 sm:p-5
//       "
//     >
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-lg sm:text-xl font-bold text-label">
//           Productos agregados
//         </h2>

//         <span className="text-sm text-label/70">
//           {items.length} registro(s)
//         </span>
//       </div>

//       <div className="max-h-[70vh] overflow-y-auto pr-1 space-y-4">
//         {items.map((item) => (
//           <CartProductCard
//             key={item.id}
//             item={item}
//             isMutatingCart={isMutatingCart}
//             onRemove={() => onRemoveItem(item.id)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

//V2
// import CartProductCard from "./CardProductCard";

// /**
//  * CartProductList
//  * ---------------
//  * Lista visual scrollable del carrito.
//  *
//  * Regla visual:
//  * - solo esta sección hace scroll
//  * - el resumen derecho queda quieto
//  */
// export default function CartProductList({
//   items,
//   isMutatingCart,
//   onRemoveItem,
// }) {
//   return (
//     <section
//       className="
//         rounded-3xl bg-white/70 backdrop-blur-md shadow-xl
//         p-4 sm:p-5
//       "
//     >
//       <div className="mb-4 flex items-center justify-between gap-3">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-label">
//             Productos agregados
//           </h2>
//           <p className="text-sm text-label/70 mt-1">
//             Revisa las unidades y el valor de cada medicamento.
//           </p>
//         </div>

//         <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-label border border-border/30">
//           {items.length} registro(s)
//         </div>
//       </div>

//       <div className="max-h-[72vh] overflow-y-auto pr-1 space-y-4">
//         {items.map((item) => (
//           <CartProductCard
//             key={item.id}
//             item={item}
//             isMutatingCart={isMutatingCart}
//             onRemove={() => onRemoveItem(item.id)}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

import CartProductCard from "./CardProductCard";

/**
 * CartProductList
 * ---------------
 * Lista scrollable de productos del carrito.
 */
export default function CartProductList({
  items,
  isMutatingCart,
  onRemoveItem,
  onIncreaseItem,
  onDecreaseItem,
}) {
  return (
    <section
      className="
        rounded-3xl bg-white/70 backdrop-blur-md shadow-xl
        p-4 sm:p-5
      "
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-label">
            Productos agregados
          </h2>
          <p className="text-sm text-label/70 mt-1">
            Revisa las unidades y el valor de cada medicamento.
          </p>
        </div>

        <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-label border border-border/30">
          {items.length} registro(s)
        </div>
      </div>

      <div className="max-h-[72vh] overflow-y-auto pr-1 space-y-4">
        {items.map((item) => (
          <CartProductCard
            key={item.id}
            item={item}
            isMutatingCart={isMutatingCart}
            onRemove={() => onRemoveItem(item.id)}
            onIncrease={() => onIncreaseItem(item.id)}
            onDecrease={() => onDecreaseItem(item.id)}
          />
        ))}
      </div>
    </section>
  );
}