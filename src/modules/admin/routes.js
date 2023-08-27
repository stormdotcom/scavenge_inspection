import { lazy } from "react";

import ListOrg from "./components/ListOrg";
import ListVessel from "./components/ListVessel";
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const ListUsers = lazy(() => import("./components/Users/ListUsers"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));

const routes = [
    {
        children: [
            {

                path: "dashboard",
                element: <AdminDashboard />
            },
            {
                path: "users",
                element: <ListUsers />
            },
            {
                path: "users/:id/view",
                element: <UserDetails />
            },
            {
                path: "vessels",
                element: <ListVessel />
            },
            {

                path: "orgs",
                element: <ListOrg />
            }
        ]
    }
];

export { routes };
