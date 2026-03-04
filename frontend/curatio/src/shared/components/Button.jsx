/*Creacion de componente*/
export default function Buttom({
    variant = "primary",    //Define el estilo visual
    size = "md",
    type = "button",
    children,       //Contenido que tiene el boton
    ...props
}) {
    const variants = {
        primary : "border border-border-strong bg-primarybtnbg text-primarybtntext font-body font-heading text-small hover:bg-primarybtnhoverbg hover:text-label hover:border-1",
        secondary : "border border-border-strong bg-secondarybtnbg text-secondarybtntext font-secondary font-heading text-small hover:bg-secondarybtnhoverbg hover:text-primarybtntext",
}

        const sizes = {
            sm :
                `
                h-9 px-3
                before:absolute before:content-['']
                before:-inset-y-[4px] before:-inset-x-[0px]
                `,
            md :
                            `
                h-10 px-4
                before:absolute before:content-['']
                before:-inset-y-[4px] before:-inset-x-[0px]
                `,
        }


        return (

            <button
                type={type}
                className={
            `   relative
                inline-flex items-center justify-center
                rounded-4xl
                transition-colors
                ${variants[variant]}
                ${sizes[size]}
                `}
                {...props}
            >
            {children}




            </button>
        )
};