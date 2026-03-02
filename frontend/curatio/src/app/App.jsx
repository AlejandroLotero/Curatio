// //Se comenta para que no entre en conflicto con el CreateUserPage, que es el que se va a mostrar en la pagina de crear usuario
// //import UserForm from "../features/users/components/UserForm";
// import UserForm from "../features/users/components/UserForm";
// import CreateUserPage from "../features/users/pages/CreateUserPage";
// import DeleteCountter from "../shared/components/DeleteCountter.jsx";
// import DeleteUseEffect from "../shared/components/DeleteUseEffect.jsx";
// import Select from "../shared/components/Select.jsx";

// export default function App() {

//     return(
//         <div className="grid grid-cols-1 gap-6  justify-items-center">
//             <h1 className="text-tittles font-bold text-center text-label">
//                 Crear Usuario             
//             </h1>

//             <div className="">
//                 <UserForm />
//                 {/* <CreateUserPage/> */}
//                 {/* <DeleteCounter /> */}
//                 {/* <DeleteUseEffect /> */}
//                 {/* <Select/> */}
//             </div>
//         </div>
//     );
// };


import { RouterProvider } from "react-router-dom";
import router from "@/app/router";
export default function App() {
    return(

        <RouterProvider router={router}/>
    )

}