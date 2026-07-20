import type { ThemeConfig } from "./types";

/**
 * Maps ThemeConfig fields to their CSS custom property names.
 */
const TOKEN_MAP: Record<keyof ThemeConfig, string> = {
  brandDark: "--color-brand-dark",
  brandBlue: "--color-brand-blue",
  brandHover: "--color-brand-hover",
  brandPressed: "--color-brand-pressed",
  brandSubtle: "--color-brand-subtle",
  brandElectric: "--color-brand-electric",
  bgPage: "--color-bg-page",
  bgSurface: "--color-bg-surface",
  textPrimary: "--color-text-primary",
  textSecondary: "--color-text-secondary",
  textAccent: "--color-text-accent",
  iconPrimary: "--color-icon-primary",
  iconSecondary: "--color-icon-secondary",
  iconTertiary: "--color-icon-tertiary",
  iconDisabled: "--color-icon-disabled",
  buttonPrimary: "--color-button-primary",
  buttonPrimaryHover: "--color-button-primary-hover",
  buttonPrimaryPressed: "--color-button-primary-pressed",
  colorSuccess: "--color-success",
  colorError: "--color-error",
  slate50: "--color-slate-50",
  slate100: "--color-slate-100",
  slate200: "--color-slate-200",
  slate300: "--color-slate-300",
  slate400: "--color-slate-400",
  slate500: "--color-slate-500",
  slate550: "--color-slate-550",
  slate600: "--color-slate-600",
  slate700: "--color-slate-700",
  slate800: "--color-slate-800",
  slate900: "--color-slate-900",
  slate950: "--color-slate-950",
  border: "--color-border",
};

/**
 * Builds a CSS string of `:root` variable overrides from a ThemeConfig.
 * Only includes fields that have a truthy value.
 */
export function buildThemeCss(theme: ThemeConfig): string {
  const vars = Object.entries(TOKEN_MAP)
    .filter(([key]) => theme[key as keyof ThemeConfig])
    .map(([key, cssVar]) => `${cssVar}: ${theme[key as keyof ThemeConfig]};`)
    .join("\n  ");

  if (!vars) return "";
  return `:root {\n  ${vars}\n}`;
}
