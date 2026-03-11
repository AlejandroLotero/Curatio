import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import {MainLayout} from "@/features/layouts";
import HomePage from "@/features/home/pages/HomePage";
import {AuthLayout} from "@/features/layouts";
import { ProfilePage, BasicInformationPage, ContactInformationPage, RolPage } from "@/features/users";
import { LoginPage, ForgotPasswordPage, TokenPasswordPage, ResetPasswordPage } from "@/features/auth";
import { CreateFormSuppliers, ContactInformationSuppliers } from "@/features/suppliers";
import ProductsPage from "@/features/products/pages/ProductsPage";

const router = createBrowserRouter([

    {
        
        element:<MainLayout/>,
        children: [

            {

                // index: true,
                path:"/",
                element: <HomePage></HomePage>

            },

            {
                path: "accounts",
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/accounts/datos-basicos" replace />
                    },
                    {
                        path: "datos-basicos",
                        element: <BasicInformationPage />
                    },
                    {
                        path: "contacto",
                        element: <ContactInformationPage />
                    },
                    {
                        path: "rol",
                        element: <RolPage />
                    }
                ]
            },

            {
                path:"suppliers",
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="datos-basicos" replace />
                    },
                    {
                        path: "datos-basicos",
                        element: <CreateFormSuppliers />
                    },
                    {
                        path: "datos-contacto",
                        element: <ContactInformationSuppliers />
                    },
                    {
                        path: "detalle/:nit",
                        element: <SupplierDetailPage />
                    }
                ]
            },
            {
                path: "products",
                element: <ProductsPage />
            },

            {
                path: "sales/factura-electronica",
                element: <ElectronicInvoiceSalesPage />
            },

            {
                path: "perfil",
                element: <ProfilePage/>
            },
            
        ]
    },

    {
        element:<AuthLayout/>,
        children: [

            {

                // index: true,
                path:"login",
                element: <LoginPage/>

            },

            {
                path: "forgot-password",
                element: <ForgotPasswordPage/>
            },

            {
                path: "reset-password",
                element: <ResetPasswordPage></ResetPasswordPage>
            },

            {
                path: "send-token",
                element: <TokenPasswordPage></TokenPasswordPage>
            },

            {
                path: "perfil",
                element: <ProfilePage/>
            },
            
        ]
    }
])



export default router;