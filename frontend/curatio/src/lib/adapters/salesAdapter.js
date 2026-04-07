// /**
//  * Adaptadores del módulo de ventas.
//  *
//  * Permiten mapear:
//  * - respuesta del backend -> shape del frontend
//  * - estado del checkout -> body de creación de venta
//  */

// /**
//  * Convierte una fila de venta desde la API al shape usado por listados y tablas.
//  */
// export function mapSaleRowFromApi(item) {
//   if (!item) return null;

//   return {
//     id: item.id,
//     invoiceNumber: item.invoice_number ?? "",
//     saleDateTime: item.sale_datetime ?? "",
//     customer: item.customer?.name ?? "",
//     customerId: item.customer?.id ?? null,
//     customerEmail: item.customer?.email ?? "",
//     pharmacist: item.seller?.name ?? "",
//     pharmacistId: item.seller?.id ?? null,
//     pharmacistEmail: item.seller?.email ?? "",
//     approver: item.approved_by?.name ?? "",
//     approverId: item.approved_by?.id ?? null,
//     subtotal: Number(item.subtotal ?? 0),
//     iva: Number(item.iva ?? 0),
//     discount: Number(item.discount ?? 0),
//     total: Number(item.total ?? 0),
//     paymentType: item.payment_type ?? "",
//     status: item.status ?? "",
//     statusId: item.status ?? "",
//   };
// }

// /**
//  * Convierte el detalle completo de una venta al shape usado por pantallas
//  * de detalle, comprobante o confirmación.
//  */
// export function mapSaleDetailFromApi(item) {
//   if (!item) return null;

//   return {
//     ...mapSaleRowFromApi(item),
//     sellerConfirmationAt: item.seller_confirmation_at ?? null,
//     customerConfirmationAt: item.customer_confirmation_at ?? null,
//     lines: Array.isArray(item.lines)
//       ? item.lines.map((line) => ({
//           id: line.id,
//           medicationId: line.medication?.id ?? null,
//           medicationName: line.medication?.name ?? "",
//           quantity: Number(line.quantity ?? 0),
//           unitPrice: Number(line.unit_price ?? 0),
//           lineSubtotal: Number(line.line_subtotal ?? 0),
//         }))
//       : [],
//     history: Array.isArray(item.history)
//       ? item.history.map((entry) => ({
//           id: entry.id,
//           action: entry.action ?? "",
//           detail: entry.detail ?? "",
//           date: entry.date ?? "",
//           userName: entry.user?.name ?? "",
//           userEmail: entry.user?.email ?? "",
//         }))
//       : [],
//   };
// }

// /**
//  * Convierte la respuesta del listado al arreglo que consume la tabla.
//  */
// export function mapSalesListResponse(response) {
//   const raw = response?.data?.results ?? [];
//   return raw.map(mapSaleRowFromApi);
// }

// /**
//  * Convierte la respuesta de detalle al objeto usado por la UI.
//  */
// export function mapSaleDetailResponse(response) {
//   return mapSaleDetailFromApi(response?.data?.sale);
// }

// /**
//  * Construye el body para crear una venta desde el checkout.
//  *
//  * checkoutData esperado:
//  * {
//  *   invoiceNumber,
//  *   customerId,
//  *   subtotal,
//  *   iva,
//  *   discount,
//  *   total,
//  *   paymentType,
//  *   lines: [
//  *     { medicationId, quantity }
//  *   ]
//  * }
//  */
// export function buildCreateSaleBody(checkoutData) {
//   const data = checkoutData || {};

//   return {
//     invoice_number: data.invoiceNumber ?? "",
//     customer_id: data.customerId ?? null,
//     subtotal: String(data.subtotal ?? 0),
//     iva: String(data.iva ?? 0),
//     discount: String(data.discount ?? 0),
//     total: String(data.total ?? 0),
//     payment_type: data.paymentType ?? "",
//     lines: Array.isArray(data.lines)
//       ? data.lines.map((line) => ({
//           medication_id: line.medicationId,
//           quantity: line.quantity,
//         }))
//       : [],
//   };
// }

// /**
//  * Construye el body para actualizar una venta.
//  */
// export function buildUpdateSaleBody(data) {
//   const payload = data || {};

//   return {
//     payment_type: payload.paymentType ?? "",
//     status: payload.status ?? "",
//   };
// }

// /**
//  * Convierte una opción de cliente desde la API al shape de Select.
//  */
// export function mapSaleCustomerOptionFromApi(item) {
//   if (!item) return null;

//   return {
//     id: item.id,
//     value: String(item.id),
//     label: `${item.name} — ${item.email}`,
//     name: item.name ?? "",
//     email: item.email ?? "",
//   };
// }

// /**
//  * Convierte la respuesta del catálogo de clientes a opciones para Select.
//  */
// export function mapSalesCustomersCatalogResponse(response) {
//   const raw = response?.data?.results ?? [];
//   return raw.map(mapSaleCustomerOptionFromApi);
// }

// /**
//  * Construye el body del checkout web del cliente.
//  */
// /**
//  * Construye el body para el checkout web del cliente.
//  *
//  * Traduce el modelo del frontend al contrato del backend.
//  */
// export function buildCustomerCheckoutBody(data) {
//   const d = data || {};

//   return {
//     invoice_number: d.invoiceNumber,
//     subtotal: d.subtotal,
//     iva: d.iva,
//     discount: d.discount ?? 0,
//     total: d.total,
//     payment_type: d.paymentType,

//     lines: (d.lines || []).map((line) => ({
//       medication_id: line.medicationId,
//       quantity: line.quantity,
//     })),

   
//     delivery_method: d.deliveryMethod,
//     delivery_address: d.deliveryAddress ?? "",
//     delivery_city: d.deliveryCity ?? "",
//     delivery_phone: d.deliveryPhone ?? "",
//     pickup_point: d.pickupPoint ?? "",
//     pickup_contact_name: d.pickupContactName ?? "",
//     pickup_contact_phone: d.pickupContactPhone ?? "",
//   };
// }

// /**
//  * Convierte el resultado del checkout web al shape consumido por la UI.
//  */
// export function mapCustomerCheckoutResponse(response) {
//   return response?.data?.checkout_sale ?? null;
// }

// /**
//  * Convierte el resultado de búsqueda de cliente por documento
//  * al shape consumido por la venta interna.
//  */
// export function mapSalesCustomerLookupResponse(response) {
//   const customer = response?.data?.customer;

//   if (!customer) {
//     return null;
//   }

//   return {
//     id: customer.id,
//     name: customer.name ?? "",
//     email: customer.email ?? "",
//     documentType: customer.document_type ?? "",
//     documentNumber: customer.document_number ?? "",
//     phone: customer.phone ?? "",
//     address: customer.address ?? "",
//   };
// }

// /**
//  * Convierte una notificación del backend al shape usado por frontend.
//  */
// export function mapSalesNotificationFromApi(item) {
//   if (!item) return null;

//   return {
//     id: item.id,
//     type: item.type ?? "GENERAL",
//     title: item.title ?? "",
//     message: item.message ?? "",
//     isRead: Boolean(item.is_read),
//     createdAt: item.created_at ?? "",
//     readAt: item.read_at ?? "",
//     sale: item.sale
//       ? {
//           id: item.sale.id,
//           invoiceNumber: item.sale.invoice_number,
//           status: item.sale.status,
//         }
//       : null,
//   };
// }

// /**
//  * Convierte el listado de notificaciones del backend.
//  */
// export function mapSalesNotificationsResponse(response) {
//   const raw = response?.data?.results ?? [];

//   return {
//     results: raw.map(mapSalesNotificationFromApi),
//     count: response?.data?.count ?? 0,
//     unreadCount: response?.data?.unread_count ?? 0,
//   };
// }

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

    /**
     * Información de entrega.
     *
     * Esta sección depende de que backend incluya `delivery`
     * dentro de la serialización de la venta.
     */
    delivery: item.delivery
      ? {
          method: item.delivery.method ?? "",
          methodLabel: item.delivery.method_label ?? "",
          deliveryAddress: item.delivery.delivery_address ?? "",
          deliveryCity: item.delivery.delivery_city ?? "",
          deliveryPhone: item.delivery.delivery_phone ?? "",
          pickupPoint: item.delivery.pickup_point ?? "",
          pickupContactName: item.delivery.pickup_contact_name ?? "",
          pickupContactPhone: item.delivery.pickup_contact_phone ?? "",
        }
      : null,
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

    /**
     * Líneas de la venta.
     */
    lines: Array.isArray(item.lines)
      ? item.lines.map((line) => ({
          id: line.id,
          medicationId: line.medication?.id ?? null,
          medication: line.medication?.name ?? "",
          medicationName: line.medication?.name ?? "",
          quantity: Number(line.quantity ?? 0),
          unitPrice: Number(line.unit_price ?? 0),
          lineSubtotal: Number(line.line_subtotal ?? 0),
        }))
      : [],

    /**
     * Historial de eventos de la venta.
     */
    history: Array.isArray(item.history)
      ? item.history.map((entry) => ({
          id: entry.id,
          action: entry.action ?? "",
          detail: entry.detail ?? "",
          date: entry.date ?? "",
          user: {
            name: entry.user?.name ?? "",
            email: entry.user?.email ?? "",
          },
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
 * Construye el body para crear una venta desde el checkout interno.
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
 * Construye el body para el checkout web del cliente.
 *
 * Traduce el modelo del frontend al contrato del backend.
 */
export function buildCustomerCheckoutBody(data) {
  const d = data || {};

  return {
    invoice_number: d.invoiceNumber,
    subtotal: d.subtotal,
    iva: d.iva,
    discount: d.discount ?? 0,
    total: d.total,
    payment_type: d.paymentType,

    lines: (d.lines || []).map((line) => ({
      medication_id: line.medicationId,
      quantity: line.quantity,
    })),

    delivery_method: d.deliveryMethod,
    delivery_address: d.deliveryAddress ?? "",
    delivery_city: d.deliveryCity ?? "",
    delivery_phone: d.deliveryPhone ?? "",
    pickup_point: d.pickupPoint ?? "",
    pickup_contact_name: d.pickupContactName ?? "",
    pickup_contact_phone: d.pickupContactPhone ?? "",
  };
}

/**
 * Convierte el resultado del checkout web al shape consumido por la UI.
 */
export function mapCustomerCheckoutResponse(response) {
  return mapSaleDetailFromApi(response?.data?.checkout_sale);
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

/**
 * Convierte una notificación del backend al shape usado por frontend.
 */
export function mapSalesNotificationFromApi(item) {
  if (!item) return null;

  return {
    id: item.id,
    type: item.type ?? "GENERAL",
    title: item.title ?? "",
    message: item.message ?? "",
    isRead: Boolean(item.is_read),
    createdAt: item.created_at ?? "",
    readAt: item.read_at ?? "",
    sale: item.sale
      ? {
          id: item.sale.id,
          invoiceNumber: item.sale.invoice_number,
          status: item.sale.status,
        }
      : null,
  };
}

/**
 * Convierte el listado de notificaciones del backend.
 */
export function mapSalesNotificationsResponse(response) {
  const raw = response?.data?.results ?? [];

  return {
    results: raw.map(mapSalesNotificationFromApi),
    count: response?.data?.count ?? 0,
    unreadCount: response?.data?.unread_count ?? 0,
  };
}