import { Alert } from "@mui/material";
import React from "react";
import { IAlert } from "./useAlert";

export default ({ control }: { control: { get(): IAlert[] } }) => {
    return <React.Fragment>
        {control.get().map((alert, i) => <Alert key={i} severity={alert.type}>{alert.content}</Alert>)}
    </React.Fragment>
}