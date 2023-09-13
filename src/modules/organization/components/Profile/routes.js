
import { lazy } from "react";
import { RootBoundary } from "../../../../common/components";


const Profile = lazy(() => import("./ManagerProfile"));
const Subscriptions = lazy(() => import("./Subscriptions/Subscriptions"));
const routes = [
    {
        children: [

            {
                path: "info",
                element: <Profile />,
                errorElement: <RootBoundary />
            },
            {
                path: "subscriptions",
                element: <Subscriptions />,
                errorElement: <RootBoundary />
            }
        ]
    }
];
export { routes };
