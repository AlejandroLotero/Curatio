/*Creacion de componente*/
export default function Buttom({
    variant = "primary",    //Define el estilo visual
    size = "md",
    type = "button",
    children,       //Contenido que tiene el boton
    ...props
}) {
    const getVariantStyle = (variant) => {
        if (variant === "primary") {
            return {
                backgroundColor: "var(--color-button-primary-bg)",
                color: "white",
                borderColor: "var(--color-button-primary-bg)",
            };
        } else if (variant === "secondary") {
            return {
                backgroundColor: "var(--color-gray-800)",
                color: "var(--color-black)",
                borderColor: "var(--color-gray-800)",
            };
        }
    };

    const getHoverStyle = (variant) => {
        if (variant === "primary") {
            return {
                "--hover-bg": "rgba(47, 111, 103, 0.9)",
            };
        } else if (variant === "secondary") {
            return {
                "--hover-bg": "rgba(224, 224, 224, 0.8)",
            };
        }
    };

    const sizes = {
        sm: "h-9 px-3",
        md: "h-10 px-4",
    };

    return (
        <button
            type={type}
            className={`
                relative
                inline-flex items-center justify-center
                rounded-full
                transition-all
                font-semibold
                border
                hover:opacity-80
                ${sizes[size]}
            `}
            style={{
                ...getVariantStyle(variant),
                fontFamily: "var(--font-body)",
            }}
            {...props}
        >
            {children}
        </button>
    );
};