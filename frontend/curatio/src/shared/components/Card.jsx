
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Card = ({product, onComprarRoute}) => {

    const {title, image, price, description } = product;
    const navigate = useNavigate();

    const handleComprar = () => {
        if (onComprarRoute) {
            navigate(onComprarRoute);
        }
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

                <p className="text-2xl font-bold text-green-950 font-body">

                    {/* Esto agrega separadores de miles, lo que mejora la lectura.
                    toLocaleString() */}
                    ${price.toLocaleString()}
                </p>

            </div>
        </div>
    );
}

export default Card;