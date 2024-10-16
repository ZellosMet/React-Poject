import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Cards from "../pages/Cards";
import CardDetails from "../pages/CardDetails";
import Privacy from "../pages/Privacy";
import Cart from "../pages/Cart";

/**Роуты приложения */
const routes = [
  { path: "/", element: <Home /> },
  { path: "cards", element: <Cards /> },
  { path: "cards/:alias", element: <CardDetails /> },
  { path: "privacy", element: <Privacy /> },
  { path: "cart", element: <Cart /> }
];

/**
 * Рекурсивно отображает роуты и дочерние роуты.
 * @param {RouteItem} route - Объект роута.
 * @returns {JSX.Element} JSX элемент роута.
 */
const renderRoute = ({ path, element, children }) => (
  <Route key={path} path={path} element={element}>
    {children && children.map(renderRoute)}
  </Route>
);

/** Корневой компонент приложения с роутами */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {routes?.map(renderRoute)}
    </Route>
  </Routes>
);

export default AppRoutes;
