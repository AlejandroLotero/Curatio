import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import {MainLayout} from "@/features/layouts";
import {ProfilePage} from "@/features/users";
import HomePage from "@/features/home/pages/HomePage";
import {DashboardPage} from "@/features/dashboard";
import {AuthLayout} from "@/features/layouts";
import {LoginPage} from "@/features/auth";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import TokenPasswordPage from "@/features/auth/pages/TokenPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"
import BasicInformationPage from "@/features/users/pages/BasicInformationPage";
import ContactInformationPage from "@/features/users/pages/ContactInformationPage";
import RolPage from "@/features/users/pages/RolPage";
import CreateFormSuppliers from "@/features/suppliers/pages/CreateSuppliersBasicInformation";
import ContactInformationSuppliers from "@/features/suppliers/pages/CreateSuppliersContactInformation";
import FacturaElectronicaVentaPage from "@/features/sales/pages/FacturaElectronicaVentaPage";
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
                path: "/dashboard",
                element: <DashboardPage />
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
                        }
                    ]
                },
            {
                path: "products",
                element: <ProductsPage />
            },

            {
                path: "sales/factura-electronica",
                element: <FacturaElectronicaVentaPage />
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