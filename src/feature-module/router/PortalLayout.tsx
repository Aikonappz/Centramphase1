import React from "react";
import { Outlet } from "react-router-dom";

const PortalLayout: React.FC = () => {
  return (
    <div className="portal-layout">
      {/* No sidebar, no header */}
      <Outlet />
    </div>
  );
};

export default PortalLayout;
