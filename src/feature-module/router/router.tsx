import React from "react";
import {  Route, Routes } from "react-router";
import { authRoutes, publicRoutes } from "./router.link";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import PortalLayout from "./PortalLayout";
import { portalRoutes } from "./portalRoutes";

const ALLRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Feature />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthFeature />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

         {/* 🔵 PORTAL ROUTES (NO SIDEBAR) */}
      <Route element={<PortalLayout />}>
        {portalRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
