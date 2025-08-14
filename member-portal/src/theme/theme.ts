import { createTheme } from '@mui/material/styles';

// Modern theme inspired by Vercel and Apple design systems
export const createAppTheme = (isDark: boolean) => createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    primary: {
      main: isDark ? '#ffffff' : '#000000',
      light: isDark ? '#f5f5f5' : '#333333',
      dark: isDark ? '#e0e0e0' : '#000000',
      contrastText: isDark ? '#000000' : '#ffffff',
    },
    secondary: {
      main: '#0070F3', // Vercel blue
      light: '#3291FF',
      dark: '#0056D2',
      contrastText: '#ffffff',
    },
    background: {
      default: isDark ? '#0a0a0a' : '#fafafa',
      paper: isDark ? '#161616' : '#ffffff',
    },
    text: {
      primary: isDark ? '#ffffff' : '#1a1a1a',
      secondary: isDark ? '#a0a0a0' : '#666666',
    },
    grey: {
      50: isDark ? '#121212' : '#fafafa',
      100: isDark ? '#1e1e1e' : '#f5f5f5',
      200: isDark ? '#2a2a2a' : '#eeeeee',
      300: isDark ? '#3a3a3a' : '#e0e0e0',
      400: isDark ? '#4a4a4a' : '#bdbdbd',
      500: isDark ? '#6a6a6a' : '#9e9e9e',
      600: isDark ? '#8a8a8a' : '#757575',
      700: isDark ? '#a0a0a0' : '#616161',
      800: isDark ? '#bdbdbd' : '#424242',
      900: isDark ? '#e0e0e0' : '#212121',
    },
    error: {
      main: '#FF3B30', // Apple red
    },
    warning: {
      main: '#FF9500', // Apple orange
    },
    success: {
      main: '#30D158', // Apple green
    },
    divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Inter"',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12, // Apple-inspired rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '0.95rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          background: isDark 
            ? 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)'
            : 'linear-gradient(135deg, #000000 0%, #333333 100%)',
          color: isDark ? '#000000' : '#ffffff',
          '&:hover': {
            background: isDark 
              ? 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
              : 'linear-gradient(135deg, #333333 0%, #555555 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #0070F3 0%, #3291FF 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0056D2 0%, #0070F3 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#fafafa',
            '&:hover fieldset': {
              borderColor: '#0070F3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0070F3',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: isDark 
            ? 'rgba(16, 16, 16, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: isDark 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: isDark 
            ? '0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)'
            : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
          border: isDark 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid #f0f0f0',
          '&:hover': {
            boxShadow: isDark 
              ? '0 4px 12px rgba(0, 0, 0, 0.6)'
              : '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Export both the theme function and default light theme for backwards compatibility
export const theme = createAppTheme(false);
export default createAppTheme;