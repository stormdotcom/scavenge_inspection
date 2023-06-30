import Signin from "./components/SignIn";
import SignUp from "./components/SignUp";

const routes = [
    {
        children: [
            {
                path: "signin",
                element: <Signin />
            },
            {
                path: "signup",
                element: <SignUp />
            }
        ]
    }
];

export { routes };
