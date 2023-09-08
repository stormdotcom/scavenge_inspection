import ViewEditVessel from "./components/ViewEditVessel";
import { RootBoundary } from "../../common/components";
import { lazy } from "react";

const OrgHome = lazy(() => import("./components/OrgHome"));
const VesselDetailList = lazy(() => import("./components/Vessels/VesselDetailList"));

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
                path: "vessel/:id/edit",
                element: <ViewEditVessel />,
                errorElement: <RootBoundary />
            }
        ]
    }
];

export { routes };
