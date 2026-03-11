// Servicio para manejar los datos de selects
export const selectDataService = {
  // Obtener todos los datos de selects
  getAllSelectsData: () => {
    return {
      pharmaceuticalForms: JSON.parse(localStorage.getItem("pharmaceuticalForms") || "[]"),
      presentations: JSON.parse(localStorage.getItem("presentations") || "[]"),
      administrationRoutes: JSON.parse(localStorage.getItem("administrationRoutes") || "[]"),
      laboratories: JSON.parse(localStorage.getItem("laboratories") || "[]"),
      suppliers: JSON.parse(localStorage.getItem("suppliers") || "[]"),
      statusOptions: JSON.parse(localStorage.getItem("statusOptions") || "[]"),
    };
  },

  // Exportar datos como JSON
  exportToJSON: () => {
    const data = selectDataService.getAllSelectsData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `selects-data-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  // Importar datos desde JSON
  importFromJSON: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          // Guardar en localStorage
          localStorage.setItem("pharmaceuticalForms", JSON.stringify(data.pharmaceuticalForms || []));
          localStorage.setItem("presentations", JSON.stringify(data.presentations || []));
          localStorage.setItem("administrationRoutes", JSON.stringify(data.administrationRoutes || []));
          localStorage.setItem("laboratories", JSON.stringify(data.laboratories || []));
          localStorage.setItem("suppliers", JSON.stringify(data.suppliers || []));
          localStorage.setItem("statusOptions", JSON.stringify(data.statusOptions || []));
          resolve(data);
        } catch (error) {
          reject(new Error("Error al importar los datos: " + error.message));
        }
      };
      reader.onerror = () => reject(new Error("Error al leer el archivo"));
      reader.readAsText(file);
    });
  },

  // Limpiar todos los datos
  clearAllData: () => {
    localStorage.removeItem("pharmaceuticalForms");
    localStorage.removeItem("presentations");
    localStorage.removeItem("administrationRoutes");
    localStorage.removeItem("laboratories");
    localStorage.removeItem("suppliers");
    localStorage.removeItem("statusOptions");
  },
};
