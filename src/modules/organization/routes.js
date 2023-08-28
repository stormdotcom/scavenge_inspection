import ViewEditVessel from "./components/ViewEditVessel";
import OrgHome from "./components/OrgHome";
import { RootBoundary } from "../../common/components";

const routes = [
    {
        children: [
            {
                path: "dashboard",
                element: <OrgHome />,
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
