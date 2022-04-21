import { Container, CssBaseline, Box } from "@mui/material"
import React from "react"
import Document from "./Document"
export default () => {
    return <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
            <Box m={1}>
                <Document />
            </Box>
        </Container>
    </React.Fragment>
}