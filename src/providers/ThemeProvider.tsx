"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

const theme = createTheme({
    palette: {
        mode: "light"
    },
});

export default function ThemeRegistry({ children } : { children: ReactNode}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) {
        return null;
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}