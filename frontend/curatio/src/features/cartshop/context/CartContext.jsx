// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { useAuth } from "@/features/auth/context/AuthContext";
// import {
//   addItemToActiveCart,
//   getActiveCart,
//   removeActiveCartItem,
//   updateActiveCartItem,
// } from "@/lib/http/cart";
// import {
//   adaptBackendCartToUi,
//   getCartItemsCount,
//   getCartLinesCount,
// } from "@/lib/adapters/cartAdapter";

// /**
//  * Contexto global del carrito real.
//  */
// const CartContext = createContext(null);

// /**
//  * Provider del carrito.
//  *
//  * Responsabilidades:
//  * - cargar carrito activo desde backend
//  * - exponer contador para navbar
//  * - permitir agregar, actualizar y eliminar líneas
//  * - limpiar estado cuando no hay sesión
//  */
// export const CartProvider = ({ children }) => {
//   const { isAuthenticated, isBootstrapping } = useAuth();

//   // Carrito adaptado para UI
//   const [cart, setCart] = useState(null);

//   // Loading inicial / refresh
//   const [isLoadingCart, setIsLoadingCart] = useState(false);

//   // Loading de mutaciones
//   const [isMutatingCart, setIsMutatingCart] = useState(false);

//   // Error general del módulo carrito
//   const [cartError, setCartError] = useState("");

//   /**
//    * Carga el carrito activo desde backend.
//    */
//   const refreshCart = async () => {
//     // Si no hay sesión, limpia estado local
//     if (!isAuthenticated) {
//       setCart(null);
//       setCartError("");
//       return null;
//     }

//     try {
//       setIsLoadingCart(true);
//       setCartError("");

//       const response = await getActiveCart();
//       const adaptedCart = adaptBackendCartToUi(response?.data?.cart);

//       setCart(adaptedCart);
//       return adaptedCart;
//     } catch (error) {
//       console.error("Error loading active cart:", error);
//       setCart(null);
//       setCartError(
//         error?.error?.message || "Could not load the active cart."
//       );
//       return null;
//     } finally {
//       setIsLoadingCart(false);
//     }
//   };

//   /**
//    * Agrega medicamento al carrito.
//    *
//    * Recibe:
//    * - medicationId: id real del backend
//    * - quantity: cantidad a agregar
//    */
//   const addMedicationToCart = async ({ medicationId, quantity = 1 }) => {
//     try {
//       setIsMutatingCart(true);
//       setCartError("");

//       const response = await addItemToActiveCart({
//         medicationId,
//         quantity,
//       });

//       const adaptedCart = adaptBackendCartToUi(response?.data?.cart);
//       setCart(adaptedCart);

//       return {
//         ok: true,
//         cart: adaptedCart,
//         created: Boolean(response?.data?.created),
//       };
//     } catch (error) {
//       console.error("Error adding medication to cart:", error);

//       const message =
//         error?.error?.message || "Could not add the medication to the cart.";

//       setCartError(message);

//       return {
//         ok: false,
//         error,
//         message,
//       };
//     } finally {
//       setIsMutatingCart(false);
//     }
//   };

//   /**
//    * Actualiza la cantidad de una línea.
//    */
//   const updateCartItemQuantity = async ({ lineId, quantity }) => {
//     try {
//       setIsMutatingCart(true);
//       setCartError("");

//       const response = await updateActiveCartItem(lineId, { quantity });
//       const adaptedCart = adaptBackendCartToUi(response?.data?.cart);

//       setCart(adaptedCart);

//       return {
//         ok: true,
//         cart: adaptedCart,
//       };
//     } catch (error) {
//       console.error("Error updating cart item:", error);

//       const message =
//         error?.error?.message || "Could not update cart item quantity.";

//       setCartError(message);

//       return {
//         ok: false,
//         error,
//         message,
//       };
//     } finally {
//       setIsMutatingCart(false);
//     }
//   };

//   /**
//    * Elimina una línea del carrito.
//    */
//   const removeCartItem = async (lineId) => {
//     try {
//       setIsMutatingCart(true);
//       setCartError("");

//       const response = await removeActiveCartItem(lineId);
//       const adaptedCart = adaptBackendCartToUi(response?.data?.cart);

//       setCart(adaptedCart);

//       return {
//         ok: true,
//         cart: adaptedCart,
//       };
//     } catch (error) {
//       console.error("Error removing cart item:", error);

//       const message =
//         error?.error?.message || "Could not remove cart item.";

//       setCartError(message);

//       return {
//         ok: false,
//         error,
//         message,
//       };
//     } finally {
//       setIsMutatingCart(false);
//     }
//   };

//   /**
//    * Limpia errores del carrito.
//    */
//   const clearCartError = () => {
//     setCartError("");
//   };

//   /**
//    * Bootstrap del carrito cuando cambia autenticación.
//    */
//   useEffect(() => {
//     // Espera a que termine bootstrap de sesión
//     if (isBootstrapping) return;

//     if (!isAuthenticated) {
//       setCart(null);
//       setCartError("");
//       return;
//     }

//     refreshCart();
//   }, [isAuthenticated, isBootstrapping]);

//   /**
//    * Derivados del carrito para UI.
//    */
//   const cartItems = cart?.items ?? [];
//   const cartCount = getCartItemsCount(cart);
//   const cartLinesCount = getCartLinesCount(cart);

//   const value = useMemo(
//     () => ({
//       cart,
//       cartItems,
//       cartCount,
//       cartLinesCount,
//       isLoadingCart,
//       isMutatingCart,
//       cartError,
//       refreshCart,
//       addMedicationToCart,
//       updateCartItemQuantity,
//       removeCartItem,
//       clearCartError,
//     }),
//     [
//       cart,
//       cartItems,
//       cartCount,
//       cartLinesCount,
//       isLoadingCart,
//       isMutatingCart,
//       cartError,
//     ]
//   );

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// /**
//  * Hook de consumo del carrito.
//  */
// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used inside CartProvider");
//   }

//   return context;
// };

//////////v2 

// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { products as catalogProducts } from "@/data/product/products";
// import { listProducts } from "@/data/product/listProducts";

// /**
//  * Contexto global del carrito.
//  *
//  * Objetivo:
//  * - Permitir carrito público sin autenticación
//  * - Persistir en localStorage
//  * - Mostrar contador real en Navbar
//  * - Reutilizarse tanto en NewHomePage como en ProductShowPage
//  */
// const CartContext = createContext(null);

// /**
//  * Key de almacenamiento local.
//  */
// const CART_STORAGE_KEY = "curatio_public_cart";

// /**
//  * Lee carrito guardado del navegador.
//  */
// function readStoredCart() {
//   try {
//     const raw = localStorage.getItem(CART_STORAGE_KEY);
//     if (!raw) return [];
//     return JSON.parse(raw);
//   } catch (error) {
//     console.error("Error reading cart from storage:", error);
//     return [];
//   }
// }

// /**
//  * Guarda carrito en localStorage.
//  */
// function writeStoredCart(cartItems) {
//   try {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
//   } catch (error) {
//     console.error("Error writing cart to storage:", error);
//   }
// }

// /**
//  * Busca información visual y administrativa del producto
//  * para construir un item consistente dentro del carrito.
//  */
// function buildCartProduct(productId) {
//   const visualProduct = catalogProducts.find(
//     (item) => String(item.id) === String(productId)
//   );

//   const inventoryProduct = listProducts.find(
//     (item) => String(item.id) === String(productId)
//   );

//   if (!visualProduct && !inventoryProduct) return null;

//   return {
//     id: inventoryProduct?.id ?? visualProduct?.id,
//     title:
//       visualProduct?.title ??
//       inventoryProduct?.nameproduct ??
//       "Producto",
//     image: visualProduct?.image ?? null,
//     description:
//       visualProduct?.description ??
//       inventoryProduct?.descripcion ??
//       "",
//     laboratory: inventoryProduct?.laboratory ?? "",
//     stock: inventoryProduct?.stock ?? 0,
//     price:
//       inventoryProduct?.precioVenta ??
//       visualProduct?.price ??
//       0,
//     presentation: inventoryProduct?.presentacion ?? "",
//     concentration: inventoryProduct?.concentration ?? "",
//   };
// }

// /**
//  * Provider principal del carrito.
//  */
// export function CartProvider({ children }) {
//   /**
//    * Estado base del carrito.
//    * Se inicializa desde localStorage.
//    */
//   const [cartItems, setCartItems] = useState(() => readStoredCart());

//   /**
//    * Persistencia automática.
//    */
//   useEffect(() => {
//     writeStoredCart(cartItems);
//   }, [cartItems]);

//   /**
//    * Agrega producto al carrito.
//    * Si ya existe, suma cantidad.
//    */
//   const addToCartItem = async ({ productId, quantity = 1 }) => {
//     const product = buildCartProduct(productId);

//     if (!product) {
//       throw new Error("Product not found.");
//     }

//     if (quantity <= 0) {
//       throw new Error("Quantity must be greater than zero.");
//     }

//     setCartItems((prev) => {
//       const existingItem = prev.find(
//         (item) => String(item.productId) === String(productId)
//       );

//       if (existingItem) {
//         return prev.map((item) =>
//           String(item.productId) === String(productId)
//             ? {
//                 ...item,
//                 quantity: item.quantity + quantity,
//                 subtotal: (item.quantity + quantity) * Number(item.unitPrice),
//               }
//             : item
//         );
//       }

//       return [
//         ...prev,
//         {
//           /**
//            * Identificador interno del item del carrito.
//            * Mientras es carrito público, se genera localmente.
//            */
//           id: `cart-item-${productId}-${Date.now()}`,
//           productId: product.id,
//           title: product.title,
//           image: product.image,
//           description: product.description,
//           laboratory: product.laboratory,
//           presentation: product.presentation,
//           concentration: product.concentration,
//           stock: product.stock,
//           quantity,
//           unitPrice: Number(product.price),
//           subtotal: Number(product.price) * quantity,
//           state: "Activo",
//         },
//       ];
//     });
//   };

//   /**
//    * Actualiza cantidad de un item.
//    * Si llega a 0 o menos, elimina.
//    */
//   const updateCartItemQuantity = (productId, quantity) => {
//     if (quantity <= 0) {
//       removeCartItem(productId);
//       return;
//     }

//     setCartItems((prev) =>
//       prev.map((item) =>
//         String(item.productId) === String(productId)
//           ? {
//               ...item,
//               quantity,
//               subtotal: quantity * Number(item.unitPrice),
//             }
//           : item
//       )
//     );
//   };

//   /**
//    * Elimina un item del carrito.
//    */
//   const removeCartItem = (productId) => {
//     setCartItems((prev) =>
//       prev.filter((item) => String(item.productId) !== String(productId))
//     );
//   };

//   /**
//    * Limpia carrito completo.
//    */
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   /**
//    * Contador total de unidades.
//    * Esto alimenta el badge rojo del navbar.
//    */
//   const cartCount = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
//   }, [cartItems]);

//   /**
//    * Total monetario del carrito.
//    */
//   const cartTotal = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + Number(item.subtotal), 0);
//   }, [cartItems]);

//   const value = useMemo(
//     () => ({
//       cartItems,
//       cartCount,
//       cartTotal,
//       addToCartItem,
//       updateCartItemQuantity,
//       removeCartItem,
//       clearCart,
//     }),
//     [cartItems, cartCount, cartTotal]
//   );

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// /**
//  * Hook de consumo.
//  */
// export function useCart() {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used inside CartProvider");
//   }

//   return context;
// }

import { createContext, useContext, useMemo, useState } from "react";

/**
 * CartContext
 * -----------
 * Contexto central del carrito actual / operativo.
 *
 * Responsabilidades:
 * - mantener items activos del carrito
 * - exponer contador
 * - exponer subtotal
 * - permitir agregar, quitar y vaciar
 * - exponer bandera de mutación para bloquear botones mientras se procesa
 *
 * Nota:
 * - esta implementación funciona en memoria
 * - si luego conectas backend, solo reemplazas la lógica interna
 *   de addToCartItem, removeCartItem y clearActiveCart
 */
const CartContext = createContext(null);

/**
 * Provider del carrito.
 */
export function CartProvider({ children }) {
  /**
   * Estado principal del carrito actual.
   * Cada item debe tener una estructura como:
   * {
   *   id,
   *   productId,
   *   productName,
   *   quantity,
   *   unitPrice,
   *   subtotal
   * }
   */
  const [cartItems, setCartItems] = useState([]);

  /**
   * Bandera para bloquear UI mientras se modifica el carrito.
   */
  const [isMutatingCart, setIsMutatingCart] = useState(false);

  /**
   * =========================
   * AGREGAR AL CARRITO
   * =========================
   * Si el producto ya existe en el carrito:
   * - suma cantidades
   * - recalcula subtotal
   *
   * Si no existe:
   * - crea un nuevo item
   */
  const addToCartItem = async ({
    productId,
    productName,
    quantity,
    unitPrice,
  }) => {
    try {
      setIsMutatingCart(true);

      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.productId === productId
        );

        if (existingItem) {
          return prevItems.map((item) => {
            if (item.productId !== productId) return item;

            const nextQuantity = item.quantity + quantity;

            return {
              ...item,
              quantity: nextQuantity,
              subtotal: nextQuantity * Number(item.unitPrice || 0),
            };
          });
        }

        return [
          ...prevItems,
          {
            id: `${productId}-${Date.now()}`,
            productId,
            productName,
            quantity,
            unitPrice: Number(unitPrice || 0),
            subtotal: Number(unitPrice || 0) * quantity,
          },
        ];
      });
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * =========================
   * QUITAR ITEM DEL CARRITO
   * =========================
   * Elimina un item puntual por su id interno.
   *
   * Este método es el que usa el botón "Quitar"
   * de ViewCartShopPage.
   */
  const removeCartItem = async (itemId) => {
    try {
      setIsMutatingCart(true);

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * =========================
   * VACIAR CARRITO
   * =========================
   * Elimina todos los items del carrito actual.
   *
   * Este método es el que usa el botón "Vaciar carrito".
   */
  const clearActiveCart = async () => {
    try {
      setIsMutatingCart(true);

      setCartItems([]);
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * =========================
   * HIDRATAR CARRITO
   * =========================
   * Por ahora no hace nada porque estamos en memoria.
   * Lo dejamos para no romper las pantallas que ya lo consumen.
   */
  const hydrateCart = async () => {
    return;
  };

  /**
   * =========================
   * CONTADOR DEL CARRITO
   * =========================
   * Suma cantidades reales, no solamente número de líneas.
   *
   * Ejemplo:
   * - si hay 1 producto con cantidad 4
   *   el badge debe mostrar 4
   */
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  }, [cartItems]);

  /**
   * =========================
   * SUBTOTAL DEL CARRITO
   * =========================
   * Suma subtotales reales.
   */
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + Number(item.subtotal || 0),
      0
    );
  }, [cartItems]);

  /**
   * Valor expuesto por el contexto.
   */
  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    isMutatingCart,
    hydrateCart,
    addToCartItem,
    removeCartItem,
    clearActiveCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook de consumo del carrito.
 */
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}