import React from 'react';
import { ModalProvider } from './ModalProvider';
import { ThemeProvider } from './ThemeProvider';
import SnackbarProvider from './SnackbarProvider';

const FlixProdiver = ({ children, ...props }) => {
  return (
    <ThemeProvider {...props}>
      <SnackbarProvider {...props}>
        <ModalProvider {...props}>{children}</ModalProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

FlixProdiver.whyDidYouRender = true;

export default FlixProdiver;
