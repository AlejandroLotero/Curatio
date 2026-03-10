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
            sm :
                `
                h-8 px-2
                `,
            md :
                            `
                h-9 px-3
                `,
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
                    font-body font-heading text-small
                    ${sizes[size]}
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