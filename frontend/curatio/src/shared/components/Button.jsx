/*Creacion de componente*/
import { useState } from "react";

export default function Buttom({
    variant = "primary",    //Define el estilo visual
    size = "md",
    type = "button",
    children,
    disabled= false,       //Contenido que tiene el boton
    ...props
}) {
    const [isHovered, setIsHovered] = useState(false);
    
    const variants = {
        primary : {
            base: "border-2",
            bg: "var(--color-primarybtnbg)",
            text: "var(--color-primarybtntext)",
            border: "var(--color-border-strong)",
            hoverBg: "#3a7d71",
        },
        secondary : {
            base: "border-2",
            bg: "var(--color-secondarybtnbg)",
            text: "var(--color-secondarybtntext)",
            border: "var(--color-border-strong)",
            hoverBg: "#3a6363",
        }
}

        const sizes = {
            xs: "h-6 px-2 text-xs",
            sm: "h-10 px-4 text-sm",
            md: "h-12 px-6 text-base",
            lg: "h-16 px-8 text-lg",
            xl: "h-20 px-12 text-xl",
        }

        const selectedVariant = variants[variant];

        return (

            <button
                type={type}
                disabled={disabled} 
                className={`
                    relative
                    inline-flex items-center justify-center
                    transition-colors
                    cursor-pointer
                    font-body font-bold
                    ${sizes[size] || sizes.md}
                    ${selectedVariant.base}
                `}
                style={{
                    backgroundColor: isHovered ? selectedVariant.hoverBg : selectedVariant.bg,
                    color: selectedVariant.text,
                    borderColor: selectedVariant.border,
                    borderRadius: "20px",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
                {...props}
            >
            {children}




            </button>
        )
};