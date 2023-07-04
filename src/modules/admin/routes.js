import CreateUser from "./components/CreateUser";
import ListOrg from "./components/ListOrg";
import ListVessel from "./components/ListVessel";

const routes = [
    {
        children: [
            {

                path: "dashboard",
                element: <CreateUser />
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
