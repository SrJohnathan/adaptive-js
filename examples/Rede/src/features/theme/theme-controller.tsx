"hydrate";

import { MoonIcon, SunIcon } from "./theme-icons.tsx";
import {events, init, signal} from "@adaptive-js/web";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "rede-theme";

export function ThemeController() {
  const [theme, setTheme] = signal<ThemeMode>("dark");

  events(() => {
    console.log("ThemeController");
    const storedTheme = readStoredTheme();
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, [])

  init(() => {


    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const nextTheme = resolveInitialTheme(media);

    setTheme(nextTheme);
    applyTheme(nextTheme);

    const onMediaChange = () => {
      const storedTheme = readStoredTheme();
      if (storedTheme) return;

      const systemTheme: ThemeMode = media.matches ? "dark" : "light";
      setTheme(systemTheme);
      applyTheme(systemTheme);
    };

    media.addEventListener?.("change", onMediaChange);

    return () => {
      media.removeEventListener?.("change", onMediaChange);
    };
  });

  const isDark = () => theme() === "dark";

  const toggleTheme = async (event: MouseEvent) => {
    const nextTheme: ThemeMode = isDark() ? "light" : "dark";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const docWithTransition = document as Document & {
      startViewTransition?: (callback: () => void) => { ready: Promise<void> };
    };

    if (!docWithTransition.startViewTransition || reduceMotion) {
      setTheme(nextTheme);
      applyTheme(nextTheme);
      return;
    }

    const target = event.currentTarget as HTMLElement | null;
    if (!target) {
      setTheme(nextTheme);
      applyTheme(nextTheme);
      return;
    }

    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = docWithTransition.startViewTransition(() => {
      setTheme(nextTheme);
      applyTheme(nextTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 520,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={() => isDark() ? "Ativar modo claro" : "Ativar modo escuro"}
      title={() => isDark() ? "Ativar modo claro" : "Ativar modo escuro"}
      className="grid size-10 place-items-center rounded-full border border-[var(--rede-border)] bg-[var(--rede-panel)] text-[var(--rede-text)] transition hover:border-pink-400"
      type="button"
    >
      {() => isDark() ? <MoonIcon size={20} /> : <SunIcon size={20} animateOnHover />}
    </button>
  );
}

function resolveInitialTheme(media: MediaQueryList): ThemeMode {
  const storedTheme = readStoredTheme();
  if (storedTheme) return storedTheme;
  return media.matches ? "dark" : "light";
}

function readStoredTheme(): ThemeMode | null {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return null;
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
}
