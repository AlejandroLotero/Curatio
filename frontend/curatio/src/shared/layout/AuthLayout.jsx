import { Outlet} from "react-router-dom";
import imageBgAll from "../../assets/images/imageBgAll.jpg";

export default function AuthLayout(){

        return(
            <div
                className="relative min-h-screen w-full flex items-center justify-center text-black"
                style={{
                    backgroundImage: `url(${imageBgAll})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    }}>

                {/*Contenido que se inyecta*/}
                <main className="mx-auto max-w7">
                    <Outlet />
                </main>
            </div>

        );
};
