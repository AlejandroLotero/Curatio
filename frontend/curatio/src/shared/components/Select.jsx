export default function Select({
    label,
    name,
    options = [],
    extraOptions = [],
    placeholder = "Seleccionar...",
    value,
    onChange,
    wrapperClassName,
    selectClassName,
}) {
    const getOptValue = (opt) => opt.id ?? opt.value;
    const getOptLabel = (opt) => opt.label ?? opt.id ?? opt.value;

    return (
        <div className={wrapperClassName ?? "w-full"}>
            {label && (
                <label className="block mb-1 text-mostsmall text-label font-weight font-body font-heading">
                    {label}
                </label>
            )}

            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`
                    w-full h-12 rounded-md border border-border-strong px-4
                    text-label font-body font-heading text-small
                    focus:outline-none focus:ring-1 focus:ring-border focus:border-border
                    ${selectClassName ?? ""}
                `}
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={getOptValue(opt)} value={getOptValue(opt)}>
                        {getOptLabel(opt)}
                    </option>
                ))}
                {extraOptions.map((opt) => (
                    <option key={getOptValue(opt)} value={getOptValue(opt)}>
                        {getOptLabel(opt)}
                    </option>
                ))}
            </select>
        </div>
    );
}

