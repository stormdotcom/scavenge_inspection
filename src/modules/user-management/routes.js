import { lazy } from "react";
import { RootBoundary } from "../../common/components";

const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const SignUpTabs = lazy(() => import("./components/SignUpTabs"));
const routes = [
    {
        children: [
            {
                path: "signin",
                element: <SignIn />,
                errorElement: <RootBoundary />
            },
            {
                path: "sign-up",
                element: <SignUp />,
                errorElement: <RootBoundary />
            },
            {
                path: "signup",
                element: <SignUpTabs />,
                errorElement: <RootBoundary />
            }
        ]
    }
];

export { routes };
