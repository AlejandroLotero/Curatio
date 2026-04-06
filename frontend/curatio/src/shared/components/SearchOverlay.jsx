// import { useEffect, useRef } from "react";
// import { Search, PackageSearch, ArrowRight } from "lucide-react";

// /**
//  * SearchOverlay
//  * -------------
//  * Panel superpuesto anclado al buscador.
//  *
//  * Responsabilidades:
//  * - mostrar loading
//  * - mostrar coincidencia exacta
//  * - mostrar resultados
//  * - mostrar sugerencias
//  * - cerrar al hacer click afuera
//  */
// export default function SearchOverlay({
//   isOpen,
//   isLoading,
//   query,
//   results,
//   suggestions,
//   totalMatches,
//   onClose,
//   onSelectResult,
//   onViewAll,
// }) {
//   const containerRef = useRef(null);

//   /**
//    * Cierra el overlay cuando el usuario hace click fuera.
//    */
//   useEffect(() => {
//     if (!isOpen) return;

//     const handleClickOutside = (event) => {
//       if (!containerRef.current) return;

//       if (!containerRef.current.contains(event.target)) {
//         onClose?.();
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         onClose?.();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={containerRef}
//       className="
//         absolute left-0 right-0 top-[calc(100%+8px)] z-[120]
//         rounded-2xl border border-border-strong
//         bg-white/95 backdrop-blur-md shadow-xl
//         overflow-hidden
//       "
//     >
//       {/* =========================
//           HEADER
//          ========================= */}
//       <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border/40">
//         <div className="min-w-0">
//           <p className="text-sm font-semibold text-label">
//             Resultados para "{query}"
//           </p>
//           <p className="text-mostsmall text-gray-500">
//             {totalMatches} coincidencia(s)
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={onViewAll}
//           className="text-sm font-semibold text-label underline underline-offset-4"
//         >
//           Ver todos
//         </button>
//       </div>

//       {/* =========================
//           BODY
//          ========================= */}
//       <div className="max-h-[420px] overflow-y-auto">
//         {isLoading ? (
//           <div className="px-4 py-8 text-center text-sm text-gray-500">
//             Buscando medicamentos...
//           </div>
//         ) : results.length === 0 && suggestions.length === 0 ? (
//           <div className="px-4 py-8 flex flex-col items-center gap-3 text-center">
//             <PackageSearch className="w-8 h-8 text-gray-400" />
//             <div>
//               <p className="text-sm font-semibold text-label">
//                 No encontramos coincidencias
//               </p>
//               <p className="text-mostsmall text-gray-500">
//                 Intenta con otro nombre o revisa la ortografía.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="p-3 space-y-4">
//             {/* =========================
//                 RESULTADOS PRINCIPALES
//                ========================= */}
//             {results.length > 0 && (
//               <div className="space-y-2">
//                 <p className="text-mostsmall font-semibold uppercase tracking-wide text-gray-500 px-1">
//                   Coincidencias
//                 </p>

//                 {results.map((item) => (
//                   <button
//                     key={item.id}
//                     type="button"
//                     onClick={() => onSelectResult?.(item)}
//                     className="
//                       w-full text-left rounded-xl border border-border/30
//                       bg-white hover:bg-surface/50 transition-colors
//                       px-4 py-3
//                     "
//                   >
//                     <div className="flex items-start justify-between gap-4">
//                       <div className="min-w-0">
//                         <p className="text-sm font-semibold text-label">
//                           {item.name}
//                         </p>

//                         <p className="text-mostsmall text-gray-500 mt-1">
//                           {item.laboratory}
//                         </p>

//                         <p className="text-mostsmall text-gray-600 mt-1 line-clamp-1">
//                           {item.presentation}
//                           {item.concentration ? ` · ${item.concentration}` : ""}
//                         </p>
//                       </div>

//                       <div className="shrink-0 text-right">
//                         <p className="text-sm font-bold text-label">
//                           ${Number(item.salePrice).toLocaleString("es-CO")}
//                         </p>
//                         <p className="text-mostsmall text-gray-500">
//                           Stock: {item.stock}
//                         </p>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* =========================
//                 SUGERENCIAS
//                ========================= */}
//             {suggestions.length > 0 && (
//               <div className="space-y-2">
//                 <p className="text-mostsmall font-semibold uppercase tracking-wide text-gray-500 px-1">
//                   Sugerencias
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {suggestions.map((suggestion) => (
//                     <button
//                       key={suggestion.id}
//                       type="button"
//                       onClick={() =>
//                         onSelectResult?.({
//                           id: suggestion.id,
//                           name: suggestion.name,
//                         })
//                       }
//                       className="
//                         inline-flex items-center gap-2 rounded-full
//                         border border-border-strong
//                         bg-white px-3 py-1.5 text-sm text-label
//                         hover:bg-surface transition-colors
//                       "
//                     >
//                       <Search className="w-4 h-4" />
//                       {suggestion.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* =========================
//           FOOTER
//          ========================= */}
//       <div className="border-t border-border/40 px-4 py-3 bg-white/80">
//         <button
//           type="button"
//           onClick={onViewAll}
//           className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-label"
//         >
//           Ver todos los resultados
//           <ArrowRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { Search, PackageSearch, ArrowRight } from "lucide-react";

/**
 * SearchOverlay
 * -------------
 * Panel flotante de resultados del buscador.
 *
 * Mejoras incluidas:
 * - soporte de miniatura real desde backend usando imageUrl
 * - fallback visual cuando el medicamento no tiene imagen
 * - mantiene resultados, sugerencias y botón para ver todos
 */
export default function SearchOverlay({
  isOpen,
  isLoading,
  query,
  results = [],
  suggestions = [],
  totalMatches = 0,
  onClose,
  onSelectResult,
  onViewAll,
}) {
  const containerRef = useRef(null);

  /**
   * Cierra el overlay al hacer click fuera
   * o al presionar Escape.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="
        absolute left-0 right-0 top-[calc(100%+8px)] z-[120]
        rounded-2xl border border-border-strong
        bg-white/95 backdrop-blur-md shadow-xl
        overflow-hidden
      "
    >
      {/* =========================
          HEADER
         ========================= */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-border/40">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-label">
            Resultados para "{query}"
          </p>
          <p className="text-mostsmall text-gray-500">
            {totalMatches} coincidencia(s)
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-sm font-semibold text-label underline underline-offset-4"
        >
          Ver todos
        </button>
      </div>

      {/* =========================
          BODY
         ========================= */}
      <div className="max-h-[420px] overflow-y-auto">
        {isLoading ? (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            Buscando medicamentos...
          </div>
        ) : results.length === 0 && suggestions.length === 0 ? (
          <div className="px-4 py-8 flex flex-col items-center gap-3 text-center">
            <PackageSearch className="w-8 h-8 text-gray-400" />
            <div>
              <p className="text-sm font-semibold text-label">
                No encontramos coincidencias
              </p>
              <p className="text-mostsmall text-gray-500">
                Intenta con otro nombre o revisa la ortografía.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-4">
            {/* =========================
                RESULTADOS PRINCIPALES
               ========================= */}
            {results.length > 0 && (
              <div className="space-y-2">
                <p className="text-mostsmall font-semibold uppercase tracking-wide text-gray-500 px-1">
                  Coincidencias
                </p>

                {results.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectResult?.(item)}
                    className="
                      w-full text-left rounded-xl border border-border/30
                      bg-white hover:bg-surface/50 transition-colors
                      px-4 py-3
                    "
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* =========================
                          BLOQUE IZQUIERDO
                          Miniatura + texto
                         ========================= */}
                      <div className="min-w-0 flex items-start gap-3">
                        <div
                          className="
                            w-16 h-16 shrink-0 rounded-xl overflow-hidden
                            border border-border/30 bg-cyan-50
                            flex items-center justify-center
                          "
                        >
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="text-[10px] text-gray-500 text-center px-1">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-label">
                            {item.name}
                          </p>

                          <p className="text-mostsmall text-gray-500 mt-1">
                            {item.laboratory || "Laboratorio no disponible"}
                          </p>

                          <p className="text-mostsmall text-gray-600 mt-1 line-clamp-1">
                            {item.presentation}
                            {item.concentration ? ` · ${item.concentration}` : ""}
                          </p>
                        </div>
                      </div>

                      {/* =========================
                          BLOQUE DERECHO
                         ========================= */}
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-label">
                          ${Number(item.salePrice || 0).toLocaleString("es-CO")}
                        </p>

                        <p className="text-mostsmall text-gray-500">
                          Stock: {Number(item.stock || 0)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* =========================
                SUGERENCIAS
               ========================= */}
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-mostsmall font-semibold uppercase tracking-wide text-gray-500 px-1">
                  Sugerencias
                </p>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() =>
                        onSelectResult?.({
                          id: suggestion.id,
                          name: suggestion.name,
                        })
                      }
                      className="
                        inline-flex items-center gap-2 rounded-full
                        border border-border-strong
                        bg-white px-3 py-1.5 text-sm text-label
                        hover:bg-surface transition-colors
                      "
                    >
                      <Search className="w-4 h-4" />
                      {suggestion.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* =========================
          FOOTER
         ========================= */}
      <div className="border-t border-border/40 px-4 py-3 bg-white/80">
        <button
          type="button"
          onClick={onViewAll}
          className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-label"
        >
          Ver todos los resultados
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}