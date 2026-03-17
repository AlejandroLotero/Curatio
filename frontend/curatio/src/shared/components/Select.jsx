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
                <label
                    className="block
                              mb-1
                              text-label
                              font-body
                              font-heading
                              font-weight
                              text-mostsmall
                              "
                >
                    {label}
                </label>
            )}

            <div
                className="
                    relative
                    h-12
                    flex
                    items-center
                "
            >
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`
                        relative
                        w-full
                        h-10
                        rounded-md
                        border
                        border-border-strong
                        px-4
                        text-label
                        font-body
                        font-heading
                        text-small
                        focus:outline-none
                        focus:ring-1
                        focus:ring-border
                        focus:border-border
                        hover:bg-surface/50
                        cursor-pointer
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
        </div>
    );
}

