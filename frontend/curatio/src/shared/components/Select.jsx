export default function Select({ label, name, options = [] }) {
  return (
    <div className="w-[320px]">
      {/* label si es label tiene contenido es (thurty)true, si no, es false(falsy) y no muestra el label */}
      {label && (
        <label
          className="
                block
                     mb-1
                     text-label
                     font-body
                     font-heading
                     text-mostsmall"
        >
          {label}
        </label>
      )}

      <select
        name={name}
        className="
                w-full
                h-12
                rounded-md
                border
                border-border
                px-4
                                
                "
      >
        <option value="">Seleccione</option>

        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
