import { useMemo, useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function TokenPasswordForm({
  onSubmit,
  onBack,
  loading = false,
  serverError = "",
  onResend,
}) {
  const [form, setForm] = useState({ token: "" });
  const [touched, setTouched] = useState({ token: false });

  const errors = useMemo(() => {
    const next = {};
    const token = form.token.trim();

    if (!token) next.token = "El token es obligatorio.";
    else if (token.length < 6) next.token = "El token debe tener al menos 6 caracteres.";

    return next;
  }, [form.token]);

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
    setTouched({ token: true });

    if (Object.keys(errors).length > 0) return;

    onSubmit?.({ token: form.token.trim() });
  };

  const inputClass =
    "w-full h-10 px-4 border-0 border-b-2 border-black/60 bg-transparent !rounded-none  " +
    "text-label placeholder:text-placeholder " +
    "focus:outline-none focus:ring-0! focus:border-t-0! focus:border-x-0! focus:border-b-2! focus:border-b-black! transition-colors duration-200";

  return (
    <>
      {serverError ? (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-700">{serverError}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Token"
            placeholder="Ej: 123456"
            type="text"
            name="token"
            value={form.token}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} tracking-widest`}
            error={touched.token ? errors.token : ""}
          />
          {touched.token && errors.token && (
            <p className="mt-1 text-xs text-red-600">{errors.token}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <Button variant="secondary" size="sm" type="button" onClick={onBack}>
            Volver
          </Button>

          <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
            {loading ? "Validando..." : "Validar token"}
          </Button>
        </div>

        <div className="pt-3 text-center">
          <button
            type="button"
            className="text-sm text-label hover:text-black underline underline-offset-4"
            onClick={onResend}
          >
            ¿No te llegó el token? Reenviar
          </button>
        </div>
      </form>
    </>
  );
}