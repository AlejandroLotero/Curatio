// import { useEffect, useMemo, useRef, useState } from "react";
// import { Search, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import SearchOverlay from "@/shared/components/SearchOverlay";
// import { searchPublicMedications } from "@/lib/http/publicMedications";
// import { adaptPublicMedicationSearchResponse } from "@/lib/adapters/publicMedicationAdapter";

// /**
//  * MedicationSearchBar
//  * -------------------
//  * Buscador reutilizable para:
//  * - navbar público
//  * - navbar admin/farmaceuta
//  *
//  * Flujo:
//  * - debounce de escritura
//  * - consulta real al backend
//  * - muestra overlay de sugerencias/resultados
//  */
// export default function MedicationSearchBar({
//   source = "dashboard",
//   placeholder = "Buscar medicamentos...",
//   className = "",
//   inputClassName = "",
// }) {
//   const navigate = useNavigate();

//   /**
//    * Texto actual del input.
//    */
//   const [query, setQuery] = useState("");

//   /**
//    * Estado de carga de búsqueda.
//    */
//   const [isLoading, setIsLoading] = useState(false);

//   /**
//    * Control del overlay.
//    */
//   const [isOverlayOpen, setIsOverlayOpen] = useState(false);

//   /**
//    * Datos de resultados adaptados.
//    */
//   const [searchData, setSearchData] = useState({
//     exactMatch: null,
//     topResults: [],
//     suggestions: [],
//     totalMatches: 0,
//   });

//   /**
//    * Ref local del input para futuros ajustes.
//    */
//   const inputRef = useRef(null);

//   /**
//    * Resultados combinados:
//    * - exact match arriba si existe
//    * - luego otros resultados sin duplicarlo
//    */
//   const mergedResults = useMemo(() => {
//     const exact = searchData.exactMatch;
//     const others = searchData.topResults.filter(
//       (item) => item.id !== exact?.id
//     );

//     return exact ? [exact, ...others] : others;
//   }, [searchData]);

//   /**
//    * Ejecuta búsqueda real con debounce.
//    */
//   useEffect(() => {
//     const normalizedQuery = query.trim();

//     if (normalizedQuery.length < 2) {
//       setSearchData({
//         exactMatch: null,
//         topResults: [],
//         suggestions: [],
//         totalMatches: 0,
//       });
//       setIsOverlayOpen(false);
//       return;
//     }

//     const timeoutId = setTimeout(async () => {
//       try {
//         setIsLoading(true);

//         const response = await searchPublicMedications({
//           query: normalizedQuery,
//         });

//         const adapted = adaptPublicMedicationSearchResponse(response);

//         setSearchData(adapted);
//         setIsOverlayOpen(true);
//       } catch (error) {
//         console.error("Medication search failed:", error);

//         setSearchData({
//           exactMatch: null,
//           topResults: [],
//           suggestions: [],
//           totalMatches: 0,
//         });
//         setIsOverlayOpen(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 350);

//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   /**
//    * Navega al detalle del medicamento seleccionado.
//    */
//   const handleSelectResult = (item) => {
//     if (!item?.id) return;

//     setIsOverlayOpen(false);

//     navigate(`/products/detalle/${item.id}?source=${source}`);
//   };

//   /**
//    * Navega a una futura página de resultados completos.
//    * Por ahora la redirigimos al mismo catálogo/detalle si se quiere extender luego.
//    */
//   const handleViewAll = () => {
//     if (!query.trim()) return;

//     setIsOverlayOpen(false);

//     navigate(`/products/busqueda?query=${encodeURIComponent(query.trim())}&source=${source}`);
//   };

//   /**
//    * Limpia el input completo.
//    */
//   const handleClear = () => {
//     setQuery("");
//     setIsOverlayOpen(false);
//     setSearchData({
//       exactMatch: null,
//       topResults: [],
//       suggestions: [],
//       totalMatches: 0,
//     });

//     inputRef.current?.focus();
//   };

//   return (
//     <div className={`relative w-full ${className}`}>
//       {/* =========================
//           INPUT
//          ========================= */}
//       <div className="relative text-black font-body">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           placeholder={placeholder}
//           onChange={(event) => setQuery(event.target.value)}
//           onFocus={() => {
//             if (query.trim().length >= 2) {
//               setIsOverlayOpen(true);
//             }
//           }}
//           className={`
//             w-full pl-9 pr-10 py-2.5 border rounded-lg
//             text-body placeholder:text-placeholder
//             focus:outline-none focus:ring-1 focus:ring-black
//             border-border-strong
//             ${inputClassName}
//           `}
//         />

//         {query && (
//           <button
//             type="button"
//             onClick={handleClear}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-label"
//             aria-label="Limpiar búsqueda"
//           >
//             <X className="size-4" />
//           </button>
//         )}
//       </div>

//       {/* =========================
//           OVERLAY
//          ========================= */}
//       <SearchOverlay
//         isOpen={isOverlayOpen}
//         isLoading={isLoading}
//         query={query.trim()}
//         results={mergedResults}
//         suggestions={searchData.suggestions}
//         totalMatches={searchData.totalMatches}
//         onClose={() => setIsOverlayOpen(false)}
//         onSelectResult={handleSelectResult}
//         onViewAll={handleViewAll}
//       />
//     </div>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import SearchOverlay from "@/shared/components/SearchOverlay";
import { searchPublicMedications } from "@/lib/http/publicMedications";
import { adaptPublicMedicationSearchResponse } from "@/lib/adapters/publicMedicationAdapter";

/**
 * MedicationSearchBar
 * -------------------
 * Buscador profesional reutilizable para navbar público y administrativo.
 *
 * Responsabilidades:
 * - capturar el texto del usuario
 * - consultar backend real con debounce
 * - mostrar overlay con coincidencias y sugerencias
 * - navegar al detalle comercial del medicamento
 *
 * Importante:
 * - la prop "source" define desde dónde se abrió la búsqueda
 * - esto permite que el detalle sepa si viene del dashboard público
 *   o del backoffice administrativo
 */
export default function MedicationSearchBar({
  source = "dashboard",
  className = "",
  inputClassName = "",
  placeholder = "Buscar medicamentos...",
}) {
  const navigate = useNavigate();

  /**
   * Texto digitado por el usuario.
   */
  const [query, setQuery] = useState("");

  /**
   * Estado de carga mientras el backend responde.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Control visual del panel flotante de resultados.
   */
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  /**
   * Estado normalizado de búsqueda.
   */
  const [searchState, setSearchState] = useState({
    exactMatch: null,
    topResults: [],
    suggestions: [],
    totalMatches: 0,
  });

  /**
   * Referencia para manejar debounce y evitar demasiadas consultas.
   */
  const debounceRef = useRef(null);

  /**
   * Source final que enviaremos en la navegación.
   *
   * Regla:
   * - si viene explícito por props, se respeta
   * - si no, cae por defecto en "dashboard"
   */
  const detailSource = useMemo(() => {
    return source || "dashboard";
  }, [source]);

  /**
   * Limpia resultados cuando la búsqueda queda vacía.
   */
  const resetResults = () => {
    setSearchState({
      exactMatch: null,
      topResults: [],
      suggestions: [],
      totalMatches: 0,
    });
  };

  /**
   * Ejecuta búsqueda real contra backend.
   */
  const runSearch = async (nextQuery) => {
    const normalizedQuery = (nextQuery || "").trim();

    /**
     * Si no hay texto, cerramos resultados.
     */
    if (!normalizedQuery) {
      resetResults();
      setIsOverlayOpen(false);
      return;
    }

    try {
      setIsLoading(true);

      /**
       * Consulta real al backend público/comercial.
       */
      const response = await searchPublicMedications({
        query: normalizedQuery,
      });

      /**
       * Adaptamos la respuesta para que el overlay no dependa
       * del contrato crudo del backend.
       */
      const adapted = adaptPublicMedicationSearchResponse(response?.data);

      setSearchState(adapted);
      setIsOverlayOpen(true);
    } catch (error) {
      console.error("Error searching medications:", error);

      /**
       * Si falla, dejamos el overlay abierto pero vacío.
       */
      resetResults();
      setIsOverlayOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja cambios del input con debounce.
   */
  const handleChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);

    /**
     * Cancelamos el debounce anterior si existe.
     */
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    /**
     * Espera corta para evitar llamar backend en cada tecla.
     */
    debounceRef.current = setTimeout(() => {
      runSearch(nextValue);
    }, 300);
  };

  /**
   * Si el usuario vuelve a enfocar el input y ya tenía texto,
   * reabrimos el overlay.
   */
  const handleFocus = () => {
    if (query.trim()) {
      setIsOverlayOpen(true);
    }
  };

  /**
   * Acción del botón "Ver todos".
   *
   * Comportamiento actual:
   * - si hay coincidencia exacta, navega a ese detalle
   * - si no, navega al primer resultado
   *
   * Más adelante se puede cambiar por una ruta tipo:
   * /products/busqueda?query=...
   */
  const handleViewAll = () => {
    if (searchState.exactMatch?.id) {
      navigate(
        `/products/detalle/${searchState.exactMatch.id}?source=${detailSource}`
      );
      setIsOverlayOpen(false);
      return;
    }

    if (searchState.topResults?.length > 0) {
      navigate(
        `/products/detalle/${searchState.topResults[0].id}?source=${detailSource}`
      );
      setIsOverlayOpen(false);
    }
  };

  /**
   * Navega al detalle cuando el usuario elige un resultado o sugerencia.
   */
  const handleSelectResult = (item) => {
    if (!item?.id) return;

    setIsOverlayOpen(false);
    navigate(`/products/detalle/${item.id}?source=${detailSource}`);
  };

  /**
   * Permite buscar con Enter.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    handleViewAll();
  };

  /**
   * Limpieza del debounce al desmontar el componente.
   */
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  /**
   * Construye la lista que mostrará el overlay.
   *
   * Regla:
   * - si hay exactMatch, aparece primero
   * - luego se agregan topResults sin duplicar ids
   */
  const overlayResults = useMemo(() => {
    const items = [];

    if (searchState.exactMatch) {
      items.push(searchState.exactMatch);
    }

    searchState.topResults.forEach((item) => {
      const alreadyExists = items.some(
        (existingItem) => String(existingItem.id) === String(item.id)
      );

      if (!alreadyExists) {
        items.push(item);
      }
    });

    return items;
  }, [searchState]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* =========================
          FORMULARIO DE BÚSQUEDA
         ========================= */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`
            w-full pl-9 pr-4 py-2.5 border rounded-lg
            text-body placeholder:text-placeholder
            focus:outline-none focus:ring-1 focus:ring-black
            border-border-strong
            ${inputClassName}
          `}
        />
      </form>

      {/* =========================
          OVERLAY DE RESULTADOS
         ========================= */}
      <SearchOverlay
        isOpen={isOverlayOpen}
        isLoading={isLoading}
        query={query}
        results={overlayResults}
        suggestions={searchState.suggestions}
        totalMatches={searchState.totalMatches}
        onClose={() => setIsOverlayOpen(false)}
        onSelectResult={handleSelectResult}
        onViewAll={handleViewAll}
      />
    </div>
  );
}