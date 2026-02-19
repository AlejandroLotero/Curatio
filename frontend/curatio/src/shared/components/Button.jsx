export default function Button({
    variant = "primary",  //Define el estilo visual
    size = "md",
    type = "button",
    children,   //Es el contenido que tiene el boton
    ...props 

}) {

    const variants = {
        primary : `
        bg-[var(--color-button-primary-bg)]
        text-[var(--color-text-inverse)]
        border
        border-[var(--color-button-primary-border)]
        hover:bg-[var(--color-brand-hover)]
      `,
        secondary:`
        bg-[var(--color-button-secondary-bg)]
        text-[var(--color-text-primary)]
        border
        border-[var(--color-button-secondary-border)]
        hover:bg-[var(--color-surface-muted)]
        `,
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
                rounded-full
                transition-colors
                font-medium
                ${variants[variant]}
                ${sizes[size]}
            
            `}
        {...props}
      >
        {children}
      </button>
    );

};