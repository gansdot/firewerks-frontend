// src/theme.ts
import { createTheme } from "@mui/material/styles";

import "@fontsource/outfit"; // Defaults to 400 weight
import "@fontsource/outfit/600.css"; // Medium weight
import "@fontsource/outfit/700.css"; // Bold
export const glassTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#9fa4aeff", // Apple Blue
            contrastText: "#111", // dark text for contrast
        },
        text: {
            primary: "#111",
            secondary: "rgba(0,0,0,0.7)",
            //primary: { main: "#1976d2" },
            //secondary: { main: "#FF7F50" },
        },
        background: {
            default: "rgba(245, 245, 247, 0.6)",
            paper: "rgba(255, 255, 255, 0.2)",
        },
    },
    /** typography: {
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
    },*/
    //momo signatue, Are You Serious, sixtyfour, Dancing Script,Pacifico, Lobster, Caveat, satisfy, Orbitron
    typography: {
        //fontFamily: `"Montserrat"`,
        fontFamily: `"Outfit", "Helvetica", "Arial", sans-serif`,
        //fontFamily: `"Happy Monkey", "Helvetica", "Arial", sans-serif`,
        //fontFamily: `"Happy Monkey", "Helvetica", "Arial", sans-serif`,
        //fontFamily: `"Sui Generis", "Helvetica", "Arial", sans-serif`,
        //fontFamily: `"Exo 2.0", "Helvetica", "Arial", sans-serif`,
        //fontFamily: `"Toxigenesis", "Helvetica", "Arial", sans-serif`,
        //fontFamily: `"Penna", "Helvetica", "Arial", sans-serif`,
        //fontFamily: '"Are You Serious", cursive',
        //fontFamily: `"Happy Monkey", static`,
        //fontFamily: `"Open Sans", static`,
        h1: { fontWeight: 700, letterSpacing: "-0.02em" },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        body1: { fontWeight: 400 },
        button: { textTransform: "none", fontWeight: 600 },
    },

    shape: {
        borderRadius: 6,
    },


    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.35)",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 8px 32px rgba(31, 38, 135, 0.25)",
                    color: "#111", // 👈 Dark text color
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    color: "#111",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    background: "rgba(255,255,255,0.15)",
                    border: "0px solid rgba(193, 178, 178, 0.3)",
                    backdropFilter: "blur(10px)",
                    color: "#000",
                    textTransform: "none",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        background: "rgba(255,255,255,0.25)",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255,255,255,0.25)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backdropFilter: "blur(20px)",
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",

                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: "rgba(255, 255, 255, 0.65)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    color: "#000",
                },
            },
        },
    },

});


/**
 import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    // Default font for most text (body)
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',

    // Headings (H1–H6) use Are You Serious
    h1: {
      fontFamily: '"Are You Serious", cursive',
      fontWeight: 400,
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: '"Are You Serious", cursive',
      fontWeight: 400,
      fontSize: "2rem",
    },
    h3: {
      fontFamily: '"Are You Serious", cursive',
      fontWeight: 400,
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: '"Are You Serious", cursive',
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: '"Are You Serious", cursive',
      fontWeight: 400,
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: '"Are You Serious", cursive',
      fontWeight: 400,
      fontSize: "1.1rem",
    },

    // Optional: tweak body and button fonts
    body1: {
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  // You can also add palette here if needed
});

export default theme;

 */