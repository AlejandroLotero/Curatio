import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { useMemo, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function LoginForm({
  onSubmit,
  loading = false,
  error = "",
  onForgotPassword,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const errors = useMemo(() => {
    const next = {};
    const email = form.email.trim();
    const password = form.password;

    if (!email) next.email = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Ingresa un correo válido.";

    if (!password) next.password = "La contraseña es obligatoria.";
    else if (password.length < 6) next.password = "Mínimo 6 caracteres.";

    return next;
  }, [form.email, form.password]);

  const canSubmit = Object.keys(errors).length === 0 && !loading;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (Object.keys(errors).length > 0) return;

    
    onSubmit?.({
      email: form.email.trim(),
      password: form.password,
      remember: form.remember,
    });
  };

  // Si tus clases son custom, déjalas. Si no, aquí hay una versión segura:
  const inputClass =
    "text-text-primary placeholder:text-text-muted w-full h-10 border-0 border-b-2 border-black/60 px-4 bg-transparent " +
    "focus:outline-none focus:border-black transition-colors duration-200";

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-body font-bold text-text-primary">CURATIO</h1>
        <p className="text-sm text-text-primary mt-1 font-body">Iniciar Sesión.</p>
      </div>

      {/* Error general del login (viene del padre) */}
      {error ? (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : null}

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
            error={touched.email ? errors.email : ""}
            className={inputClass}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : ""}
            className={`${inputClass} pr-12`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-9 text-gray-700 hover:text-black transition"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>

          {touched.password && errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-text-primary select-none">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-white/30 bg-transparent accent-primary"
            />
            Recuérdame
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-text-primary hover:text-white underline underline-offset-4"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="flex items-center justify-center gap-12 pt-2">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => {
              setForm({ email: "", password: "", remember: true });
              setTouched({ email: false, password: false });
            }}
          >
            Cancelar
          </Button>

          <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-black/70" />
            <span className="text-xs text-text-primary">o</span>
            <div className="h-px flex-1 bg-black/70" />
          </div>

          <button
            type="button"
            onClick={() => console.log("Ir a registrarse")}
            className="mt-3 w-full text-sm text-text-primary hover:text-white transition"
          >
            ¿No tienes cuenta? <span className="underline underline-offset-4">Crear una</span>
          </button>
        </div>
      </form>

      <p className="text-center text-xs text-text-primary mt-5">
        Al continuar aceptas nuestros Términos y Política de Privacidad.
      </p>
    </div>
  );
}