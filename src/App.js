import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import "./App.css";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(commonActions.setNavigator(navigate));
  }, []);
  return (
    <Typography className="app" component="div">
      <DashboardLayout >
        <Outlet />
      </DashboardLayout >
    </Typography>
  );
}

export default App;
