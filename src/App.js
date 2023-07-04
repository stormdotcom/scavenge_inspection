import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { actions as commonActions } from "./modules/common/slice";
import "./App.css";

import DashboardLayout from "./layouts/DashboardLayout";
import { useDispatch } from "react-redux";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(commonActions.setNavigator(navigate));
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
