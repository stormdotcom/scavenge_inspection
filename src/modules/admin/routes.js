import { lazy } from "react";

import { RootBoundary } from "../../common/components";
import { PrivateRoute } from "../common/protected-route/protectedRoute";
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ListUsers = lazy(() => import("./components/Users/ListUsers"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));
const ListVessel = lazy(() => import("./components/Vessels/ListVessels"));
const VesselDetails = lazy(() => import("./components/Vessels/VesselDetails"));
const OrgList = lazy(() => import("./components/Organizations/OrgList"));
const OrgDetails = lazy(() => import("./components/Organizations/OrgDetails"));
const ConfigPage = lazy(() => import("../basic-config/components/ConfigPage"));
const routes = [
    {
        children: [
            {

                path: "dashboard",
                element: <PrivateRoute > <AdminDashboard /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "users",
                element: <PrivateRoute > <ListUsers /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "users/:id/edit",
                element: <PrivateRoute> <UserDetails /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels",
                element: <PrivateRoute ><ListVessel /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels/:id/view",
                element: <PrivateRoute > <VesselDetails /></PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "organizations",
                element: <PrivateRoute > <OrgList /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "organizations/:id/edit",
                element: <PrivateRoute >  <OrgDetails /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "config",
                element: <PrivateRoute ><ConfigPage /> </PrivateRoute>,
                errorElement: <RootBoundary />
            }

        ]
    }
];

export { routes };
