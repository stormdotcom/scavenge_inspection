import App from "../App";
import { Icons, RootBoundary } from "../common/components";
import AdminHome from "./admin/Home";
import { PrivateRoute } from "./common/protected-route/protectedRoute";

import { routes as adminRoutes } from "../modules/admin/routes";
import { routes as userManagement } from "../modules/user-management/routes";
import { routes as orgRoutes } from "../modules/organization/routes";
import { lazy } from "react";
import OrgHome from "./organization/OrgHome";

const VesselHome = lazy(() => import("./home/components/HomeWrapper"));
const { Home } = Icons;
const routes =
    [
        {
            path: "/",
            element:
                <PrivateRoute>
                    <App />
                </PrivateRoute>,
            errorElement: <RootBoundary />,
            icon: <Home />,
            children: [
                {
                    title: "OrgAdmin",
                    path: "org",
                    element:
                        <PrivateRoute>
                            <OrgHome />
                        </PrivateRoute>,
                    children: orgRoutes || [],
                    errorElement: <RootBoundary />
                },
                {
                    title: "development-admin",
                    path: "admin",
                    element:
                        <PrivateRoute>
                            <AdminHome />
                        </PrivateRoute>,
                    children: adminRoutes || [],
                    errorElement: <RootBoundary />
                },
                {
                    title: "Report",
                    path: "report",
                    // element: <Report />,
                    errorElement: <RootBoundary />
                },
                {
                    title: "Home",
                    path: "home",
                    element: <VesselHome />,
                    errorElement: <RootBoundary />
                }

            ]
        },
        {
            title: "user_management",
            children: userManagement || []
        }

    ];

export { routes };
