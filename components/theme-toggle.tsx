"use client";

export function ThemeToggle() {
  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    document.documentElement.style.colorScheme = nextIsDark ? "dark" : "light";
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
    >
      <span className="theme-label">Theme</span>
      <span className="theme-indicator" aria-hidden="true" />
    </button>
  );
}
