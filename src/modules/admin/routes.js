import { lazy } from "react";

import { RootBoundary } from "../../common/components";
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ListUsers = lazy(() => import("./components/Users/ListUsers"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));
const ListVessel = lazy(() => import("./components/Vessels/ListVessels"));
const VesselDetails = lazy(() => import("./components/Vessels/VesselDetails"));
const OrgList = lazy(() => import("./components/Organizations/OrgList"));
const OrgDetails = lazy(() => import("./components/Organizations/OrgDetails"));
const routes = [
    {
        children: [
            {

                path: "dashboard",
                element: <AdminDashboard />,
                errorElement: <RootBoundary />
            },
            {
                path: "users",
                element: <ListUsers />,
                errorElement: <RootBoundary />
            },
            {
                path: "users/:id/edit",
                element: <UserDetails />,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels",
                element: <ListVessel />,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels/:id/view",
                element: <VesselDetails />,
                errorElement: <RootBoundary />
            },
            {
                path: "organizations",
                element: <OrgList />,
                errorElement: <RootBoundary />
            },
            {
                path: "organizations/:id/edit",
                element: <OrgDetails />,
                errorElement: <RootBoundary />
            }

        ]
    }
];

export { routes };
