import { useMemo, useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function ForgotPasswordForm({
  onSubmit,
  onBack,
  loading = false,
}) {
  const [form, setForm] = useState({ email: "" });
  const [touched, setTouched] = useState({ email: false });

  const errors = useMemo(() => {
    const next = {};
    const email = form.email.trim();

    if (!email) next.email = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Ingresa un correo válido.";

    return next;
  }, [form.email]);

  const canSubmit = Object.keys(errors).length === 0 && !loading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true });
    if (Object.keys(errors).length > 0) return;

    onSubmit?.({ email: form.email.trim() });
  };

  const inputClass =
    "w-full h-10 px-4 border-0 border-b-2 border-black/60 bg-transparent !rounded-none  " +
    "text-label placeholder:text-placeholder " +
    "focus:outline-none focus:ring-0! focus:border-t-0! focus:border-x-0! focus:border-b-2! focus:border-b-border! transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Correo electrónico"
          placeholder="juan@ejemplo.com"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass}
          error={touched.email ? errors.email : ""}
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="flex items-center justify-center gap-6 pt-2">
        <Button variant="secondary" size="sm" type="button" onClick={onBack}>
          Volver
        </Button>

        <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
          {loading ? "Enviando..." : "Enviar enlace"}
        </Button>
      </div>
    </form>
  );
}