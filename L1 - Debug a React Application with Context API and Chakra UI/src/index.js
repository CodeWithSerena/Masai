import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import { AuthContextProvider } from "./AuthContext";
import { ThemeContextProvider } from "./ThemeContext";
import App from "./App";

// Create the root for your application
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthContextProvider>
);
