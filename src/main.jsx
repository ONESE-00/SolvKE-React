import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Sonner } from "./components/ui/Sonner";
import "./styles.css";
import { Provider } from "react-redux";
import { store } from "./AppStore/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Sonner />
    </Provider>
  </React.StrictMode>,
);
