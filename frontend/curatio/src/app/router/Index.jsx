import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import { MainLayout } from "@/features/layouts";
import { AuthLayout } from "@/features/layouts";
import { ProfilePage, BasicInformationPage, ContactInformationPage, RolPage } from "@/features/users";
import { LoginPage, ForgotPasswordPage, TokenPasswordPage, ResetPasswordPage } from "@/features/auth";
import { CreateFormSuppliers, ContactInformationSuppliers, SupplierDetailPage } from "@/features/suppliers";
import { ElectronicInvoiceSalesPage } from "@/features/sales";
import { ProductPage, ListProductsPage, ProductDetailPage } from "@/features/products";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import { ListUserPage } from "@/features/users";
import { HomePage, NewHomePage } from "@/features/home";
import CartShopLayout from "../../features/layouts/CartShopLayout";
import ListCartShopPage from "../../features/cartshop/page/ListCartShopPage";

const router = createBrowserRouter([

    {
        
        element:<MainLayout/>,
        children: [

            {
                // index: true,
                path:"/",
                element: <NewHomePage/>
            },
            {
                path:"/home",
                element: <HomePage/>
            },
            {
                // index: true,
                path:"dashboard",
                element: <DashboardPage/>
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
                    },
                    {
                        path: "perfil",
                        element: <ProfilePage />
                    },
                    {
                        path: "list",
                        element: <ListUserPage />
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
                        //Quite el /nit: para acceder solo con suppliers/detalle
                        path: "detalle",
                        element: <SupplierDetailPage />
                    }
                ]
            },
            {
                path: "products",
                element: <ProductPage />
            },

            {
                path: "sales/factura-electronica",
                element: <ElectronicInvoiceSalesPage />
            },
            {
                path: "products/listar",
                element: <ListProductsPage />
            },
            {
                path: "products/detalle/:id",
                element: <ProductDetailPage />
            },

            {
                path: "perfil",
                element: <ProfilePage/>
            },
            
        ]
    },

    {
        element:<CartShopLayout/>,
        children: [

            {

                // index: true,
                path:"list-cartshop",
                element: <ListCartShopPage/>

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