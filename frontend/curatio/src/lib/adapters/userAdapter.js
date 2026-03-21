export function adaptBackendUserToUi(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.is_active,
    documentType: user.document_type,
    documentNumber: user.document_number,
    phone: user.phone,
    secondaryPhone: user.secondary_phone,
    address: user.address,
    photoUrl: user.photo,
    startDate: user.start_date,
    endDate: user.end_date,
  };
}