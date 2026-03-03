import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import MainLayout from "@/shared/layout/MainLayout";
import ProfilePage from "@/features/users/pages/ProfilePage";
<<<<<<< HEAD
import HomePage from "@/features/home/pages/HomePage";
import AuthLayout from "@/shared/layout/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import TokenPasswordPage from "@/features/auth/pages/TokenPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"
import DatosBasicosPage from "@/features/users/pages/DatosBasicosPage";
import DatosContactoPage from "@/features/users/pages/DatosContactoPage";
=======
import HomePage from "../../features/home/pages/HomePage";
import AuthLayout from "../../shared/layout/AuthLayout";
import CreateFormSuppliers from "../../features/suppliers/pages/CreateSuppliersDatosBasicos";
import DatosContactoSuppliers from "../../features/suppliers/pages/CreateSuppliersDatosContacto";
import LoginPage from "@/features/auth/pages/LoginPage";
import Forgot Password Page from "@/features/auth/pages/Forgot PasswordPage"
import TokenPassword Page from "@/features/auth/pages/TokenPasswordPage"
import ResetPassword Page from "@/features/auth/pages/ResetPasswordPage"
import DatosBasicos Page from "@/features/users/pages/Datos BasicosPage"; 
import Datos ContactoPage from "@/features/users/pages/Datos ContactoPage";
>>>>>>> 4b56862 (feat:Formulario actualizado para crear y registrar proveedores con su respectivo componente)
import RolPage from "@/features/users/pages/RolPage";

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
                        element: <DatosBasicosPage />
                    },
                    {
                        path: "contacto",
                        element: <DatosContactoPage />
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
                            element: <DatosContactoSuppliers />
                        }
                    ]
                },
            {
                path: "products",
                element: <h1 className = "p-4"> Productos </h1>
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