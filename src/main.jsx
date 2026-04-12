import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Sonner } from "./components/ui/Sonner";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Sonner />
  </React.StrictMode>,
);
