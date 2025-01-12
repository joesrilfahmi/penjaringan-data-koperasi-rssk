// src/components/ThemeToggle.jsx
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed right-4 top-4 rounded-full bg-slate-200 p-2 text-slate-600 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;
