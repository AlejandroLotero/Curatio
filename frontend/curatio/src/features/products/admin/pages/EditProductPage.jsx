import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import ProductFileInput from "@/features/products/components/ProductFileInput";
import { listProducts } from "@/data/product/listProducts";
import "../../../../styles/tokens.css";
import "../../../../styles/semantic.css";

export default function EditProductPage() {
  // Obtiene el ID del producto desde la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados del componente
  const [medicamento, setMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  // Carga el medicamento cuando cambia el ID
  useEffect(() => {
    cargarMedicamento();
  }, [id]);

  // Busca el medicamento en la lista por ID y carga sus datos en el formulario
  const cargarMedicamento = () => {
    try {
      const med = listProducts.find((m) => m.id == id);
      if (med) {
        setMedicamento(med);
        setFormData(med);
      } else {
        setMedicamento(null);
      }
    } catch (error) {
      console.error("Error cargando medicamento:", error);
    } finally {
      setLoading(false);
    }
  };

  // Actualiza los datos del formulario cuando el usuario modifica un campo
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Guarda la URL de la imagen cargada en el estado
  const handleImageUpload = (url) => {
    setImageUrl(url);
    setFormData({
      ...formData,
      image: url,
    });
  };

  // Procesa la confirmacion de edicion del producto
  const handleConfirmEdit = () => {
    console.log("Producto actualizado:", formData);
    setIsConfirmModalOpen(false);
    // Aquí irá la lógica de API para guardar cambios
    setTimeout(() => {
      navigate("/products/listar");
    }, 500);
  };

  // Componente reutilizable para renderizar campos editables del formulario
  const EditField = ({ label, value, name, type = "text" }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-label" style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleInputChange}
        className="p-3 rounded-lg bg-white/80 text-label border border-gray-300"
        style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
      />
    </div>
  );

  // Muestra pantalla de carga mientras se obtienen los datos
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-label">Cargando...</p>
      </div>
    );
  }

  // Muestra mensaje si el producto no existe
  if (!medicamento) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-label mb-4">Producto no encontrado</p>
          <Link to="/products/listar">
            <Button variant="primary" size="sm">
              Volver a productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="relative flex items-center justify-center min-h-screen text-label px-4 py-6 sm:px-6 sm:py-8 w-full min-w-0 overflow-x-hidden">
        <div
          className="
            w-full max-w-5xl
            min-w-0
            px-4 py-8 sm:px-6 sm:py-12
            flex flex-col gap-6
            bg-white/30
            backdrop-blur-md
            border
            rounded-lg
            shadow-xl
            ring-1
          "
          style={{
            borderColor: "var(--color-primary-200)",
          }}
        >
          <h2
            className="
              text-center
              text-4xl
              font-bold
              text-label
              wrap-break-word
            "
            style={{ color: "var(--color-black)", fontFamily: "var(--font-body)" }}
          >
            EDITAR PRODUCTO
          </h2>
            {/* responsivo para tablets y celulares */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <EditField label="ID" name="id" value={formData.id} />
            <EditField label="Medicamento" name="nameproduct" value={formData.nameproduct} />
            <EditField label="Forma Farmacéutica" name="formaFarmaceutica" value={formData.formaFarmaceutica} />
            <EditField label="Presentación" name="presentacion" value={formData.presentacion} />
            <EditField label="Concentración" name="concentration" value={formData.concentration} />
            <EditField label="Descripción" name="descripcion" value={formData.descripcion} />
            <EditField label="Vía de Administración" name="administration_guide" value={formData.administration_guide} />
            <EditField label="Laboratorio" name="laboratory" value={formData.laboratory} />
            <EditField label="Lote" name="lote" value={formData.lote} />
            <EditField label="Fecha de Fabricación" name="fechaFabricacion" value={formData.fechaFabricacion} />
            <EditField label="Fecha de Vencimiento" name="fechaVencimiento" value={formData.fechaVencimiento} />
            <EditField label="Stock" name="stock" value={formData.stock} type="number" />
            <EditField label="Precio de Compra" name="precioCompra" value={formData.precioCompra} type="number" />
            <EditField label="Precio de Venta" name="precioVenta" value={formData.precioVenta} type="number" />
            <EditField label="Proveedor" name="proveedor" value={formData.proveedor} />
            <EditField label="Estado" name="state" value={formData.state} />
          </div>

          {/* FileInput para imagen */}
          <div className="col-span-full mt-3">
            <ProductFileInput
              label="Imagen del Medicamento"
              onUpload={handleImageUpload}
            />
          </div>

          {/* Botones */}
          <div className="col-span-full flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 w-full max-w-full mx-auto mt-6 min-w-0">
            <Link to="/products/listar">
              <Button variant="secondary" size="sm" type="button">
                Volver
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Editar Producto
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirmar edición"
        message="¿Está seguro que desea guardar los cambios al medicamento?"
      >
        <div className="flex gap-4 justify-center">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Volver
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            onClick={handleConfirmEdit}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
