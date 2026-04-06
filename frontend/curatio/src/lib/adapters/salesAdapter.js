/**
 * Adaptadores del módulo de ventas.
 *
 * Permiten mapear:
 * - respuesta del backend -> shape del frontend
 * - estado del checkout -> body de creación de venta
 */

/**
 * Convierte una fila de venta desde la API al shape usado por listados y tablas.
 */
export function mapSaleRowFromApi(item) {
  if (!item) return null;

  return {
    id: item.id,
    invoiceNumber: item.invoice_number ?? "",
    saleDateTime: item.sale_datetime ?? "",
    customer: item.customer?.name ?? "",
    customerId: item.customer?.id ?? null,
    customerEmail: item.customer?.email ?? "",
    pharmacist: item.seller?.name ?? "",
    pharmacistId: item.seller?.id ?? null,
    pharmacistEmail: item.seller?.email ?? "",
    approver: item.approved_by?.name ?? "",
    approverId: item.approved_by?.id ?? null,
    subtotal: Number(item.subtotal ?? 0),
    iva: Number(item.iva ?? 0),
    discount: Number(item.discount ?? 0),
    total: Number(item.total ?? 0),
    paymentType: item.payment_type ?? "",
    status: item.status ?? "",
    statusId: item.status ?? "",
  };
}

/**
 * Convierte el detalle completo de una venta al shape usado por pantallas
 * de detalle, comprobante o confirmación.
 */
export function mapSaleDetailFromApi(item) {
  if (!item) return null;

  return {
    ...mapSaleRowFromApi(item),
    sellerConfirmationAt: item.seller_confirmation_at ?? null,
    customerConfirmationAt: item.customer_confirmation_at ?? null,
    lines: Array.isArray(item.lines)
      ? item.lines.map((line) => ({
          id: line.id,
          medicationId: line.medication?.id ?? null,
          medicationName: line.medication?.name ?? "",
          quantity: Number(line.quantity ?? 0),
          unitPrice: Number(line.unit_price ?? 0),
          lineSubtotal: Number(line.line_subtotal ?? 0),
        }))
      : [],
    history: Array.isArray(item.history)
      ? item.history.map((entry) => ({
          id: entry.id,
          action: entry.action ?? "",
          detail: entry.detail ?? "",
          date: entry.date ?? "",
          userName: entry.user?.name ?? "",
          userEmail: entry.user?.email ?? "",
        }))
      : [],
  };
}

/**
 * Convierte la respuesta del listado al arreglo que consume la tabla.
 */
export function mapSalesListResponse(response) {
  const raw = response?.data?.results ?? [];
  return raw.map(mapSaleRowFromApi);
}

/**
 * Convierte la respuesta de detalle al objeto usado por la UI.
 */
export function mapSaleDetailResponse(response) {
  return mapSaleDetailFromApi(response?.data?.sale);
}

/**
 * Construye el body para crear una venta desde el checkout.
 *
 * checkoutData esperado:
 * {
 *   invoiceNumber,
 *   customerId,
 *   subtotal,
 *   iva,
 *   discount,
 *   total,
 *   paymentType,
 *   lines: [
 *     { medicationId, quantity }
 *   ]
 * }
 */
export function buildCreateSaleBody(checkoutData) {
  const data = checkoutData || {};

  return {
    invoice_number: data.invoiceNumber ?? "",
    customer_id: data.customerId ?? null,
    subtotal: String(data.subtotal ?? 0),
    iva: String(data.iva ?? 0),
    discount: String(data.discount ?? 0),
    total: String(data.total ?? 0),
    payment_type: data.paymentType ?? "",
    lines: Array.isArray(data.lines)
      ? data.lines.map((line) => ({
          medication_id: line.medicationId,
          quantity: line.quantity,
        }))
      : [],
  };
}

/**
 * Construye el body para actualizar una venta.
 */
export function buildUpdateSaleBody(data) {
  const payload = data || {};

  return {
    payment_type: payload.paymentType ?? "",
    status: payload.status ?? "",
  };
}

/**
 * Convierte una opción de cliente desde la API al shape de Select.
 */
export function mapSaleCustomerOptionFromApi(item) {
  if (!item) return null;

  return {
    id: item.id,
    value: String(item.id),
    label: `${item.name} — ${item.email}`,
    name: item.name ?? "",
    email: item.email ?? "",
  };
}

/**
 * Convierte la respuesta del catálogo de clientes a opciones para Select.
 */
export function mapSalesCustomersCatalogResponse(response) {
  const raw = response?.data?.results ?? [];
  return raw.map(mapSaleCustomerOptionFromApi);
}

/**
 * Construye el body del checkout web del cliente.
 */
export function buildCustomerCheckoutBody(checkoutData) {
  const data = checkoutData || {};

  return {
    invoice_number: data.invoiceNumber ?? "",
    subtotal: String(data.subtotal ?? 0),
    iva: String(data.iva ?? 0),
    discount: String(data.discount ?? 0),
    total: String(data.total ?? 0),
    payment_type: data.paymentType ?? "",
    lines: Array.isArray(data.lines)
      ? data.lines.map((line) => ({
          medication_id: line.medicationId,
          quantity: line.quantity,
        }))
      : [],
  };
}

/**
 * Convierte el resultado del checkout web al shape consumido por la UI.
 */
export function mapCustomerCheckoutResponse(response) {
  return response?.data?.checkout_sale ?? null;
}

/**
 * Convierte el resultado de búsqueda de cliente por documento
 * al shape consumido por la venta interna.
 */
export function mapSalesCustomerLookupResponse(response) {
  const customer = response?.data?.customer;

  if (!customer) {
    return null;
  }

  return {
    id: customer.id,
    name: customer.name ?? "",
    email: customer.email ?? "",
    documentType: customer.document_type ?? "",
    documentNumber: customer.document_number ?? "",
    phone: customer.phone ?? "",
    address: customer.address ?? "",
  };
}