import { useMemo, useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";

import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "" });
    const [touched, setTouched] = useState({ email: false });

    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);

    const errors = useMemo(() => {
    const next = {};
    const email = form.email.trim();

  if (!email) next.email = "El correo es obligatorio.";
  else if (!/^\S+@\S+\.\S+$/.test(email))
    next.email = "Ingresa un correo válido.";

  return next;
}, [form.email]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true });

    if (Object.keys(errors).length > 0) return;

    try {
      setSubmitting(true);

   
      console.log("Forgot password payload:", form);

  
      await new Promise((r) => setTimeout(r, 700));

      setSent(true);
    } catch (err) {
      console.error("Error forgot password:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-10 px-4 border-0 border-b-2 border-black/60 bg-transparent " +
    "text-text-primary placeholder:text-text-muted " +
    "focus:outline-none focus:border-black transition-colors duration-200";

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-transparent relative overflow-hidden">
      {/* ESTILOS DE LUZ */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20 bg-white" />

      <div className="w-full max-w-3xl">
        <div className="rounded-3xl border border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="px-7 py-8">
            <div className="mb-6 text-left">
              <h1 className="text-2xl font-body font-bold text-text-primary">RECUPERAR CONTRASEÑA</h1>
             
            </div>

            {!sent ? (
              <>
                <p className="text-sm text-text-primary/80 mb-5 text-center">
                 Por favor ingrese el correo electronico con el que se creo el usuario en esta aplicación
                </p>

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
                    <Button
                      variant="secondary"
                      size="sm"
                      type="button"
                      onClick={() => {
                        // Si usas react-router:
                        navigate("/login")
                        
                        console.log("Volver a login");
                      }}
                    >
                      Volver
                    </Button>

                    <Button variant="primary" size="md" type="submit" disabled={!canSubmit}>
                      {submitting ? "Enviando..." : "Enviar enlace"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <p className="text-sm text-text-primary">
                    Si el correo existe, te enviamos un enlace para restablecer tu contraseña.
                  </p>
                  <p className="text-xs text-text-primary/70 mt-2">
                    Revisa también Spam
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ email: "" });
                      setTouched({ email: false });
                    }}
                  >
                    Enviar de nuevo
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    type="button"
                    onClick={() => {
                      navigate("/send-token")
                      console.log("Ir a ingreso token")
                    } }
                  >
                      Aceptar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-text-primary/80 mt-5">
          Al continuar aceptas nuestros Términos y Política de Privacidad.
        </p>
      </div>
    </div>
  );
}