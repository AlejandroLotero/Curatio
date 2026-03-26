import { useState } from "react";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";

const roleOptions = [
  { id: "administrador", label: "Administrador" },
  { id: "farmaceutica", label: "Farmacéuta" },
  { id: "cliente", label: "Cliente" },
  { id: "invitado", label: "Invitado" },
  { id: "agregar_rol", label: "Agregar rol" },
];

export default function RoleForm({ onRoleCreated, selectedPermissions = {}, selectedCount = 0 }) {
  const [formData, setFormData] = useState({
    selectedGroup: "",
    documentId: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.selectedGroup) {
      newErrors.selectedGroup = "El grupo es requerido";
    }
    if (!formData.documentId.trim()) {
      newErrors.documentId = "El documento es requerido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateRole = () => {
    if (!formData.selectedGroup) {
      setShowErrorModal(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Asignar permisos directamente
    const roleData = {
      group: formData.selectedGroup,
      documentId: formData.documentId,
      permissions: selectedPermissions,
      permissionsCount: selectedCount,
      createdAt: new Date().toISOString(),
    };

    setShowSuccessModal(true);
    if (onRoleCreated) {
      onRoleCreated(roleData);
    }

    setTimeout(() => {
      setShowSuccessModal(false);
      resetForm();
    }, 2000);
  };



  const resetForm = () => {
    setFormData({
      selectedGroup: "",
      documentId: "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-semibold text-label">Asignar Permisos</h3>
        
        <Select
          label="Grupos"
          name="selectedGroup"
          options={roleOptions}
          value={formData.selectedGroup}
          onChange={handleInputChange}
          placeholder="Selecciona una opción"
          wrapperClassName="w-full"
        />

        <Input
          label="Buscar por usuario"
          name="documentId"
          type="text"
          placeholder="Número de documento"
          value={formData.documentId}
          onChange={handleInputChange}
          wrapperClassName="w-full"
        />

        {/* Mostrar resumen de permisos seleccionados */}
        <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
          <h4 className="font-medium text-label mb-2">Permisos a asignar</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedCount > 0
              ? `${selectedCount} permiso${selectedCount !== 1 ? 's' : ''} seleccionado${selectedCount !== 1 ? 's' : ''}`
              : 'Ningún permiso seleccionado'
            }
          </p>
          {selectedCount === 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              ⚠️ Selecciona al menos un permiso antes de asignar
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            variant="secondary"
            size="md"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleCreateRole}
            disabled={selectedCount === 0}
          >
            Asignar permisos
          </Button>
        </div>
      </div>



      {showSuccessModal && (
        <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
          <div className="flex flex-col items-center justify-center p-10 text-center min-w-[300px]">
            <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-label">Rol creado exitosamente</p>
          </div>
        </Modal>
      )}

      {showErrorModal && (
        <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
          <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-label">No se ha seleccionado ningún grupo</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Por favor selecciona un grupo antes de asignar permisos.
            </p>
            <Button variant="primary" size="md" onClick={() => setShowErrorModal(false)}>
              Entendido
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
