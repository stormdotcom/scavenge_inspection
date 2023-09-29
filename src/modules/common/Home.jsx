import { Outlet } from "react-router-dom";

function CommonHome() {

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default CommonHome;
