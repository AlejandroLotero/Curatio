export default function Select({
    label,
    name,
    options = [],
    placeholder,
}) {
    return (
        <div className="w-[320px]">
            {/*Si el label tiene contenido es igual a truthy si no es falsy  */}
            { label && (
            <label className="
            block
            mb-1
            text-mostsmall
            text-label
            font-weight
            font-body
            font-heading
            ">
                {label}
            </label>
            )}

            <select
            name={name}
            className="
                w-full
                h-8
                rounded-md
                border
                border-strong
                text-center
            ">


                <option value="">{placeholder}</option>

                {options.map((option) =>  (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>            
        </div>


    );
};

