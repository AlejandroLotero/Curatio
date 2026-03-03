import {createBrowserRouter} from "react-router-dom";
import MainLayout from "@/shared/layout/MainLayout";
import ProfilePage from "@/features/users/pages/ProfilePage";
import HomePage from "@/features/home/pages/HomePage";
import AuthLayout from "@/shared/layout/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage"
import TokenPasswordPage from "@/features/auth/pages/TokenPasswordPage"
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage"
import MedForm from "@/features/products/Medform"

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
                path: "suppliers",
                element: <h1 className = "p-4"> Proveedor   </h1>
            },

            {
                path: "products",
                element: <MedForm/>
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