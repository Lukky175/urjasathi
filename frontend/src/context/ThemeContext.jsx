import {
createContext,
useCallback,
useContext,
useEffect,
useState,
} from "react";

const ThemeContext = createContext({
theme: "light",
toggle: () => {},
setTheme: () => {},
});

const STORAGE_KEY = "urjasathi-theme";

function getInitialTheme() {
try {
const savedTheme = localStorage.getItem(STORAGE_KEY);


if (savedTheme === "light" || savedTheme === "dark") {
  return savedTheme;
}


} catch {
// Ignore localStorage errors.
}

return "light";
}

export function ThemeProvider({ children }) {
const [theme, setThemeState] = useState(getInitialTheme);

useEffect(() => {
document.documentElement.setAttribute("data-theme", theme);


try {
  localStorage.setItem(STORAGE_KEY, theme);
} catch {
  // Ignore localStorage errors.
}


}, [theme]);

const setTheme = useCallback((value) => {
setThemeState(value === "dark" ? "dark" : "light");
}, []);

const toggle = useCallback(() => {
setThemeState((currentTheme) =>
currentTheme === "dark" ? "light" : "dark",
);
}, []);

return (
<ThemeContext.Provider
value={{
theme,
toggle,
setTheme,
}}
>
{children}
</ThemeContext.Provider>
);
}

export function useTheme() {
return useContext(ThemeContext);
}
