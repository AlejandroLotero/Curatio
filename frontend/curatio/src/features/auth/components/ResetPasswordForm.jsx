import { useMemo, useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function ResetPasswordForm({
  onSubmit,
  onBack,
  loading = false,
  serverError = "",
}) {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false,
  });

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  // const errors = useMemo(() => {
  //   const next = {};
  //   const password = form.password;
  //   const confirm = form.confirmPassword;

  //   if (!password) next.password = "La nueva contraseña es obligatoria.";
  //   else if (password.length < 6) next.password = "Mínimo 6 caracteres.";

  //   if (!confirm) next.confirmPassword = "Confirma tu nueva contraseña.";
  //   else if (confirm !== password) next.confirmPassword = "Las contraseñas no coinciden.";

  //   return next;
  // }, [form.password, form.confirmPassword]);

    const errors = useMemo(() => {
    const next = {};
    const password = form.password;
    const confirm = form.confirmPassword;

    if (!password) {
      next.password = "La nueva contraseña es obligatoria.";
    } else if (password.length < 8) {
      next.password = "Mínimo 8 caracteres.";
    } else if (password.length > 10) {
      next.password = "Máximo 10 caracteres.";
    } else if (!/[A-Z]/.test(password)) {
      next.password = "Debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(password)) {
      next.password = "Debe contener al menos una minúscula.";
    } else if (!/[0-9]/.test(password)) {
      next.password = "Debe contener al menos un número.";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      next.password = "Debe contener al menos un carácter especial.";
    }

    if (!confirm) {
      next.confirmPassword = "Confirma tu nueva contraseña.";
    } else if (confirm !== password) {
      next.confirmPassword = "Las contraseñas no coinciden.";
    }

    return next;
  }, [form.password, form.confirmPassword]);

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
    setTouched({ password: true, confirmPassword: true });

    if (Object.keys(errors).length > 0) return;

    onSubmit?.({ password: form.password, confirmPassword: form.confirmPassword });
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
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} pr-12`}
            // error={touched.password ? errors.password : ""}
            showPassword={show.password}
            onTogglePassword={() => setShow((s) => ({ ...s, password: !s.password }))}
          />
          {touched.password && errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <Input
            label="Confirmar nueva contraseña"
            placeholder="Confirma tu nueva contraseña"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} pr-12`}
            // error={touched.confirmPassword ? errors.confirmPassword : ""}
            showPassword={show.confirmPassword}
            onTogglePassword={() =>
              setShow((s) => ({ ...s, confirmPassword: !s.confirmPassword }))
            }
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <Button variant="secondary" size="sm" type="button" onClick={onBack}>
            Volver
          </Button>

          <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
            {loading ? "Guardando..." : "Confirmar"}
          </Button>
        </div>
      </form>
    </>
  );
}