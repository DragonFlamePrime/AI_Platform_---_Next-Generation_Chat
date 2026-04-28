import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Memory from "./pages/Memory.jsx";
import "./global.css";
import { loadTheme } from "./theme";
loadTheme();


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/memory" element={<Memory />} />
    </Routes>
  </BrowserRouter>
);
