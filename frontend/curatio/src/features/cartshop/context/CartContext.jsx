import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getPublicMedicationById } from "@/lib/http/publicMedications";
import { adaptPublicMedicationDetail } from "@/lib/adapters/publicMedicationAdapter";
//funcion para limpiar el estado de la UI cuando la sesion termina 
import { CLEAR_UI_STATE_ON_AUTH_END } from "@/lib/auth/sessionEvents";

/**
 * CartContext
 * -----------
 * Contexto central del carrito actual / operativo.
 *
 * Responsabilidades:
 * - agregar productos
 * - quitar productos completos
 * - aumentar cantidad
 * - disminuir cantidad
 * - vaciar carrito
 * - recalcular contador y subtotal
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isMutatingCart, setIsMutatingCart] = useState(false);

  useEffect(() => {
    const onAuthEnd = () => {
      setCartItems([]);
    };
    window.addEventListener(CLEAR_UI_STATE_ON_AUTH_END, onAuthEnd);
    return () => window.removeEventListener(CLEAR_UI_STATE_ON_AUTH_END, onAuthEnd);
  }, []);

  /**
   * =========================
   * AGREGAR AL CARRITO
   * =========================
   * Si no llegan datos mínimos, los consulta desde backend.
   */
  const addToCartItem = async ({
    productId,
    productName,
    quantity,
    unitPrice,
  }) => {
    try {
      setIsMutatingCart(true);

      let resolvedProductName = productName;
      let resolvedUnitPrice = unitPrice;
      let resolvedImageUrl = null;
      let resolvedLaboratory = "";

      if (!resolvedProductName || resolvedUnitPrice === undefined) {
        const response = await getPublicMedicationById(productId);
        const medication = adaptPublicMedicationDetail(response?.data?.medication);

        resolvedProductName = medication?.name ?? "Producto";
        resolvedUnitPrice = Number(medication?.salePrice ?? 0);
        resolvedImageUrl = medication?.imageUrl ?? null;
        resolvedLaboratory = medication?.laboratory ?? "";
      } else {
        /**
         * Si ya vienen nombre y precio, igual intentamos completar
         * imagen y laboratorio para mejorar la vista del carrito.
         */
        try {
          const response = await getPublicMedicationById(productId);
          const medication = adaptPublicMedicationDetail(response?.data?.medication);

          resolvedImageUrl = medication?.imageUrl ?? null;
          resolvedLaboratory = medication?.laboratory ?? "";
        } catch {
          resolvedImageUrl = null;
          resolvedLaboratory = "";
        }
      }

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
              imageUrl: item.imageUrl ?? resolvedImageUrl ?? null,
              laboratory: item.laboratory ?? resolvedLaboratory ?? "",
            };
          });
        }

        return [
          ...prevItems,
          {
            id: `${productId}-${Date.now()}`,
            productId,
            productName: resolvedProductName,
            quantity,
            unitPrice: Number(resolvedUnitPrice || 0),
            subtotal: Number(resolvedUnitPrice || 0) * quantity,
            imageUrl: resolvedImageUrl,
            laboratory: resolvedLaboratory,
          },
        ];
      });
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * =========================
   * QUITAR ITEM COMPLETO
   * =========================
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
   * AUMENTAR CANTIDAD
   * =========================
   */
  const increaseCartItemQuantity = async (itemId) => {
    try {
      setIsMutatingCart(true);

      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id !== itemId) return item;

          const nextQuantity = Number(item.quantity || 0) + 1;

          return {
            ...item,
            quantity: nextQuantity,
            subtotal: nextQuantity * Number(item.unitPrice || 0),
          };
        })
      );
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * =========================
   * DISMINUIR CANTIDAD
   * =========================
   * Regla:
   * - si la cantidad es mayor a 1, disminuye
   * - si la cantidad es 1, elimina el item
   */
  const decreaseCartItemQuantity = async (itemId) => {
    try {
      setIsMutatingCart(true);

      setCartItems((prevItems) =>
        prevItems.flatMap((item) => {
          if (item.id !== itemId) return [item];

          const currentQuantity = Number(item.quantity || 0);

          if (currentQuantity <= 1) {
            return [];
          }

          const nextQuantity = currentQuantity - 1;

          return [
            {
              ...item,
              quantity: nextQuantity,
              subtotal: nextQuantity * Number(item.unitPrice || 0),
            },
          ];
        })
      );
    } finally {
      setIsMutatingCart(false);
    }
  };

  /**
   * =========================
   * VACIAR CARRITO
   * =========================
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
   * Reservado para futura conexión con backend.
   */
  const hydrateCart = async () => {
    return;
  };

  /**
   * =========================
   * TOTAL DE ITEMS
   * =========================
   */
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
  }, [cartItems]);

  /**
   * =========================
   * SUBTOTAL
   * =========================
   */
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + Number(item.subtotal || 0),
      0
    );
  }, [cartItems]);

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    isMutatingCart,
    hydrateCart,
    addToCartItem,
    removeCartItem,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    clearActiveCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}