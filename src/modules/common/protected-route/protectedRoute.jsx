
import React from "react";
import { useLocation } from "react-router";
import Navigate from "./Navigate";
import { STORAGE_KEYS } from "../../../common/constants";
export const PrivateRoute = ({ children }) => {
    let hasToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const location = useLocation();
    return hasToken ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/signin"
            state={{ from: `${location.pathname}${location.search}` }
            }
        />
    );
};
