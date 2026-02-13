import UserForm from "../features/users/components/UserForm";

export default function App() {

    return(
        <div className="grid grid-cols-1 gap-6  justify-items-center">
            <h1 className="">
                Curatio Farma              
            </h1>

            <div>
                 <UserForm />
            </div>
        </div>
    )
}