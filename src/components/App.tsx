import { Container, CssBaseline, Box, createTheme, ThemeProvider } from "@mui/material"
import React from "react"
import Document from "./Document"
export default () => {
    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    });
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md">
            <Box m={1}>
                <Document />
            </Box>
        </Container>
    </ThemeProvider>
}