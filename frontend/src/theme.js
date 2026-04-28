export function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    // system mode
    root.removeAttribute("data-theme");
  }

  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  const saved = localStorage.getItem("theme");

  if (saved === "light" || saved === "dark" || saved === "system") {
    applyTheme(saved);
  } else {
    applyTheme("system");
  }
}
