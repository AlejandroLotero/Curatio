import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { MainLayout, AuthLayout } from "@/features/layouts";

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
} from "@/features/suppliers";

import { ElectronicInvoiceSalesPage } from "@/features/sales";
import {
  ProductsPage,
  ProductDetailPage,
  ListProductsPage,
} from "@/features/products";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ListSupplierPage from "@/features/suppliers/pages/ListSupplierPage";
import { HomePage, NewHomePage } from "@/features/home";
import CartShopLayout from "@/features/layouts/CartShopLayout";
import ListCartShopPage from "@/features/cartshop/page/ListCartShopPage";
import ProtectedRoute from "@/app/router/ProtectedRoute";
import EditProductPage from "@/features/products/pages/EditProductPage";

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
                path: "detalle",
                element: <SupplierDetailPage />,
              },
            ],
          },

          /**
           * =========================
           * PRODUCTS
           * =========================
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
                path: "products/detail/:id",
                element: <ProductShowPage />
            },
            {
                path: "sales/factura-electronica",
                element: <ElectronicInvoiceSalesPage />
            },
          {
            path: "/products/detalle/:id",
            element: <ProductDetailPage />,
          },
            {
                path: "products/editar/:id",
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
            path: "/sales/factura-electronica",
            element: <ElectronicInvoiceSalesPage />,
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