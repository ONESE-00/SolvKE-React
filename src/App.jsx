import { useState } from "react";
import AppRoutes from "./routes/Approutes";
import { BrowserRouter } from "react-router-dom";
export default function App() {
 return (
  <BrowserRouter>
    <AppRoutes/>
  </BrowserRouter>
 )
}
