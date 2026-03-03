import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

export default function TokenPasswordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ token: "" });
  const [touched, setTouched] = useState({ token: false });

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => {
    const next = {};
    const token = form.token.trim();

    if (!token) next.token = "El token es obligatorio.";
    else if (token.length < 6) next.token = "El token debe tener al menos 6 caracteres.";
    // Si tu token es de 6 dígitos numéricos, usa esto en vez de lo anterior:
    // else if (!/^\d{6}$/.test(token)) next.token = "El token debe ser de 6 dígitos.";

    return next;
  }, [form.token]);

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
    setTouched({ token: true });
    setServerError("");

    if (Object.keys(errors).length > 0) return;

    try {
      setSubmitting(true);

      // TODO: validar token real con backend
      console.log("Validando token:", form.token.trim());

      // Simulación
      await new Promise((r) => setTimeout(r, 700));
      if (form.token.trim() === "000000") throw new Error("Token inválido");

      //  pasar token por state
      // navigate("/reset-password", { state: { token: form.token.trim() } });
      navigate("/reset-password");

 
    } catch (err) {
      console.error(err);
      setServerError("El token es inválido o expiró. Solicita uno nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-10 px-4 border-0 border-b-2 border-black/60 bg-transparent " +
    "text-text-primary placeholder:text-text-muted " +
    "focus:outline-none focus:border-black transition-colors duration-200";

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center relative overflow-hidden">
      {/* “luces” */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-body font-bold text-text-primary">CURATIO</h1>
              <p className="text-sm text-text-primary/80 mt-1 font-body">
                Verificar token
              </p>
            </div>

            <p className="text-sm text-text-primary/80 mb-5 text-center">
              Por favor ingrese el TOKEN que le ha llegado a su correo electrónico
            </p>

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
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Volver
                </Button>

                <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
                  {submitting ? "Validando..." : "Validar token"}
                </Button>
              </div>

              <div className="pt-3 text-center">
                <button
                  type="button"
                  className="text-sm text-text-primary hover:text-black underline underline-offset-4"
                  onClick={() => {
                    // aquí podrías reenviar token si lo implementas
                    console.log("Reenviar token");
                  }}
                >
                  ¿No te llegó el token? Reenviar
                </button>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-text-primary/80 mt-5">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}