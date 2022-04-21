import Client from "react-dom/client"
import App from "./components/App";
import React from "react";

window.onload = () => {
    const root = document.getElementById("app-root");
    if (!root) return;
    Client.createRoot(root).render(<App />);
}