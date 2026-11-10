import { useAuth } from "../../context/AuthContext";
import { navigate, ROUTES } from "../../router";
import { cx } from "../../utils/accent";
import { Icon } from "../Icon/Icon";
import s from "./UserChip.module.css";

export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function UserChip({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  const onLogout = () => {
    logout();
    navigate(ROUTES.home);
  };

  return (
    <div className={cx(s.chip, compact && s.compact, className)}>
      <span className={s.avatar}>{initials(user.name)}</span>
      <span className={s.info}>
        <span className={s.name}>{user.name.split(" ")[0]}</span>
        <span className={s.email}>{user.email}</span>
      </span>
      <button className={s.logout} onClick={onLogout} aria-label="Sair" title="Sair">
        <Icon name="logout" size={17} />
      </button>
    </div>
  );
}
