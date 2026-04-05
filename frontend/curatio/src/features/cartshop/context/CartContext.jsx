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