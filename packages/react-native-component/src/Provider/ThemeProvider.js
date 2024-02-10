import React from 'react';
import InternalUseTheme from '../Hook/internalUseTheme';
import BaseColor from '../styles/colors';
import BaseFont from '../styles/fonts';

const ThemeContext = React.createContext({
  colors: BaseColor.light,
  applyColors: () => null,
  fonts: BaseFont,
  applyFont: () => null,
  isDark: false,
});

const ThemeProvider = ({ children, theme = { colors: null, fonts: null } }) => {
  const { colors, applyColors, fonts, applyFont, isDark } =
    InternalUseTheme(theme);
  const contextValue = React.useMemo(
    () => ({ colors, applyColors, fonts, applyFont, isDark }),
    [colors, applyColors, fonts, applyFont, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
