
import { lazy } from "react";
import { RootBoundary } from "../../../../common/components";
import { PrivateRoute } from "../../../common/protected-route/protectedRoute";


const Profile = lazy(() => import("./ManagerProfile"));
const Subscriptions = lazy(() => import("./Subscriptions/Subscriptions"));
const routes = [
    {
        children: [

            {
                path: "info",
                element: <PrivateRoute><Profile /> </PrivateRoute>,
                errorElement: <RootBoundary />
            },
            {
                path: "subscriptions",
                element: <PrivateRoute><Subscriptions /> </PrivateRoute>,
                errorElement: <RootBoundary />
            }
        ]
    }
];
export { routes };
