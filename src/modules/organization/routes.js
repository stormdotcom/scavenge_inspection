import { RootBoundary } from "../../common/components";
import { lazy } from "react";

import ProfileWrapper from "./components/Profile/ProfileWrapper";
import { routes as profileRoute } from "./components/Profile/routes";

const OrgHome = lazy(() => import("./components/OrgHome"));
const VesselDetailList = lazy(() => import("./components/Vessels/VesselDetailList"));
const ViewEditVessel = lazy(() => import("./components/Vessels/ViewEditVessel"));

const routes = [
    {
        children: [
            {
                path: "dashboard",
                element: <OrgHome />,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels",
                element: <VesselDetailList />,
                errorElement: <RootBoundary />
            },
            {
                path: "profile",
                element: <ProfileWrapper />,
                children: profileRoute,
                errorElement: <RootBoundary />
            },
            {
                path: "vessels/:id/view",
                element: <ViewEditVessel />,
                errorElement: <RootBoundary />
            }
        ]
    }
];
export { routes };
