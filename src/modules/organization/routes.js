import { RootBoundary } from "../../common/components";
import { lazy } from "react";

import ProfileWrapper from "./components/Profile/ProfileWrapper";
import { routes as profileRoute } from "./components/Profile/routes";
import { PrivateRoute } from "../common/protected-route/protectedRoute";

const OrgHome = lazy(() => import("./components/OrgHome"));
const VesselDetailList = lazy(() => import("./components/Vessels/VesselDetailList"));
const ViewEditVessel = lazy(() => import("./components/Vessels/ViewEditVessel"));

const routes = [
    {
        children: [
            {
                path: "dashboard",
                element: <PrivateRoute> <OrgHome /></PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels",
                element: <PrivateRoute> <VesselDetailList /></PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "profile",
                element: <PrivateRoute> <ProfileWrapper /> </PrivateRoute>,
                children: profileRoute,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels/:id/view",
                element: <PrivateRoute>   <ViewEditVessel /> </PrivateRoute>,
                errorElement: <RootBoundary />
            }
        ]
    }
];
export { routes };
