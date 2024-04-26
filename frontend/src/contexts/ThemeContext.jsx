import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const [isDark, setIsDark] = useLocalStorage('isDark', window.matchMedia("(prefers-color-scheme: dark)").matches && localStorage.getItem('isDark'));

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
      }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);
