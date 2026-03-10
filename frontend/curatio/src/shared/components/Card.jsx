import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Card = ({product, onComprarRoute = "/login"}) => {

    const {title, image, price, description } = product;
    const navigate = useNavigate();

    const handleComprar = () => {
        navigate(onComprarRoute);
    };

    return (
        <div className="
            w-80
            text-black
            dark:text-white
            dark:bg-neutral-950/70
            backdrop-blur-[8px]        
            shadow-lg
            rounded-2xl
            overflow-hidden
            hover:shadow-black
            transition-shadow
            duration-700      
        
        ">

            <img
            src= {image}
            image= {title}
            className="w-full h-56 object-contain" 
            />

            <div className="p-5 space-y-3">

                <h2 className="text-xl font-body font-bold">
                    {title}
                </h2>

                <p className="text-sm font-body">
                    {description}
                </p>

                <p className="text-lg font-bold text-green-800 font-body">

                    {/* Esto agrega separadores de miles, lo que mejora la lectura.
                    toLocaleString() */}
                    ${price.toLocaleString()}
                </p>

                <Button variant="primary" size="md" className="w-full" onClick={handleComprar}>
                    Comprar
                </Button>

            </div>
        </div>
    );
}

export default Card;