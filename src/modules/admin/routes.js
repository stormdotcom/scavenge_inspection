import { lazy } from "react";

import ListOrg from "./components/ListOrg";
import ListVessel from "./components/ListVessel";
import { RootBoundary } from "../../common/components";
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ListUsers = lazy(() => import("./components/Users/ListUsers"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));

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

                path: "orgs",
                element: <ListOrg />,
                errorElement: <RootBoundary />
            }
        ]
    }
];

export { routes };
