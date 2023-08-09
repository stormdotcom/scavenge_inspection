

import React, { Suspense } from "react";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { routes } from "./modules/routes";
import { Components } from "./common/components";
import { routePermission } from "./utils/permissionUtils";
import { useSelector } from "react-redux";
import { STATE_REDUCER_KEY } from "./modules/common";
const { Loader } = Components;

const PermittedRoutes = () => {
    const user = useSelector(state => state[STATE_REDUCER_KEY].user);
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={createHashRouter(routePermission(user, routes))} />
            <Outlet />
        </Suspense>
    );
};

export default PermittedRoutes;
