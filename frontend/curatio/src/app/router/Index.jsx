import {createBrowserRouter, Navigate, Outlet} from "react-router-dom"
import MainLayout from "@/shared/layout/MainLayout"
import ProfilePage from "../../features/users/pages/ProfilePage";
import HomePage from "../../features/home/pages/HomePage";
import AuthLayout from "../../shared/layout/AuthLayout";
import DatosBasicosPage from "../../features/users/pages/DatosBasicosPage";
import DatosContactoPage from "../../features/users/pages/DatosContactoPage";
import RolPage from "../../features/users/pages/RolPage";

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
                    path: "login",
                    element: <AuthLayout/>
                },
                {
                    path:"forgot-password",
                    element: <h1 className="p-4">Recuperar mi contraseña</h1>
                },
                {
                    path:"reset-password",
                    element: <h1 className="p-4">Resetear mi contraseña</h1>
                },
                {
                    path: "crear-usuario",
                    element: <Outlet />,
                    children: [
                        {
                            index: true,
                            element: <Navigate to="datos-basicos" replace />
                        },
                        {
                            path: "datos-basicos",
                            element: <DatosBasicosPage />
                        },
                        {
                            path: "datos-contacto",
                            element: <DatosContactoPage />
                        },
                        {
                            path: "rol",
                            element: <RolPage />
                        }
                    ]
                },
        ]
    }
])

export default router;