import { useState, type FormEvent } from "react";
import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { TextField } from "../../components/TextField/TextField";
import { useAuth } from "../../context/AuthContext";
import { Link, ROUTES } from "../../router";
import { AuthLayout } from "./AuthLayout";
import { isEmail } from "./validation";
import s from "./Auth.module.css";

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Informe um e-mail válido.";
    if (!password) next.password = "Informe sua senha.";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length) return;

    setLoading(true);
    const err = await login(email, password);
    setLoading(false);
    if (err) setFormError(err);
    // Em caso de sucesso, o roteador redireciona automaticamente.
  }

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre para continuar sua avaliação e acompanhar seu PDI."
      footer={
        <>
          Ainda não tem conta? <Link to={ROUTES.signup}>Criar conta</Link>
        </>
      }
    >
      <form className={s.form} onSubmit={onSubmit} noValidate>
        {formError && (
          <div className={s.alert} role="alert">
            <Icon name="info" size={16} />
            {formError}
          </div>
        )}
        <TextField
          label="E-mail"
          type="email"
          icon="mail"
          placeholder="seu@email.com"
          autoComplete="email"
          value={email}
          onValueChange={setEmail}
          error={errors.email}
        />
        <TextField
          label="Senha"
          type="password"
          icon="lock"
          placeholder="Sua senha"
          autoComplete="current-password"
          value={password}
          onValueChange={setPassword}
          error={errors.password}
        />
        <Button type="submit" full size="lg" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
          {!loading && <Icon name="arrow" size={16} />}
        </Button>
      </form>
    </AuthLayout>
  );
}
