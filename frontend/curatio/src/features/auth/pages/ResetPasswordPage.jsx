import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const token = state?.token; // viene desde TokenPasswordPage.jsx

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

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  // Si no hay token, no deberías estar aquí
  // (en apps reales también validarías en backend)
//   if (!token) {
//     // redirige a ingresar token
//     navigate("/send-token", { replace: true });
//     return null;
//   }

  const errors = useMemo(() => {
    const next = {};
    const password = form.password;
    const confirm = form.confirmPassword;

    if (!password) next.password = "La nueva contraseña es obligatoria.";
    else if (password.length < 6) next.password = "Mínimo 6 caracteres.";

    if (!confirm) next.confirmPassword = "Confirma tu nueva contraseña.";
    else if (confirm !== password) next.confirmPassword = "Las contraseñas no coinciden.";

    return next;
  }, [form.password, form.confirmPassword]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServerError("");
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });
    setServerError("");

    if (Object.keys(errors).length > 0) return;

    try {
      setSubmitting(true);

      // TODO: Aquí llamas tu API real:
      // await authService.resetPassword({ token, newPassword: form.password })
      console.log("Reset password payload:", { token, newPassword: form.password });

      // Simulación
      await new Promise((r) => setTimeout(r, 800));

      setSuccess(true);

      // opcional: luego de éxito, enviar a login
      // navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      setServerError("No se pudo cambiar la contraseña. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-10 px-4 border-0 border-b-2 border-black/60 bg-transparent " +
    "text-label placeholder:text-placeholder " +
    "focus:outline-none focus:ring-0! focus:border-t-0! focus:border-x-0! focus:border-b-2! focus:border-b-black! transition-colors duration-200";

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
      {/* “luces” */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-body font-bold text-label">CURATIO</h1>
              <p className="text-sm text-label/80 mt-1 font-body">
                Restablecer contraseña
              </p>
            </div>

            {!success ? (
              <>
                <p className="text-sm text-label/80 mb-5 text-center">
                  Ingresa tu nueva contraseña y confírmala para finalizar.
                </p>

                {serverError ? (
                  <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="text-sm text-red-700">{serverError}</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nueva contraseña */}
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
                      error={touched.password ? errors.password : ""}
                      showPassword={show.password}
                      onTogglePassword={() => setShow((s) => ({ ...s, password: !s.password }))}
                    />

                    {touched.password && errors.password && (
                      <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirmar contraseña */}
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
                      error={touched.confirmPassword ? errors.confirmPassword : ""}
                      showPassword={show.confirmPassword}
                      onTogglePassword={() =>
                        setShow((s) => ({ ...s, confirmPassword: !s.confirmPassword }))
                      }
                    />

                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-6 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => navigate("/send-token")}
                    >
                      Volver
                    </Button>

                    <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
                      {submitting ? "Guardando..." : "Confirmar"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-sm text-label">
                     Tu contraseña fue actualizada correctamente.
                  </p>
                  <p className="text-xs text-label/70 mt-2">
                    Ya puedes iniciar sesión con tu nueva contraseña.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={() => navigate("/login", { replace: true })}
                  >
                    Ir a login
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-label/80 mt-5">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}