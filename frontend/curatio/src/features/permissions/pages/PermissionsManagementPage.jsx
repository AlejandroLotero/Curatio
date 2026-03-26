import { useEffect, useState } from "react";
import RoleForm from "../components/RoleForm";
import PermissionsGrid from "../components/PermissionsGrid";
import { getPermissions } from "../services/permissionsService";
import bgAll from "@/assets/images/bgAll.jpg";

export default function PermissionsManagementPage() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState({});

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        const data = await getPermissions();
        setModules(data.modules);

        // Inicializar estado de permisos seleccionados
        const initial = {};
        data.modules.forEach((module) => {
          module.permissions.forEach((perm) => {
            initial[perm.id] = false;
          });
        });
        setSelectedPermissions(initial);
      } catch (error) {
        console.error("Error loading permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, []);

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permissionId]: !prev[permissionId],
    }));
  };

  const handleModuleSelectAll = (module) => {
    const allSelected = module.permissions.every(
      (perm) => selectedPermissions[perm.id]
    );
    const newState = { ...selectedPermissions };
    module.permissions.forEach((perm) => {
      newState[perm.id] = !allSelected;
    });
    setSelectedPermissions(newState);
  };

  const handleRoleCreated = (roleData) => {
    console.log("Permisos asignados:", roleData);
    console.log("Permisos seleccionados:", selectedPermissions);

    // Aquí podrías hacer una llamada a API para asignar permisos al usuario
    // Por ahora solo mostramos en consola
  };

  const getSelectedPermissionsCount = () => {
    return Object.values(selectedPermissions).filter(Boolean).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-label">Cargando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgAll})` }}
    >
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-label mb-2">GESTIÓN DE PERMISOS</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Asigna permisos a usuarios según su grupo
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección CREAR ROL */}
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-label mb-6">ASIGNAR PERMISOS</h2>
            <RoleForm
              onRoleCreated={handleRoleCreated}
              selectedPermissions={selectedPermissions}
              selectedCount={getSelectedPermissionsCount()}
            />
          </div>

          {/* Sección GESTIONAR PERMISOS */}
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg">
            <PermissionsGrid
              modules={modules}
              selectedPermissions={selectedPermissions}
              onPermissionChange={handlePermissionChange}
              onModuleSelectAll={handleModuleSelectAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
