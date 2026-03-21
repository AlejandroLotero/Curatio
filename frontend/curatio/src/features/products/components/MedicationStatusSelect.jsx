import { useState } from "react";

export default function MedicationStatusSelect({
  value = "",
  options = [],
  onChange,
  disabled = false,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = async (e) => {
    const nextValue = e.target.value;

    try {
      setIsSaving(true);
      await onChange?.(nextValue);
    } catch (error) {
      console.error("Error updating medication status:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled || isSaving}
      className="
        min-w-[140px]
        rounded-md
        border
        border-border-strong
        bg-white/80
        px-2
        py-1
        text-black
        text-sm
        focus:outline-none
        focus:ring-1
        focus:ring-border
        disabled:opacity-60
      "
    >
      <option value="" disabled>
        Estado
      </option>
      {options.map((option) => (
        <option key={option.id} value={String(option.id)}>
          {option.label}
        </option>
      ))}
    </select>
  );
}