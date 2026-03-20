
import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
import { CartProvider } from "@/features/cartshop/context/CartContext";


export default function App() {
  return (
    <CartProvider>
     <RouterProvider router = {router}/>
     </CartProvider>
  );
}
