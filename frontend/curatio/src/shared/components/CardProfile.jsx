const Card = ({
    product,
    hidePrice = false,
    className = "",
    imageClassName,
    /** Solo imagen: sin título ni pie; toda la card es el marco de la foto. */
    imageOnly = false,
    /** Texto alternativo cuando no hay título en product (p. ej. modo imageOnly). */
    alt,
}) => {
    const { title, image, price, description } = product;

    const imgClasses =
        imageClassName ??
        "w-full h-48 object-contain bg-black/10 dark:bg-black/20";

    const imageAlt = alt ?? title ?? "Imagen de perfil";

    const shellClass = `
            w-full max-w-sm
            text-text-inverse
            dark:bg-neutral-950/70
            backdrop-blur-[2px]
            shadow-lg
            rounded-2xl
            overflow-hidden
            hover:shadow-black
            transition-shadow
            duration-700
            ${className}
        `;

    if (imageOnly) {
        return (
            <div className={shellClass}>
                <img src={image} alt={imageAlt} className={imgClasses} />
            </div>
        );
    }

    return (
        <div className={shellClass}>
            <img src={image} alt={imageAlt} className={imgClasses} />

            <div className="p-5 space-y-3">
                <h2 className="text-xl font-semibold">{title}</h2>

                <p className="text-sm">{description}</p>

                {!hidePrice && (
                    <p className="text-lg font-bold text-cyan-200">
                        ${price.toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Card;