import { useState, createContext,useEffect,useContext } from "react";

const themeContext=createContext();

export const ThemeProvider=(props)=>{
  const [theme,setTheme]=useState("light");

  const toggleTheme=()=>{
    setTheme((prev)=>(prev==="light"?"dark":"light"));
  }

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#999393ff";
      document.body.style.color = "#eaeaea";
    } else {
      document.body.style.backgroundColor = "#3f1272ff";
      document.body.style.color = "#eaeaea";
    }
  }, [theme]);
    return (
          <themeContext.Provider value= {{theme,toggleTheme}}>
          {props.children}
          </themeContext.Provider>
    );
};

export const useTheme = () => useContext(themeContext);
