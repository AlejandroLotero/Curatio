import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { MainLayout, AuthLayout } from "@/features/layouts";
import ViewCartShopPage from "@/features/cartshop/page/ViewCartShopPage";
import { PermissionsManagementPage } from "@/features/permissions";
import {
  ProfilePage,
  BasicInformationPage,
  ContactInformationPage,
  RolPage,
  UpdateBasicInformationPage,
  UpdateContactInformationPage,
  UpdateRolPage,
  ListUserPage,
} from "@/features/users";

import {
  LoginPage,
  ForgotPasswordPage,
  TokenPasswordPage,
  ResetPasswordPage,
} from "@/features/auth";

import {
  CreateFormSuppliers,
  ContactInformationSuppliers,
  SupplierDetailPage,
  EditFormSuppliers,
  EditContactInformationSuppliers,
} from "@/features/suppliers";

import { ElectronicInvoiceSalesPage, 
  ListSales, 
  PaymentsView,
  ConfirmPayment}
  from "@/features/sales";
  
import {
  ProductsPage,
  ProductDetailPage,
  ListProductsPage,
  EditProductPage,
} from "@/features/products/";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ListSupplierPage from "@/features/suppliers/pages/ListSupplierPage";
import { HomePage, NewHomePage } from "@/features/home";
import CartShopLayout from "@/features/layouts/CartShopLayout";
import ListCartShopPage from "@/features/cartshop/page/ListCartShopPage";
import ProtectedRoute from "@/app/router/ProtectedRoute";
import ProductShowPage from "@/features/products/pages/ProductShowPage";


/**
 * Router principal
 * ----------------
 * Separación clara:
 * - rutas públicas
 * - rutas de autenticación
 * - rutas protegidas
 */
const router = createBrowserRouter([
  /**
   * =========================
   * RUTAS PÚBLICAS CON MAINLAYOUT
   * =========================
   * Estas rutas NO requieren sesión.
   */
 {
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <NewHomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/products/detalle/:id",
      element: <ProductShowPage />,
    },
    {
      path: "/cartshop/ver-carrito",
      element: <ViewCartShopPage />,
    },
  ],
},

  /**
   * =========================
   * RUTAS DE AUTENTICACIÓN
   * =========================
   * Layout visual de auth, sin sesión requerida.
   */
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/send-token",
        element: <TokenPasswordPage />,
      },
    ],
  },

  /**
   * =========================
   * RUTAS PROTEGIDAS
   * =========================
   * Todo lo que esté aquí requiere sesión activa.
   */
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
           {
                path: "permissions",
                element: <PermissionsManagementPage/>
            },

          /**
           * =========================
           * USERS
           * =========================
           */
          {
            path: "/accounts",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Navigate to="/accounts/datos-basicos" replace />,
              },
              {
                path: "datos-basicos",
                element: <BasicInformationPage />,
              },
              {
                path: "contacto",
                element: <ContactInformationPage />,
              },
              {
                path: "rol",
                element: <RolPage />,
              },
              {
                path: "perfil",
                element: <ProfilePage />,
              },
              {
                path: "perfil/:id",
                element: <ProfilePage />,
              },
              {
                path: "list",
                element: <ListUserPage />,
              },
              {
                path: "editar-datos-basicos/:id",
                element: <UpdateBasicInformationPage />,
              },
              {
                path: "editar-datos-contacto",
                element: <UpdateContactInformationPage />,
              },
              {
                path: "editar-rol",
                element: <UpdateRolPage />,
              },
            ],
          },

          /**
           * =========================
           * SUPPLIERS
           * =========================
           */
          {
            path: "/suppliers",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Navigate to="/suppliers/datos-basicos" replace />,
              },
              {
                path: "datos-basicos",
                element: <CreateFormSuppliers />,
              },
              {
                path: "listar-proveedores",
                element: <ListSupplierPage />,
              },
              {
                path: "datos-contacto",
                element: <ContactInformationSuppliers />,
              },
              {
                path: "detalle/:id",
                element: <SupplierDetailPage />,
              },
              {
                path: "editar/:id",
                element: <EditFormSuppliers />,
              },
              {
                path: "editar-contacto/:id",
                element: <EditContactInformationSuppliers />,
              },
            ],
          },

          /**
           * =========================
           * PRODUCTS
           * =========================
           *  - /products               -> formulario creación medicamento
            * - /products/listar        -> listado administrativo
            * - /products/detalle/:id   -> detalle visual/comercial (dashboard)
            * - /products/admin/detalle/:id -> detalle administrativo
            */
          
          
          {
            path: "/products",
            element: <ProductsPage />,
          },
          {
            path: "/products/listar",
            element: <ListProductsPage />,
          },
          {
            /**
             * Detalle visual usado desde dashboard / catálogo
             */
            path: "/products/detalle/:id",
            element: <ProductShowPage />,
          },
          {
            /**
             * Detalle administrativo interno
             */
            path: "/products/admin/detalle/:id",
            element: <ProductDetailPage />,
          },
          {
            path: "/products/editar/:id",
            element: <EditProductPage />
          },
          

          /**
           * =========================
           * PROFILE
           * =========================
           */
          {
            path: "/perfil",
            element: <ProfilePage />,
          },

          /**
           * =========================
           * SALES
           * =========================
           */
          {
            path: "/sales/list",
            element: <ListSales />,
          },
          {
            path: "/sales/factura-electronica",
            element: <ElectronicInvoiceSalesPage />,
          },
          {
            /**
             * Checkout con sesión: tras "Ir a pagar" en el carrito público.
             */
            path: "/sales/pagos",
            element: <PaymentsView />,
          },
          {
            /** Resumen de transacción exitosa (tras confirmar en modal de pagos). */
            path: "/sales/confirmacion-pago",
            element: <ConfirmPayment />,
          },

          /**
           * =========================
           * CARTSHOP
           * =========================
           */
          {
            path: "/cartshop",
            element: <CartShopLayout />,
            children: [
              {
                path: "list-cartshop",
                element: <ListCartShopPage />,
              },
              {
                path: "perfil",
                element: <ProfilePage />,
              },
              // {
              //   path: "ver-carrito",
              //   element: <ViewCartShopPage />,
              // },
            ],
          },
        ],
      },
    ],
  },

  /**
   * =========================
   * FALLBACK
   * =========================
   * Si la ruta no existe, redirige al inicio público.
   */
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;