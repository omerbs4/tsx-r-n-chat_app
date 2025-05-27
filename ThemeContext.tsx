import React, {createContext,useContext,useState} from "react";
import {themes ,Theme} from "./colors/theme";

type ThemeName = keyof typeof themes;

type ThemeContextType = {
    theme: Theme;
    themeName: ThemeName;
    setThemeName:(name:ThemeName) =>void;


};

const ThemeContext = createContext<ThemeContextType>({
    theme: themes.purple, // default theme
    themeName: "purple", 
    setThemeName:()=>{},

});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [themeName, setThemeName] = useState<ThemeName>("purple");
    const theme = themes[themeName];

    return (
        <ThemeContext.Provider value={{theme, themeName, setThemeName}}>
            {children}
        </ThemeContext.Provider>
    );
};

   

