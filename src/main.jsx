import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>
);
