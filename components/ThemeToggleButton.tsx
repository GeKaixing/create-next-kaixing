"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react"; // 图标库，可换成其他的
import { useTheme } from "nextra-theme-docs";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState("system");
  const { theme:themedocs, setTheme:setThemesdocs } = useTheme()
  // 初始化主题
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "system" | "dark" | "light" || "system";
    setTheme(storedTheme);
    applyTheme(storedTheme);

    // 如果选择了 system，则监听系统主题变化
    if (storedTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
  }, []);

  // 应用主题逻辑
  const applyTheme = (selectedTheme: "system" | "dark" | "light") => {
    if (selectedTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", selectedTheme === "dark");
    }
  };

  // 切换主题（循环切换 light → dark → system）
  const toggleTheme = () => {
    setThemesdocs(theme)
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return { icon: <Sun size={18} />, text: "Light" };
      case "dark":
        return { icon: <Moon size={18} />, text: "Dark" };
      case "system":
        return { icon: <Monitor size={18} />, text: "System" };
      default:
        return { icon: <Monitor size={18} />, text: "System" };
    }
  };

  const { icon, text } = getLabel();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-xl  px-3 py-2 text-sm font-medium transition-all"
      aria-label="Toggle Theme"
    >
      {icon} <span>{text}</span>
    </button>
  );
}
