# Gestión de Permisos

Esta feature proporciona una interfaz completa para la gestión de roles y sus permisos asociados en la aplicación Curatio.

## Estructura

```
permissions/
├── pages/
│   └── PermissionsManagementPage.jsx    → Página principal
├── components/
│   ├── RoleForm.jsx                     → Formulario para crear roles
│   └── PermissionsGrid.jsx              → Grilla de permisos modulares
└── services/
    └── permissionsService.js            → Servicios de permisos
```

## Componentes

### PermissionsManagementPage
Página principal que combina la creación de roles con la gestión de permisos.

**Ruta:** `/permissions`

**Características:**
- Carga de módulos y permisos
- Layout responsivo (2 columnas en desktop, 1 en mobile)
- Diseño con gradiente y tema oscuro

### RoleForm
Formulario para crear nuevos roles.

**Props:**
- `onRoleCreated` (function): Callback cuando se crea un rol exitosamente

**Características:**
- Validación de formulario
- Diálogo de confirmación
- Modal de éxito con animación

### PermissionsGrid
Componente para visualizar y seleccionar permisos organizados por módulos.

**Props:**
- `modules` (array): Array de módulos con sus permisos

**Características:**
- Selección individual de permisos
- Selección masiva por módulo
- Estado parcialmente seleccionado
- Scroll vertical con altura máxima

## Módulos de Permisos

Los módulos disponibles son:

1. **Gestión de usuarios**
   - Crear usuarios
   - Actualizar usuarios
   - Listar usuarios
   - Activar/Desactivar usuarios

2. **Gestión de medicamentos**
   - Crear medicamentos
   - Actualizar medicamentos
   - Visualizar medicamentos
   - Activar/Desactivar medicamentos

3. **Gestión de proveedores**
   - Crear proveedores
   - Actualizar proveedores
   - Listar proveedores
   - Activar/Desactivar proveedores

4. **Gestión de ventas**
   - Ejecutar ventas
   - Buscar facturas
   - Modificar facturas
   - Eliminar facturas

5. **Gestión del carrito de compras**
   - Crear carrito de compras
   - Listar carrito de compras
   - Actualizar carrito de compras
   - Eliminar carrito de compras

## Datos

Los permisos se definen en `/src/data/selects/permissions.json` con la siguiente estructura:

```json
{
  "modules": [
    {
      "id": "usuarios",
      "name": "Gestión de usuarios",
      "permissions": [
        {
          "id": "usuarios.crear",
          "label": "Crear usuarios"
        }
      ]
    }
  ]
}
```

## Componentes Reutilizados

- **Input** - Campos de entrada de texto
- **Button** - Botones con variantes (primary/secondary)
- **Modal** - Diálogo modal para confirmaciones y mensajes
- **ConfirmDialog** - Diálogo de confirmación específico

## Uso

```jsx
import { PermissionsManagementPage } from "@/features/permissions";

// En el router
{
  path: "permissions",
  element: <PermissionsManagementPage />
}
```

## Extensiones Futuras

- Integración con backend para persistir roles y permisos
- Búsqueda y filtrado de permisos
- Edición de roles existentes
- Historial de cambios de permisos
- Importación/exportación de permisos
- Asignación de roles a usuarios
