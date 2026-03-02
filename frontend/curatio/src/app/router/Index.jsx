import {createBrowserRouter, Navigate, Outlet} from "react-router-dom";
import MainLayout from "@/shared/layout/MainLayout";
import ProfilePage from "@/features/users/pages/ProfilePage";
import HomePage from "../../features/home/pages/HomePage";
import AuthLayout from "../../shared/layout/AuthLayout";
import CreateFormSuppliers from "../../features/suppliers/pages/CreateSuppliersDatosBasicos";
import DatosContactoSuppliers from "../../features/suppliers/pages/CreateSuppliersDatosContacto";


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
                element: <h1 className = "p-4"> Cuentas   </h1>
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
                element: <AuthLayout/>

            },

            {
                path: "forgot-password",
                element: <h1 className = "p-4"> Recuperar contraseña   </h1>
            },

            {
                path: "reset-password",
                element: <h1 className = "p-4"> Cambiar mi contraseña   </h1>
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
    }
])



export default router;