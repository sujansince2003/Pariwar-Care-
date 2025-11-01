export const theme = {
  colors: {
    bg: {
      primary: "var(--color-bg-primary)",
      secondary: "var(--color-bg-secondary)",
      surface: "var(--color-surface)",
    },
    blue: {
      primary: "var(--color-blue-primary)",
      dark: "var(--color-blue-dark)",
    },
    accent: {
      orange: "var(--color-accent-orange)",
      orangeHover: "var(--color-accent-orange-hover)",
      yellow: "var(--color-accent-yellow)",
      red: "var(--color-accent-red)",
      green: "var(--color-accent-green)",
      blue: "var(--color-accent-blue)",
    },
    text: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      placeholder: "var(--color-text-placeholder)",
    },
    border: "var(--color-border)",
  },
  status: {
    pending: "bg-[var(--color-accent-yellow)] text-[var(--color-text-primary)]",
    active: "bg-[var(--color-accent-blue)] text-white",
    completed: "bg-[var(--color-accent-green)] text-white",
    error: "bg-[var(--color-accent-red)] text-white",
  },
  card: {
    base: "bg-[var(--color-bg-primary)] rounded-lg shadow-sm border border-[var(--color-border)]",
    hover: "hover:shadow-md transition-shadow",
  },
  text: {
    title: "text-[var(--color-text-primary)] font-semibold",
    body: "text-[var(--color-text-secondary)]",
    small: "text-sm text-[var(--color-text-secondary)]",
  },
  button: {
    primary: "bg-[var(--color-blue-primary)] text-white hover:bg-[var(--color-blue-dark)] transition-colors",
    secondary: "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors",
  },
} as const;