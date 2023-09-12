import { lazy } from "react";

const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const SignUpTabs = lazy(() => import("./components/SignUpTabs"));

const routes = [
    {
        children: [
            {
                path: "signin",
                element: <SignIn />
            },
            {
                path: "sign-up",
                element: <SignUp /> //SignUpTabs
            },
            {
                path: "signup",
                element: <SignUpTabs /> //SignUp
            }
        ]
    }
];

export { routes };
