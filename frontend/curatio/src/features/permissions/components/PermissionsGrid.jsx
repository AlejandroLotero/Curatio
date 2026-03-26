import React from "react";

export default function PermissionsGrid({
  modules = [],
  selectedPermissions = {},
  onPermissionChange,
  onModuleSelectAll
}) {

  const handlePermissionChange = (permissionId) => {
    if (onPermissionChange) {
      onPermissionChange(permissionId);
    }
  };

  const handleModuleSelectAll = (module) => {
    if (onModuleSelectAll) {
      onModuleSelectAll(module);
    }
  };

  const isModuleFullySelected = (module) => {
    return module.permissions.every((perm) => selectedPermissions[perm.id]);
  };

  const isModulePartiallySelected = (module) => {
    return (
      module.permissions.some((perm) => selectedPermissions[perm.id]) &&
      !isModuleFullySelected(module)
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-label">Permisos</h3>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {modules.map((module) => (
          <div
            key={module.id}
            className="border border-border rounded-lg p-4 bg-white/50 dark:bg-neutral-800/50"
          >
            <div className="flex items-start gap-3 mb-3">
              <input
                type="checkbox"
                id={`module-${module.id}`}
                checked={isModuleFullySelected(module)}
                indeterminate={isModulePartiallySelected(module)}
                onChange={() => handleModuleSelectAll(module)}
                className="size-4 rounded border-border bg-transparent accent-primary mt-1 cursor-pointer"
              />
              <label
                htmlFor={`module-${module.id}`}
                className="font-medium text-label cursor-pointer flex-1"
              >
                {module.name}
              </label>
            </div>

            <div className="ml-7 space-y-2">
              {module.permissions.map((permission) => (
                <div key={permission.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={permission.id}
                    checked={selectedPermissions[permission.id] || false}
                    onChange={() => handlePermissionChange(permission.id)}
                    className="size-4 rounded border-border bg-transparent accent-primary cursor-pointer"
                  />
                  <label htmlFor={permission.id} className="text-sm text-label cursor-pointer">
                    {permission.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
