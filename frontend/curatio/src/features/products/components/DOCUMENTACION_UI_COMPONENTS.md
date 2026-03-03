# Documentación de Componentes UI - Curatio

## 📋 Tabla de Contenidos
1. [Toast (Notificaciones)](#toast-notificaciones)
2. [Modal](#modal)
3. [Variables Reutilizables](#variables-reutilizables)
4. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🔔 Toast (Notificaciones)

### Ubicación
`src/shared/components/Toast.jsx`

### Descripción
Componente de notificación que se auto-cierra después de 3 segundos. Muestra un mensaje con un ícono de verificación (Check) de Lucide React en color verde (#14AE5C).

### Props
| Prop | Tipo | Descripción | Requerido |
|------|------|-------------|-----------|
| `isVisible` | boolean | Define si el toast es visible | ✅ |
| `message` | string | Texto del mensaje a mostrar | ✅ |
| `onClose` | function | Callback que se ejecuta al cerrarse | ✅ |

### Características
- ✅ Auto-cierre después de 3000ms
- ✅ Ícono Check verde (#14AE5C)
- ✅ Posicionamiento fijo en la esquina superior derecha
- ✅ Animación de fade out suave
- ✅ Tailwind CSS + estilos personalizados

### Estado en Componente
```jsx
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState("");
```

---

## 🎯 Modal

### Ubicación
`src/shared/components/Modal.jsx`

### Descripción
Componente modal reutilizable con backdrop oscuro y contenedor centrado. Puede contener cualquier contenido JSX.

### Props
| Prop | Tipo | Descripción | Requerido |
|------|------|-------------|-----------|
| `isOpen` | boolean | Define si el modal está abierto | ✅ |
| `onClose` | function | Callback para cerrar el modal | ✅ |
| `title` | string | Título que aparece en el modal | ✅ |
| `children` | ReactNode | Contenido del modal | ✅ |

### Características
- ✅ Backdrop con blur effect
- ✅ Posicionamiento fijo centrado
- ✅ Z-index elevado (z-50)
- ✅ Animación suave

### Estado en Componente
```jsx
const [openModals, setOpenModals] = useState({
  form: false,
  presentation: false,
  route: false,
  laboratory: false,
  supplier: false,
  status: false,
});

const toggleModal = (modalKey) => {
  setOpenModals((prev) => ({
    ...prev,
    [modalKey]: !prev[modalKey],
  }));
};
```

---

## 🔧 Variables Reutilizables

### 1. Estado para Notificaciones
```jsx
// En el componente principal
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState("success"); // "success", "error", "info"
```

### 2. Estado para Modales
```jsx
// Patrón simple (un campo por tipo)
const [openModals, setOpenModals] = useState({
  form: false,
  presentation: false,
  route: false,
  laboratory: false,
  supplier: false,
  status: false,
});

// Funciones auxiliares
const toggleModal = (modalKey) => {
  setOpenModals((prev) => ({
    ...prev,
    [modalKey]: !prev[modalKey],
  }));
};

const openModal = (modalKey) => {
  setOpenModals((prev) => ({
    ...prev,
    [modalKey]: true,
  }));
};

const closeModal = (modalKey) => {
  setOpenModals((prev) => ({
    ...prev,
    [modalKey]: false,
  }));
};
```

### 3. Función para Mostrar Toast
```jsx
const showSuccessToast = (message) => {
  setToastMessage(message);
  setToastType("success");
  setShowToast(true);
};

const showErrorToast = (message) => {
  setToastMessage(message);
  setToastType("error");
  setShowToast(true);
};

const showInfoToast = (message) => {
  setToastMessage(message);
  setToastType("info");
  setShowToast(true);
};
```

### 4. Colores Estándar
```jsx
// Variables de color disponibles en tokens.css
const colors = {
  success: "#14AE5C",      // Verde éxito
  error: "#FF4444",        // Rojo error
  info: "#767EDE",         // Azul primario
  warning: "#FFA500",      // Naranja warning
  primary: "var(--color-primary-500)",
  primary50: "var(--color-primary-50)",
  primary100: "var(--color-primary-100)",
  primary300: "var(--color-primary-300)",
};
```

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Crear Notificación de Éxito
```jsx
const handleAddItem = (newItem) => {
  const updated = [...items, newItem];
  setItems(updated);
  localStorage.setItem("items", JSON.stringify(updated));
  
  // Mostrar notificación
  setToastMessage(`"${newItem.label}" creado correctamente`);
  setShowToast(true);
};
```

### Ejemplo 2: Abrir Modal desde Botón
```jsx
<button
  onClick={() => toggleModal("form")}
  className="px-4 py-2 rounded-lg"
  style={{ backgroundColor: "var(--color-primary-500)" }}
>
  Agregar Nueva Forma
</button>
```

### Ejemplo 3: Renderizar Toast en Componente
```jsx
// En el JSX del componente
<Toast
  isVisible={showToast}
  message={toastMessage}
  onClose={() => setShowToast(false)}
/>
```

### Ejemplo 4: Renderizar Modal en Componente
```jsx
// En el JSX del componente
<CreatePharmaceuticalFormForm
  isOpen={openModals.form}
  onClose={() => toggleModal("form")}
  onAdd={handleAddPharmaceuticalForm}
/>
```

### Ejemplo 5: Modal Personalizado Completo
```jsx
<Modal 
  isOpen={openModals.customModal} 
  onClose={() => toggleModal("customModal")}
  title="TÍTULO DEL MODAL PERSONALIZADO"
>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Contenido aquí */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Tu Label
      </label>
      <input
        type="text"
        placeholder="Tu placeholder"
        className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        style={{
          borderWidth: "2px",
          borderColor: "var(--color-primary-300)",
          backgroundColor: "var(--color-primary-50)",
        }}
      />
    </div>
    
    <div className="flex gap-4 justify-center">
      <button
        type="button"
        onClick={() => toggleModal("customModal")}
        className="px-8 py-2 rounded-full font-semibold"
        style={{
          backgroundColor: "var(--color-gray-100)",
          color: "var(--semantic-text-primary)",
        }}
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="px-8 py-2 rounded-full font-semibold"
        style={{
          backgroundColor: "var(--color-button-primary-bg)",
          color: "var(--semantic-text-button-primary)",
        }}
      >
        Guardar
      </button>
    </div>
  </form>
</Modal>
```

---

## 🎨 Estilos Consistentes

### Input/Select con Focus
```jsx
className="w-full h-12 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
style={{
  borderWidth: "2px",
  borderColor: "var(--color-primary-300)",
  backgroundColor: "var(--color-primary-50)"
}}
```

### Botón Primario
```jsx
className="px-8 py-2 rounded-full font-semibold hover:opacity-90 transition"
style={{
  backgroundColor: "var(--color-button-primary-bg)",
  color: "var(--semantic-text-button-primary)",
}}
```

### Botón Secundario
```jsx
className="px-8 py-2 rounded-full font-semibold hover:opacity-80 transition"
style={{
  backgroundColor: "var(--color-gray-100)",
  color: "var(--semantic-text-primary)",
}}
```

---

## 📚 Archivos Relacionados
- Components: `src/shared/components/Toast.jsx`, `src/shared/components/Modal.jsx`
- Estilos: `src/styles/tokens.css`, `src/styles/semantic.css`
- Ejemplos: `src/features/products/Medform.jsx`

---

## 🔄 Flujo Típico de Creación

1. **Usuario abre modal**: Click en botón "Agregar..."
2. **Modal se renderiza**: Contiene un formulario
3. **Usuario ingresa datos**: Completa el formulario
4. **Usuario envía**: Click en "Guardar"
5. **Componente procesa**: Valida y guarda datos
6. **Toast aparece**: Muestra mensaje de éxito
7. **Modal se cierra**: Automáticamente después de 1.5s

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  if (formData.name.trim()) {
    onAdd({
      value: formData.name.toLowerCase().replace(/\s+/g, "_"),
      label: formData.name,
    });
    setFormData({ name: "", description: "" });
    setShowToast(true); // ← Toast aparece
    setTimeout(() => {
      onClose(); // ← Modal se cierra
    }, 1500);
  }
};
```

---

**Última actualización**: 03/03/2026
**Versión**: 1.0
** Sergisoft S.A 2026