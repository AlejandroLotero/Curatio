import { Trash2 } from "lucide-react";

export default function SelectItemsList({ items, onDelete, title }) {
  if (!items || items.length === 0) {
    return (
      <div 
        className="p-4 rounded-lg text-center"
        style={{
          backgroundColor: "var(--color-primary-50)",
          borderWidth: "2px",
          borderColor: "var(--color-primary-300)",
          borderStyle: "dashed",
        }}
      >
        <p 
          className="text-sm"
          style={{ color: "var(--semantic-text-label)" }}
        >
          Sin {title.toLowerCase()} registradas aún
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={item.value}
          className="flex items-center gap-2 px-3 py-2 rounded-full"
          style={{
            backgroundColor: "var(--color-primary-100)",
            borderWidth: "1px",
            borderColor: "var(--color-primary-300)",
          }}
        >
          <button
            onClick={() => onDelete(item.value)}
            className="p-1 rounded-full hover:opacity-70 transition"
            style={{ 
              backgroundColor: "rgba(255, 68, 68, 0.2)",
              color: "#FF4444",
            }}
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
          <span 
            className="text-sm font-medium"
            style={{ color: "var(--semantic-text-primary)" }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
