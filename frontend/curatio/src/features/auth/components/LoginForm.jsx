import { useMemo, useState } from "react";
import {Input,Button} from "@/shared/components"
import {useNavigate } from "react-router-dom";
import logo from "@/assets/images/Curatio.png";

export default function LoginForm({
  onSubmit,
  loading = false,
  error = "",
  onForgotPassword,
}) {

  const navigate = useNavigate();

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
    else if (password.length < 8) next.password = "Mínimo 8 caracteres.";
    else if (password.length > 10) next.password = "Máximo 10 caracteres.";

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

  const inputClass =
    "!text-label placeholder:text-text-muted w-full h-10 !border-0 !border-b-2 border-black/60 px-4 !rounded-none  " +
    "focus:outline-none focus:!border-black transition-colors duration-200 !ring-0 ";

  return (
    <div className="flex flex-col items-center">
      {/* Encabezado */}
      <header className="mb-2 text-center">
        {/* <h1 className="font-body font-heading text-tittles text-label">
          CURATIO
        </h1> */}
        <div className="flex items-center ">
          <img
            src={logo}
            alt="Curatio Logo"
            className="h-18 drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]  "
          />
        </div>
        <p className="mt-1 font-body text-small text-label font-black">
          Iniciar sesión
        </p>
      </header>

      {/* Error general del login (viene del padre) */}
      {error ? (
        <div className="mb-4 w-full max-w-[320px] rounded-xl border border-error/40 bg-error/10 px-4 py-3">
          <p className="font-body text-small text-error">{error}</p>
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[320px] flex-col gap-4"
      >
        <div>
          <Input
            label="Correo electrónico"
            placeholder="juan@ejemplo.com"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            // error={touched.email ? errors.email : ""}
            className={`${inputClass}`}
          />
          {touched.email && errors.email && (
            <p className="mt-1 font-body text-red-600 text-mostsmall text-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            // error={touched.password ? errors.password : ""}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((s) => !s)}
            className={`${inputClass}`}
          />

          {touched.password && errors.password && (
            <p className="mt-1 font-body text-red-600 text-mostsmall text-error">
              {errors.password}
            </p>
          )}
        </div>

        <div>{/* <Card></Card> */}</div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 font-body text-small text-label select-none">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="size-4 rounded border-border bg-transparent accent-primary "
            />
            Recuérdame
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="font-body text-[14px] text-label underline underline-offset-4 transition hover:text-label"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="flex justify-between pt-2">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => navigate("/", { replace: true })}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={!canSubmit}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="font-body text-mostsmall text-label">o</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => console.log("Ir a registrarse")}
            className="mt-3 w-full font-body text-small text-label transition hover:text-label"
          >
            ¿No tienes cuenta?{" "}
            <span className="underline underline-offset-4">Crear una</span>
          </button>
        </div>
      </form>

      <p className="mt-4 text-center font-body text-[14px] text-text-muted">
        Al continuar aceptas nuestros Términos y Política de Privacidad.
      </p>
    </div>
  );
}
