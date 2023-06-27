import { CssBaseline, ThemeProvider } from "@mui/material";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persister, store } from "./app/store";
import { ReactNotifications } from "./common/components";
import theme from "./common/themes/theme";
import PermittedRoutes from "./PermittedRoutes";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReactNotifications />
          <PermittedRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);


