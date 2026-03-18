import { createContext, useContext, useState } from "react";
// Importamos tu array desde la ruta exacta que me diste
import { cartshops as initialData } from "@/data/cartshop/cartshops";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Usamos tu array de src/data/... como estado inicial
  const [cartItems, setCartItems] = useState(initialData);

  // Función para agregar un producto manteniendo tu estructura
  const addToCart = (newProduct) => {
    setCartItems((prev) => [...prev, newProduct]);
  };

  // El número que irá en el círculo rojo
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);