import { createContext } from "react";
import useLocalStorage from "use-local-storage";

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [isDark, setIsDark] = useLocalStorage("isDark", window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}