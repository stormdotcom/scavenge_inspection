import ListVessel from "./components/ListVessel";
import ViewEditVessel from "./components/ViewEditVessel";
import OrgHome from "./components/OrgHome";

const routes = [
    {
        children: [
            {
                path: "dashboard",
                element: <OrgHome />
            },
            {
                path: "vessels",
                element: <ListVessel />
            },
            {
                path: "vessel/:id/edit",
                element: <ViewEditVessel />
            }
        ]
    }
];

export { routes };
