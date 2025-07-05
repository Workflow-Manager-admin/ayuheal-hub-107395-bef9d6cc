import React, { createContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// PUBLIC_INTERFACE
function ThemeProvider({ children }) {
  // Only two themes: 'light' (herbal, nature-inspired) and 'dark'
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
