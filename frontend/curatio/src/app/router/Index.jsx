import {createBrowserRouter, Navigate, Outlet} from "react-router-dom"
import MainLayout from "@/shared/layout/MainLayout"
import ProfilePage from "../../features/users/pages/ProfilePage";
import HomePage from "../../features/home/pages/HomePage";
import AuthLayout from "../../shared/layout/AuthLayout";
import DatosBasicosPage from "../../features/users/pages/DatosBasicosPage";
import DatosContactoPage from "../../features/users/pages/DatosContactoPage";
import RolPage from "../../features/users/pages/RolPage";
import MainLayout from "@/shared/layout/MainLayout";
import ProfilePage from "@/features/users/pages/ProfilePage";
import HomePage from "@/features/home/pages/HomePage";
import AuthLayout from "@/shared/layout/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import TokenPasswordPage from "@/features/auth/pages/TokenPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"

const router = createBrowserRouter([
    {
            element:<MainLayout/>,
            children: [
                {
                    path: "/",
                    element: <HomePage/>
                },
                {
                    path:"cursos",
                    element: <h1 className="p-4">Cursos</h1>
                },
                {
                    path:"contacto",
                    element: <h1 className="p-4">Contacto</h1>
                },
                {
                    path:"video",
                    element: <h1 className="p-4">Videos</h1>
                },
                {
                    path:"perfil",
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