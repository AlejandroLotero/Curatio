export default function Button({
    variant = "primary",  //Define el estilo visual
    size = "md",
    type = "button",
    children,   //Es el contenido que tiene el boton
    ...props 

}) {

    const variants = {
        primary : "bg-brand text-inverse hover:brand-hover",
        secondary: "border border-border bg-brand-surface text-text-primary hover:brand-soft"
    }

    const sizes = {
        /*small*/
     sm:
     
        // "h-9 px-4 before: absolute",
        `h-9 
        px-3 
        before: absolute before:content-['']
        before: inset-y-[4px] before:inset-x-[0px]
        
        `,



/*mediana */
     md: 

     `
     h-10 
     px-4 
     before: absolute before:content-['']
     before: inset-y-[4px] before:inset-x-[0px]
     
     
     `
    }

    return (
      <button
        type={type}
        className={`
                relative
                inline-flex items-center justify-center
                rounded-md
                transition-colors
                ${variants[variant]}
                ${sizes[size]}
            
            `}
        {...props}
      >
        {children}
      </button>
    );

};