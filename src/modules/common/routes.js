import { Typography } from "@mui/material";
import { lazy } from "react";

const Docs = lazy(() => import("./Docs/DocumentationPage"));

const routes = [
    {
        children: [
            {
                path: "home",
                element: <Docs />
            },
            {
                path: "vessel",
                element: <Typography>Vessel Docs</Typography>
            }
        ]
    }
];
export { routes };
