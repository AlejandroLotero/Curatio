export function mapCartShopRowFromApi(item) {
  if (!item) return null;

  return {
    id: item.id,
    saleId: item.sale_id ?? null,
    lineId: item.line_id ?? null,

    invoice_number: item.invoice_number ?? "",
    date: item.date ?? "",
    dateTime: item.date_time ?? "",

    product: item.product ?? "",
    amount: Number(item.amount ?? 0),
    unit_value: Number(item.unit_value ?? 0),
    subtotal: Number(item.subtotal ?? 0),

    state: item.state ?? "",
    statusId: item.state ?? "",

    approver: item.approver ?? "",

    customer: item.customer?.name ?? "",
    customerId: item.customer?.id ?? null,

    pharmacist: item.seller?.name ?? "",
    pharmacistId: item.seller?.id ?? null,

    is_active: Boolean(item.is_active),
  };
}

export function mapCartShopListResponse(response) {
  const raw = response?.data?.results ?? [];
  return raw.map(mapCartShopRowFromApi);
}

export function mapCartShopDetailResponse(response) {
  const item = response?.data?.cartshop;

  if (!item) return null;

  return {
    id: item.id,
    invoiceNumber: item.invoice_number ?? "",
    dateTime: item.date_time ?? "",
    state: item.state ?? "",
    paymentType: item.payment_type ?? "",
    subtotal: Number(item.subtotal ?? 0),
    iva: Number(item.iva ?? 0),
    discount: Number(item.discount ?? 0),
    total: Number(item.total ?? 0),
    approver: item.approver?.name ?? "",
    customer: item.customer?.name ?? "",
    pharmacist: item.seller?.name ?? "",
    lines: Array.isArray(item.lines)
      ? item.lines.map((line) => ({
          id: line.id,
          product: line.product ?? "",
          amount: Number(line.amount ?? 0),
          unit_value: Number(line.unit_value ?? 0),
          subtotal: Number(line.subtotal ?? 0),
        }))
      : [],
  };
}