import React from "react";
import { Route, Routes } from "react-router-dom";

import PlayBoard from "../pages/PlayBoard";

const routes = [
  {
    index: true,
    element: <PlayBoard />,
  },
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((props, key) => (
        <Route key={key} {...props} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
