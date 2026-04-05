import { createContext, useContext, useMemo, useState } from "react";
import { products as catalogProducts } from "@/data/product/products";
import { listProducts } from "@/data/product/listProducts";

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
 * Datos del medicamento en la UI:
 * - NewHomePage / ProductShowPage solo envían productId + quantity.
 * - El contexto resuelve nombre, precio, imagen y datos técnicos desde el
 *   catálogo local (products + listProducts), igual que en el detalle de producto.
 *
 * Nota:
 * - esta implementación funciona en memoria
 * - si luego conectas backend, solo reemplazas la lógica interna
 *   de addToCartItem, removeCartItem y clearActiveCart
 */
const CartContext = createContext(null);

/**
 * Une catálogo visual (products) e inventario (listProducts) por id.
 * Así ViewCartShopPage puede mostrar la misma información que la ficha del medicamento.
 *
 * @param {string|number} productId
 * @returns {object|null} Datos del medicamento para una línea de carrito, o null si no existe en catálogo
 */
function resolveMedicationForCart(productId) {
  if (productId == null) return null;

  const visual = catalogProducts.find(
    (p) => String(p.id) === String(productId)
  );
  const inventory = listProducts.find(
    (p) => String(p.id) === String(productId)
  );

  if (!visual && !inventory) return null;

  return {
    productId: inventory?.id ?? visual?.id,
    productName:
      inventory?.nameproduct ?? visual?.title ?? "Medicamento",
    unitPrice: Number(
      inventory?.precioVenta ?? visual?.price ?? 0
    ),
    image: visual?.image ?? inventory?.image ?? null,
    laboratory: inventory?.laboratory ?? "",
    description: inventory?.descripcion ?? visual?.description ?? "",
    presentation: inventory?.presentacion ?? "",
    concentration: inventory?.concentration ?? "",
    formaFarmaceutica: inventory?.formaFarmaceutica ?? "",
  };
}

/**
Aqui se defin ela logica para llenar la linea del carrito con los datos del medicamento
 */
function enrichCartLine(item) {
  const meta = resolveMedicationForCart(item.productId);
  if (!meta) {
    return {
      ...item,
      subtotal:
        Number(item.quantity || 0) * Number(item.unitPrice || 0),
    };
  }
  // Se calcula el precio unitario efectivo (si hay un precio unitario en la linea, se usa, sino se usa el precio unitario del medicamento)
  const unitPrice =
    Number(item.unitPrice) > 0 //
      ? Number(item.unitPrice)
      : Number(meta.unitPrice);
  const quantity = Number(item.quantity) || 0; // Se obtiene la cantidad de la linea
// Se retorna el item con los datos del medicamento
  return {
    ...item,
    productName: item.productName || meta.productName, // Se actualiza el nombre del producto
    unitPrice, // Se actualiza el precio unitario efectivo
    image: item.image ?? meta.image, // Se actualiza la imagen del producto
    laboratory: item.laboratory ?? meta.laboratory, // Se actualiza el laboratorio del producto
    description: item.description ?? meta.description, // Se actualiza la descripción del producto
    presentation: item.presentation ?? meta.presentation, // Se actualiza la presentación del producto
    concentration: item.concentration ?? meta.concentration, // Se actualiza la concentración del producto
    formaFarmaceutica: item.formaFarmaceutica ?? meta.formaFarmaceutica, // Se actualiza la forma farmacéutica del producto
    subtotal: quantity * unitPrice, // Se actualiza el subtotal
  };
}

/**
 * Provider del carrito.
 */
export function CartProvider({ children }) { 
  /**
   * Líneas crudas del carrito (persistencia en memoria).
   * La UI consume `cartItems` ya enriquecido vía useMemo.
   */
  const [rawCartItems, setRawCartItems] = useState([]);

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
    productName: productNameOverride,
    quantity = 1,
    unitPrice: unitPriceOverride,
  } = {}) => {
    const meta = resolveMedicationForCart(productId); // La constante meta contiene los datos del medicamento
    const productName =
      productNameOverride ?? meta?.productName ?? "Producto";
    const unitPrice = Number(
      unitPriceOverride ?? meta?.unitPrice ?? 0
    );

    if (!meta && productNameOverride == null && unitPriceOverride == null) {
      throw new Error("Producto no encontrado en catálogo.");
    }

    const extraFields = meta
      ? {
          image: meta.image,
          laboratory: meta.laboratory,
          description: meta.description,
          presentation: meta.presentation,
          concentration: meta.concentration,
          formaFarmaceutica: meta.formaFarmaceutica,
        }
      : {};

    try {
      setIsMutatingCart(true);
// Se agrega el producto al carrito con los datos del medicamento y se actualiza la cantidad y el subtotal
      setRawCartItems((prevItems) => {            // Se busca el producto en el carrito
        const existingItem = prevItems.find(      // Si el producto ya existe en el carrito, se actualiza la cantidad y el subtotal
          (item) => String(item.productId) === String(productId) // Se compara el id del producto con el id del producto en el carrito
        );

        if (existingItem) { // Si el producto ya existe en el carrito, se actualiza la cantidad y el subtotal
          return prevItems.map((item) => { // Se actualiza la cantidad y el subtotal
            if (String(item.productId) !== String(productId)) return item; // Si el id del producto no es el mismo, se retorna el item original

            const nextQuantity = Number(item.quantity) + Number(quantity); // Se obtiene la cantidad total
            const effectiveUnit =
              Number(item.unitPrice) > 0 ? item.unitPrice : unitPrice; // Se obtiene el precio unitario efectivo

            return { // Se retorna el item con los datos del medicamento y se actualiza la cantidad y el subtotal
              ...item, // Se retorna el item original
              ...extraFields, // Se agrega los datos del medicamento
              productName: item.productName || productName, // Se actualiza el nombre del producto
              unitPrice: effectiveUnit, // Se actualiza el precio unitario efectivo
              quantity: nextQuantity,
              subtotal: nextQuantity * Number(effectiveUnit), // Se actualiza el subtotal
            };
          }); // Se retorna el item con los datos del medicamento y se actualiza la cantidad y el subtotal
        }

        return [ //Este return es para agregar el producto al carrito si no existe si existe se actualiza la cantidad y el subtotal
          ...prevItems,
          {
            id: `${productId}-${Date.now()}`, // Se genera un id para el producto
            productId: meta?.productId ?? productId, // Se actualiza el id del producto
            productName, // Se actualiza el nombre del producto
            ...extraFields, // Se agrega los datos del medicamento
            quantity: Number(quantity), // Se actualiza la cantidad
            unitPrice, // Se actualiza el precio unitario efectivo
            subtotal: unitPrice * Number(quantity), // Se actualiza el subtotal
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

      setRawCartItems((prevItems) => // Se filtra el producto del carrito
        prevItems.filter((item) => item.id !== itemId) // Se filtra el producto del carrito
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

      setRawCartItems([]); // Se vacía el carrito
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
  /**
   * Items listos para la UI: siempre con nombre, precio y datos del medicamento
   * cuando el id existe en catálogo.
   */
  const cartItems = useMemo(
    () => rawCartItems.map(enrichCartLine),
    [rawCartItems]
  );

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