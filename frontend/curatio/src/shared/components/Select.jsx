export default function Select({
    label,
    name,
    options = [],
    placeholder,
}) {
    return (
        <div className="w-[320px]">
            {label && (
              <label 
                className="block mb-1 text-sm font-semibold"
                style={{
                  color: "var(--semantic-text-label)",
                  fontFamily: "var(--font-body)",
                }}
              >
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

