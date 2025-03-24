import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}

function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) return storedTheme;
    
    if (defaultTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme,
      }}
      {...props}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

function applyTheme(currentTheme: "dark" | "light") {
  const root = window.document.documentElement;
  
  if (currentTheme === "dark") {
    // Tema Escuro
    root.style.setProperty("--background", "#0A0A0A");
    root.style.setProperty("--foreground", "#FFFFFF");
    
    // Cores principais - Verde Neon
    root.style.setProperty("--primary", "#ADFF00");
    root.style.setProperty("--primary-foreground", "#000000");
    
    // Cores de destaque
    root.style.setProperty("--accent", "#ADFF00");
    root.style.setProperty("--accent-foreground", "#000000");
    
    // Cores secundárias - Marrom Escuro
    root.style.setProperty("--secondary", "#2A1810");
    root.style.setProperty("--secondary-foreground", "#FFFFFF");
    
    // Cards com fundo escuro
    root.style.setProperty("--card", "#1A1A1A");
    root.style.setProperty("--card-foreground", "#FFFFFF");
    
    // Bordas mais visíveis
    root.style.setProperty("--border", "#333333");
    
    // Texto mutado com verde neon
    root.style.setProperty("--muted", "#1A1A1A");
    root.style.setProperty("--muted-foreground", "#ADFF00");
  } else {
    // Tema Claro
    root.style.setProperty("--background", "#F5F5F5");
    root.style.setProperty("--foreground", "#0A0A0A");
    
    // Cores principais - Verde Escuro
    root.style.setProperty("--primary", "#0A3B2C");
    root.style.setProperty("--primary-foreground", "#FFFFFF");
    
    // Cores de destaque
    root.style.setProperty("--accent", "#0A3B2C");
    root.style.setProperty("--accent-foreground", "#FFFFFF");
    
    // Cores secundárias - Verde Claro
    root.style.setProperty("--secondary", "#E8F5E9");
    root.style.setProperty("--secondary-foreground", "#0A3B2C");
    
    // Cards com fundo branco
    root.style.setProperty("--card", "#FFFFFF");
    root.style.setProperty("--card-foreground", "#0A0A0A");
    
    // Bordas suaves
    root.style.setProperty("--border", "#E2E8F0");
    
    // Texto mutado em verde escuro
    root.style.setProperty("--muted", "#F8FAFC");
    root.style.setProperty("--muted-foreground", "#0A3B2C");
  }
}

export { ThemeProvider, useTheme };
