import { lazy } from "react";

import ListOrg from "./components/ListOrg";
import ListVessel from "./components/ListVessel";
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

const routes = [
    {
        children: [
            {

                path: "dashboard",
                element: <AdminDashboard />
            },
            {

                path: "listVessels",
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
