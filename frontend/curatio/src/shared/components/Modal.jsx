export default function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        {title && (
          <h2 
            className="text-2xl font-bold text-center mb-6"
            style={{ color: "var(--semantic-text-primary)" }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
