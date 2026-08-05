"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

const CLOSE_DELAY_MS = 150;

/**
 * Owns dropdown open/close state and keeps the panel centred under its
 * trigger button without letting it overflow the nav container.
 */
export function useMegaMenu() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [btnCenter, setBtnCenter] = useState(0);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

  const navRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // After the panel renders, measure it and clamp it within the container
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const container = navRef.current;
    if (!panel || !container || activeId === null) return;

    const panelWidth = panel.offsetWidth;
    const maxLeft = container.getBoundingClientRect().width - panelWidth;
    const left = Math.max(0, Math.min(btnCenter - panelWidth / 2, maxLeft));

    setPanelStyle({ left });
  }, [activeId, btnCenter]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const registerButton = useCallback(
    (id: number, el: HTMLButtonElement | null) => {
      if (el) btnRefs.current.set(id, el);
      else btnRefs.current.delete(id);
    },
    [],
  );

  const open = useCallback((id: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveId(id);

    const btn = btnRefs.current.get(id);
    const container = navRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setBtnCenter(btnRect.left + btnRect.width / 2 - containerRect.left);
    }
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveId(null), CLOSE_DELAY_MS);
  }, []);

  const closeNow = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveId(null);
  }, []);

  return {
    activeId,
    navRef,
    panelRef,
    panelStyle,
    registerButton,
    open,
    close,
    closeNow,
  };
}
