import { useState, type FormEvent } from "react";
import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { TextField } from "../../components/TextField/TextField";
import { useAuth } from "../../context/AuthContext";
import { Link, ROUTES } from "../../router";
import { AuthLayout } from "./AuthLayout";
import { isEmail } from "./validation";
import s from "./Auth.module.css";

type Fields = { name: string; email: string; password: string; confirm: string };
type Errors = Partial<Record<keyof Fields | "terms", string>>;

export function Signup() {
  const { signup } = useAuth();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", password: "", confirm: "" });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof Fields) => (value: string) => setFields((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (fields.name.trim().length < 3) next.name = "Informe seu nome completo.";
    if (!isEmail(fields.email)) next.email = "Informe um e-mail válido.";
    if (fields.password.length < 6) next.password = "A senha precisa ter pelo menos 6 caracteres.";
    if (fields.confirm !== fields.password) next.confirm = "As senhas não coincidem.";
    if (!terms) next.terms = "Você precisa aceitar para continuar.";
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length) return;

    setLoading(true);
    const err = await signup({ name: fields.name, email: fields.email, password: fields.password });
    setLoading(false);
    if (err) setFormError(err);
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Para alunos de Sistemas de Informação da FACAPE. A conta leva menos de um minuto e a avaliação, cerca de 5."
      footer={
        <>
          Já tem uma conta? <Link to={ROUTES.login}>Entrar</Link>
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
          label="Nome completo"
          icon="user"
          placeholder="Como você se chama?"
          autoComplete="name"
          value={fields.name}
          onValueChange={set("name")}
          error={errors.name}
        />
        <TextField
          label="E-mail"
          type="email"
          icon="mail"
          placeholder="seu@email.com"
          autoComplete="email"
          value={fields.email}
          onValueChange={set("email")}
          error={errors.email}
        />
        <div className={s.row}>
          <TextField
            label="Senha"
            type="password"
            icon="lock"
            placeholder="6 ou mais caracteres"
            autoComplete="new-password"
            value={fields.password}
            onValueChange={set("password")}
            error={errors.password}
          />
          <TextField
            label="Confirmar senha"
            type="password"
            icon="lock"
            placeholder="Repita a senha"
            autoComplete="new-password"
            value={fields.confirm}
            onValueChange={set("confirm")}
            error={errors.confirm}
          />
        </div>

        <div>
          <label className={s.checkbox}>
            <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
            <span className={s.checkboxBox}>{terms && <Icon name="check" size={12} color="white" strokeWidth={3} />}</span>
            Entendo que as recomendações são um ponto de partida e não uma profissão definitiva.
          </label>
          {errors.terms && <span className={s.fieldError}>{errors.terms}</span>}
        </div>

        <Button type="submit" full size="lg" disabled={loading}>
          {loading ? "Criando conta..." : "Criar conta e começar"}
          {!loading && <Icon name="arrow" size={16} />}
        </Button>
      </form>
    </AuthLayout>
  );
}
