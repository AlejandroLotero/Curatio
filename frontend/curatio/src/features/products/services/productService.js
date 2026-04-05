/**
 * productService.js
 * -----------------
 * Servicios de negocio para el módulo de productos/medicamentos.
 *
 * Actúa como intermediario entre:
 * - API backend (lib/http/products.js)
 * - Adaptadores de datos (lib/adapters/productAdapter.js)
 * - Componentes React
 *
 * Maneja:
 * - Obtención de productos (listado, detalle)
 * - Creación/edición de productos
 * - Cambios de estado
 * - Validaciones de negocio
 */

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct,
} from "@/lib/http/products";
import {
  adaptProductToListItem,
  adaptProductDetail,
  adaptProductPayloadFromForm,
  getSafeProductInfo,
} from "@/lib/adapters/productAdapter";

/**
 * Obtiene listado de productos con paginación y filtros.
 * @param {Object} params - Parámetros de búsqueda y filtrado
 * @returns {Promise<Object>} {results, pagination, filters}
 */
export async function fetchProducts(params = {}) {
  try {
    const response = await getProducts(params);

    return {
      results: (response.data.results ?? []).map(adaptProductToListItem),
      pagination: response.data.pagination ?? {},
      filters: response.data.filters ?? {},
    };
  } catch (error) {
    throw {
      code: "FETCH_PRODUCTS_ERROR",
      message: "Error al obtener productos.",
      originalError: error,
    };
  }
}

/**
 * Obtiene el detalle completo de un producto.
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} Producto adaptado con toda su información
 */
export async function fetchProductDetail(id) {
  try {
    const response = await getProductById(id);

    return adaptProductDetail(response.data.medication || response.data);
  } catch (error) {
    throw {
      code: "FETCH_PRODUCT_ERROR",
      message: `Error al obtener el producto ${id}.`,
      originalError: error,
    };
  }
}

/**
 * Crea un nuevo producto.
 * @param {Object} formData - Datos del formulario (nombres en camelCase)
 * @returns {Promise<Object>} Producto creado adaptado
 */
export async function createNewProduct(formData) {
  try {
    // Adaptar datos del formulario al formato del backend
    const payload = adaptProductPayloadFromForm(formData);

    // Enviar al backend
    const response = await createProduct(payload);

    // Retornar producto adaptado
    return adaptProductDetail(response.data.medication || response.data);
  } catch (error) {
    throw {
      code: "CREATE_PRODUCT_ERROR",
      message: "Error al crear el producto.",
      fields: error.error?.fields ?? {},
      originalError: error,
    };
  }
}

/**
 * Actualiza un producto existente.
 * @param {number} id - ID del producto
 * @param {Object} formData - Datos actualizados (nombres en camelCase)
 * @returns {Promise<Object>} Producto actualizado adaptado
 */
export async function updateExistingProduct(id, formData) {
  try {
    // Adaptar datos del formulario
    const payload = adaptProductPayloadFromForm(formData);

    // Enviar al backend
    const response = await updateProduct(id, payload);

    // Retornar producto adaptado
    return adaptProductDetail(response.data.medication || response.data);
  } catch (error) {
    throw {
      code: "UPDATE_PRODUCT_ERROR",
      message: "Error al actualizar el producto.",
      fields: error.error?.fields ?? {},
      originalError: error,
    };
  }
}

/**
 * Cambia el estado de un producto.
 * @param {number} id - ID del producto
 * @param {number} statusId - ID del nuevo estado
 * @returns {Promise<Object>} Producto con estado actualizado
 */
export async function changeProductStatus(id, statusId) {
  try {
    const response = await updateProductStatus(id, statusId);

    return adaptProductDetail(response.data.medication || response.data);
  } catch (error) {
    throw {
      code: "UPDATE_STATUS_ERROR",
      message: "Error al cambiar el estado del producto.",
      originalError: error,
    };
  }
}

/**
 * Elimina un producto existente.
 * @param {number} id - ID del producto
 * @returns {Promise<void>}
 */
export async function deleteExistingProduct(id) {
  try {
    await deleteProduct(id);
  } catch (error) {
    throw {
      code: "DELETE_PRODUCT_ERROR",
      message: "Error al eliminar el producto.",
      originalError: error,
    };
  }
}

/**
 * Busca productos por término de búsqueda.
 * @param {string} searchTerm - Término a buscar
 * @param {number} page - Página (default: 1)
 * @returns {Promise<Object>} Productos encontrados
 */
export async function searchProducts(searchTerm, page = 1) {
  return fetchProducts({
    search: searchTerm,
    page,
  });
}

/**
 * Obtiene productos filtrados por laboratorio.
 * @param {number} laboratoryId - ID del laboratorio
 * @param {number} page - Página (default: 1)
 * @returns {Promise<Object>} Productos del laboratorio
 */
export async function getProductsByLaboratory(laboratoryId, page = 1) {
  return fetchProducts({
    laboratory: laboratoryId,
    page,
  });
}

/**
 * Obtiene productos filtrados por vía de administración.
 * @param {number} routeId - ID de la vía
 * @param {number} page - Página (default: 1)
 * @returns {Promise<Object>} Productos con esa vía
 */
export async function getProductsByRoute(routeId, page = 1) {
  return fetchProducts({
    administrationRoute: routeId,
    page,
  });
}

/**
 * Obtiene productos por estado.
 * @param {number} statusId - ID del estado
 * @param {number} page - Página (default: 1)
 * @returns {Promise<Object>} Productos con ese estado
 */
export async function getProductsByStatus(statusId, page = 1) {
  return fetchProducts({
    status: statusId,
    page,
  });
}

/**
 * Obtiene información segura de un producto (para mostrar sin riesgos).
 * Útil cuando producto puede ser null.
 * @param {Object} product - Producto (puede ser null)
 * @returns {Object} Información segura del producto
 */
export function getSafeProduct(product) {
  return getSafeProductInfo(product);
}
