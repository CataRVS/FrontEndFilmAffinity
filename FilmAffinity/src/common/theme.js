import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Para personalizar el tema por defecto de MaterialUI

export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiCssBaseline: {
      // Estilos globales
      styleOverrides: `
        a, a:visited, a:hover, a:active {
          color: inherit;
        }
      `,
    },
  },
});
