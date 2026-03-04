export default function Select({
    label,
    name,
    options = [],
    placeholder,
    wrapperClassName,
}) {
    return (
        <div className={wrapperClassName ?? "w-[320px]"}>
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
              className="w-full h-10 rounded-lg border px-4 focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-primary-300)",
                color: "var(--semantic-text-primary)",
                fontFamily: "var(--font-body)",
                backgroundColor: "white",
              }}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
        </div>
    );
};

