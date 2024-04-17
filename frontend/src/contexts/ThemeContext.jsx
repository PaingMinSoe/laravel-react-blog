import { createContext, useState } from 'react'

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {

    let [isDark, setIsDark] = useState(false);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}