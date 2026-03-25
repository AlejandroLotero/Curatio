// import { createContext, useContext, useState } from "react";
// // Importamos tu array desde la ruta exacta que me diste
// import { cartshops as initialData } from "@/data/cartshop/cartshops";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   // Usamos tu array de src/data/... como estado inicial
//   const [cartItems, setCartItems] = useState(initialData);

//   // Función para agregar un producto manteniendo tu estructura
//   const addToCart = (newProduct) => {
//     setCartItems((prev) => [...prev, newProduct]);
//   };

//   // El número que irá en el círculo rojo
//   const cartCount = cartItems.length;

//   return (
//     <CartContext.Provider value={{ cartItems, cartCount, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  addItemToActiveCart,
  getActiveCart,
  removeActiveCartItem,
  updateActiveCartItem,
} from "@/lib/http/cart";
import {
  adaptBackendCartToUi,
  getCartItemsCount,
  getCartLinesCount,
} from "@/lib/adapters/cartAdapter";

/**
 * Contexto global del carrito real.
 */
const CartContext = createContext(null);

/**
 * Provider del carrito.
 *
 * Responsabilidades:
 * - cargar carrito activo desde backend
 * - exponer contador para navbar
 * - permitir agregar, actualizar y eliminar líneas
 * - limpiar estado cuando no hay sesión
 */
export const CartProvider = ({ children }) => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  // Carrito adaptado para UI
  const [cart, setCart] = useState(null);

  // Loading inicial / refresh
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // Loading de mutaciones
  const [isMutatingCart, setIsMutatingCart] = useState(false);

  // Error general del módulo carrito
  const [cartError, setCartError] = useState("");

  /**
   * Carga el carrito activo desde backend.
   */
  const refreshCart = async () => {
    // Si no hay sesión, limpia estado local
    if (!isAuthenticated) {
      setCart(null);
      setCartError("");
      return null;
    }

    try {
      setIsLoadingCart(true);
      setCartError("");

      const response = await getActiveCart();
      const adaptedCart = adaptBackendCartToUi(response?.data?.cart);

      setCart(adaptedCart);
      return adaptedCart;
    } catch (error) {
      console.error("Error loading active cart:", error);
      setCart(null);
      setCartError(
        error?.error?.message || "Could not load the active cart."
      );
      return null;
    } finally {
      setIsLoadingCart(false);
    }
  };

  /**
   * Agrega medicamento al carrito.
   *
   * Recibe:
   * - medicationId: id real del backend
   * - quantity: cantidad a agregar
   */
  const addMedicationToCart = async ({ medicationId, quantity = 1 }) => {
    try {
      setIsMutatingCart(true);
      setCartError("");

      const response = await addItemToActiveCart({
        medicationId,
        quantity,
      });

      const adaptedCart = adaptBackendCartToUi(response?.data?.cart);
      setCart(adaptedCart);

      return {
        ok: true,
        cart: adaptedCart,
        created: Boolean(response?.data?.created),
      };
    } catch (error) {
      console.error("Error adding medication to cart:", error);

      const message =
        error?.error?.message || "Could not add the medication to the cart.";

      setCartError(message);

      return {
        ok: false,
        error,
        message,
      };
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * Actualiza la cantidad de una línea.
   */
  const updateCartItemQuantity = async ({ lineId, quantity }) => {
    try {
      setIsMutatingCart(true);
      setCartError("");

      const response = await updateActiveCartItem(lineId, { quantity });
      const adaptedCart = adaptBackendCartToUi(response?.data?.cart);

      setCart(adaptedCart);

      return {
        ok: true,
        cart: adaptedCart,
      };
    } catch (error) {
      console.error("Error updating cart item:", error);

      const message =
        error?.error?.message || "Could not update cart item quantity.";

      setCartError(message);

      return {
        ok: false,
        error,
        message,
      };
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * Elimina una línea del carrito.
   */
  const removeCartItem = async (lineId) => {
    try {
      setIsMutatingCart(true);
      setCartError("");

      const response = await removeActiveCartItem(lineId);
      const adaptedCart = adaptBackendCartToUi(response?.data?.cart);

      setCart(adaptedCart);

      return {
        ok: true,
        cart: adaptedCart,
      };
    } catch (error) {
      console.error("Error removing cart item:", error);

      const message =
        error?.error?.message || "Could not remove cart item.";

      setCartError(message);

      return {
        ok: false,
        error,
        message,
      };
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * Limpia errores del carrito.
   */
  const clearCartError = () => {
    setCartError("");
  };

  /**
   * Bootstrap del carrito cuando cambia autenticación.
   */
  useEffect(() => {
    // Espera a que termine bootstrap de sesión
    if (isBootstrapping) return;

    if (!isAuthenticated) {
      setCart(null);
      setCartError("");
      return;
    }

    refreshCart();
  }, [isAuthenticated, isBootstrapping]);

  /**
   * Derivados del carrito para UI.
   */
  const cartItems = cart?.items ?? [];
  const cartCount = getCartItemsCount(cart);
  const cartLinesCount = getCartLinesCount(cart);

  const value = useMemo(
    () => ({
      cart,
      cartItems,
      cartCount,
      cartLinesCount,
      isLoadingCart,
      isMutatingCart,
      cartError,
      refreshCart,
      addMedicationToCart,
      updateCartItemQuantity,
      removeCartItem,
      clearCartError,
    }),
    [
      cart,
      cartItems,
      cartCount,
      cartLinesCount,
      isLoadingCart,
      isMutatingCart,
      cartError,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook de consumo del carrito.
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};