// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Button } from "@/shared/components";
// import { searchCatalogMedications } from "@/lib/http/medications";

// export default function MedicationSearchResultsPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   /**
//    * Query buscado desde navbar.
//    */
//   const query = searchParams.get("query") || "";

//   /**
//    * Resultados exactos/parciales.
//    */
//   const [results, setResults] = useState([]);

//   /**
//    * Sugerencias por similitud.
//    */
//   const [suggestions, setSuggestions] = useState([]);

//   /**
//    * Estado de carga.
//    */
//   const [loading, setLoading] = useState(true);

//   /**
//    * Error general.
//    */
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let isMounted = true;

//     const runSearch = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await searchCatalogMedications({ query });

//         if (!isMounted) return;

//         setResults(response?.data?.results ?? []);
//         setSuggestions(response?.data?.suggestions ?? []);
//       } catch (err) {
//         if (!isMounted) return;

//         setError(err?.error?.message || "No se pudo realizar la búsqueda.");
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     if (query.trim()) {
//       runSearch();
//     } else {
//       setLoading(false);
//       setResults([]);
//       setSuggestions([]);
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [query]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-label">
//         Buscando medicamentos...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen text-label">
//       <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6">
//         <h1 className="text-2xl font-bold mb-4">
//           Resultados de búsqueda
//         </h1>

//         <p className="mb-6 text-sm">
//           Búsqueda: <span className="font-semibold">{query}</span>
//         </p>

//         {error ? (
//           <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         ) : null}

//         {!error && results.length === 0 && suggestions.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="mb-4">No se encontraron medicamentos.</p>
//             <Button
//               variant="primary"
//               size="sm"
//               type="button"
//               onClick={() => navigate("/")}
//             >
//               Volver
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {results.length > 0 && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-3">Coincidencias</h2>

//                 <div className="space-y-3">
//                   {results.map((item) => (
//                     <button
//                       key={item.id}
//                       type="button"
//                       onClick={() => navigate(`/products/detalle/${item.id}?source=dashboard`)}
//                       className="w-full text-left rounded-2xl border border-border-strong bg-white/40 p-4 hover:bg-white/60 transition"
//                     >
//                       <p className="font-semibold">{item.name}</p>
//                       <p className="text-sm">Laboratorio: {item.laboratory?.name ?? "N/A"}</p>
//                       <p className="text-sm">Concentración: {item.concentration ?? "N/A"}</p>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {suggestions.length > 0 && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-3">Sugerencias</h2>

//                 <div className="space-y-3">
//                   {suggestions.map((item) => (
//                     <button
//                       key={item.id}
//                       type="button"
//                       onClick={() => navigate(`/products/detalle/${item.id}?source=dashboard`)}
//                       className="w-full text-left rounded-2xl border border-border-strong bg-white/40 p-4 hover:bg-white/60 transition"
//                     >
//                       <p className="font-semibold">{item.name}</p>
//                       <p className="text-sm">Laboratorio: {item.laboratory?.name ?? "N/A"}</p>
//                       <p className="text-sm">Concentración: {item.concentration ?? "N/A"}</p>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card } from "@/shared/components";
import { SearchX } from "lucide-react";
import { searchPublicMedications } from "@/lib/http/publicMedications";
import { adaptPublicMedicationSearchResponse } from "@/lib/adapters/publicMedicationAdapter";

/**
 * MedicationSearchResultsPage
 * ---------------------------
 * Página de resultados completos para búsquedas realizadas
 * desde el navbar público o administrativo.
 *
 * Responsabilidades:
 * - leer query desde la URL
 * - consultar backend real
 * - mostrar coincidencias
 * - mostrar sugerencias si no hay coincidencia exacta
 * - permitir ir al detalle del medicamento
 */
export default function MedicationSearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  /**
   * Texto buscado en query string.
   * Ejemplo:
   * /products/busqueda?query=paracetamol&source=dashboard
   */
  const query = (searchParams.get("query") || "").trim();
  const source = searchParams.get("source") || "dashboard";

  /**
   * Estado de carga y errores.
   */
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Estado de resultados adaptados.
   */
  const [searchData, setSearchData] = useState({
    exactMatch: null,
    topResults: [],
    suggestions: [],
    totalMatches: 0,
  });

  /**
   * Hace la búsqueda real al montar la página o cuando cambia query.
   */
  useEffect(() => {
    const runSearch = async () => {
      if (!query) {
        setSearchData({
          exactMatch: null,
          topResults: [],
          suggestions: [],
          totalMatches: 0,
        });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await searchPublicMedications({ query });
        const adapted = adaptPublicMedicationSearchResponse(response);

        setSearchData(adapted);
      } catch (error) {
        console.error("Error searching medications:", error);
        setErrorMessage("No se pudo completar la búsqueda en este momento.");
      } finally {
        setIsLoading(false);
      }
    };

    runSearch();
  }, [query]);

  /**
   * Mezcla coincidencia exacta + resultados restantes
   * sin duplicados.
   */
  const mergedResults = useMemo(() => {
    const exact = searchData.exactMatch;
    const rest = searchData.topResults.filter(
      (item) => item.id !== exact?.id
    );

    return exact ? [exact, ...rest] : rest;
  }, [searchData]);

  /**
   * Navega al detalle comercial del producto.
   */
  const handleOpenDetail = (medicationId) => {
    navigate(`/products/detalle/${medicationId}?source=${source}`);
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-10 text-label">
      <div className="max-w-6xl mx-auto">
        {/* =========================
            HEADER
           ========================= */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Resultados de búsqueda
          </h1>

          <p className="text-sm text-label/80">
            Resultado para: <span className="font-semibold">"{query}"</span>
          </p>
        </div>

        {/* =========================
            LOADING
           ========================= */}
        {isLoading && (
          <div className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-8 text-center">
            <p className="text-lg font-medium">Buscando medicamentos...</p>
          </div>
        )}

        {/* =========================
            ERROR
           ========================= */}
        {!isLoading && errorMessage && (
          <div className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-8 text-center">
            <p className="text-red-600 font-medium">{errorMessage}</p>
          </div>
        )}

        {/* =========================
            SIN RESULTADOS
           ========================= */}
        {!isLoading &&
          !errorMessage &&
          mergedResults.length === 0 &&
          searchData.suggestions.length === 0 && (
            <div className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <SearchX className="w-10 h-10 text-label/60" />
                <div>
                  <p className="text-lg font-semibold">
                    No encontramos coincidencias
                  </p>
                  <p className="text-sm text-label/70 mt-1">
                    Intenta con otro nombre o revisa la ortografía.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Volver al inicio
                </Button>
              </div>
            </div>
          )}

        {/* =========================
            RESULTADOS
           ========================= */}
        {!isLoading && !errorMessage && mergedResults.length > 0 && (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-semibold mb-4">
                Coincidencias encontradas: {searchData.totalMatches}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
                {mergedResults.map((item) => (
                  <div
                    key={item.id}
                    className="w-60 space-y-4"
                  >
                    {/* 
                      Reutilizamos Card para mantener el lenguaje visual.
                      Como esta página viene de backend, armamos el objeto
                      con la estructura mínima que Card ya espera.
                    */}
                    <Card
                      product={{
                        id: item.id,
                        title: item.name,
                        image: null,
                        price: item.salePrice,
                        description:
                          item.description ||
                          `${item.presentation} ${item.concentration}`.trim(),
                      }}
                      onClick={() => handleOpenDetail(item.id)}
                    />

                    <Button
                      variant="primary"
                      size="sm"
                      type="button"
                      className="w-full"
                      onClick={() => handleOpenDetail(item.id)}
                    >
                      Ver detalle
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* =========================
                SUGERENCIAS
               ========================= */}
            {searchData.suggestions.length > 0 && (
              <div className="rounded-3xl bg-white/60 backdrop-blur-md shadow-xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  Quizás quisiste decir
                </h2>

                <div className="flex flex-wrap gap-3">
                  {searchData.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion.id}
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => handleOpenDetail(suggestion.id)}
                    >
                      {suggestion.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}