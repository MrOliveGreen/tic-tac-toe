import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes";

import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;