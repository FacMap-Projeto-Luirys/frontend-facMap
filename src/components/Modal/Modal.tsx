import { useEffect, type ReactNode } from "react";
import { Icon } from "../Icon/Icon";
import s from "./Modal.module.css";

type Props = { open: boolean; onClose: () => void; children: ReactNode; labelledBy?: string };

export function Modal({ open, onClose, children, labelledBy }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.dialog} role="dialog" aria-modal="true" aria-labelledby={labelledBy} onClick={(e) => e.stopPropagation()}>
        <div className={s.handle} />
        <button className={s.close} onClick={onClose} aria-label="Fechar">
          <Icon name="x" size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
